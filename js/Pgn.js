/**
 * PGN
 *
 * Representation of the PGN format. Different meta information
 * about the actual game(s) plus the moves and result of the game.
 *
 * @constructor
 * @param {string} The PGN data
 *
 * @property {string}	props		    - PGN properties supplied
 * @property {string}	requiredProps   - The required PGN properties
 * @property {string}	requiredLength  - (Currently 7)
 * @property {array}	moves           - Array of moves
 * @property {integer}	currentMove
 * @property {integer}	skip            - White (0) or Black (1) to move
 * @property {string}	gameIntro       - Commentary before game begins
 * @property {string}	pgnOrig         - original PGN string
 * @property {string}	pgn             - PGN being processed
 * @property {string}	pgnRaw          - PGN after being normalized
 * @property {string}	pgnStripped     - PGN with commentary removed
 *
 * @version 0.7.1
 * @author Toomas Ršmer
 * @author Arlen P Walker
 * @copyright 2008 Toomas Ršmer
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
 **/
function Pgn(pgn) {
    "use strict";
	var themoves,
	    sizeOfTheMoves,
	    i,
	    move,
	    ply = [null, null],
	    plyidx = 0;	//make this 1 if FEN and black to move

	// properties of the game eg players, ELOs etc
	this.props = {};
	this.requiredProps = ['Result', 'Black', 'White', 'Date',
								'Round', 'Site', 'Event'];
	this.requiredLength = this.requiredProps.length;
	this.moves = [];	// the moves, one move contains the black and white move
	this.currentMove = 0;	// the current move in the game
	this.skip = 0;	// which ply at start? 0=white's, 1=black's
	this.gameIntro = null;

	this.pgnOrig = pgn;
	pgn = this.normalize(pgn);

	this.pgn = pgn;
	this.pgnRaw = this.pgn;
	this.pgnStripped = this.stripComments(this.pgn);

	this.pgn = this.extractTags(this.pgn);
	this.extractGameIntro();
	this.extractPostGame();
	this.pgn = this.stripComments(this.pgn, true);

	themoves = this.pgn.split(" ");
	ply[1] = null;
	if (this.isBlackToMove(this.props.FEN)) {
		plyidx = 1;
		this.skip = 1;
	}

	sizeOfTheMoves = this.dropLastMove(themoves) ?
							themoves.length - 1 : themoves.length;
	for (i = 0; i < sizeOfTheMoves; i += 1) {
		if (themoves[i]) {
			themoves[i] = themoves[i].trim();
			themoves[i] = this.includeOrigination(themoves[i]);
			themoves[i] = this.removeMoveNumber(themoves[i]);
			if (themoves[i].length > 0) {
				ply[plyidx] = themoves[i];
				if (plyidx === 1) {	//black's move or last move
					move = new Move(ply[0], ply[1]);
					this.moves[this.moves.length] = move;
					plyidx = 0;
					ply = [null, null];
					ply[1] = null;
				} else {
					plyidx = 1;
				}
			}
		}
	}

	if (ply[0] || ply[1]) {
		move = new Move(ply[0], ply[1]);
		this.moves[this.moves.length] = move;
	}
}
/**
 *	Checks FEN to see if it is Black to start
 */
Pgn.prototype.isBlackToMove = function (FEN) {
    "use strict";
	return (FEN && / b | B /.test(FEN));
};
/**
 *	Tests to see if last move entry should be dropped. It should be dropped if
 *	it's not a move, but rather a result/partial game indicator.
 */
Pgn.prototype.dropLastMove = function (themoves) {
    "use strict";
	return !!themoves[themoves.length - 1].match(/1\/2-1\/2|0-1|1-0|\*|\.\.\./);
};
/**
 *	Pull any info the move contains about its origin into the move as well
 */
Pgn.prototype.includeOrigination = function (move) {
    "use strict";
    var fromTo,
        newMove,
        matches;

	if (this.moveHasOrigination(move)) {
		fromTo = move.split("-");
		if (fromTo[0].match(/[0-9]*?\.?([A-Z])/) !== null) {
			// we can just replace the - with nothing
			newMove = move.replace("-", "");
		} else {
			matches = fromTo[0].match(/[0-9]+\./);
			if (matches) {
				newMove = matches[0] + fromTo[1];
			} else {
				newMove = fromTo[1];
			}
		}
		return newMove;
	}
	return move;
};
/**
 *	If the move is prefaced by a move number, remove it. If the token contains
 *	only a move number, with no move, it will be emptied.
 */
Pgn.prototype.removeMoveNumber = function (move) {
    "use strict";
	return move.replace(/^[1-9][0-9]*\.?[ ]*/g, "");
};
/**
 *	will return the pgn string without comments or with comments replaced
 *  by underscores.
 */
Pgn.prototype.stripComments = function (pgn, replace) {
    "use strict";
	if (this.isBroken(pgn)) {
		return this.stripItBroken(pgn, replace);
	}
	return this.stripIt(pgn, replace);
};
/**
 *	Does the move have information on its origin as well as its destination
 */
Pgn.prototype.moveHasOrigination = function (move) {
    "use strict";
	return move.indexOf("-") !== -1 &&
			 !/[0|o]-[0|o]/i.test(move) &&
			 !/[0|o]-[0|o]-[0|o]/i.test(move);
};
/**
 *	This will "normalize" the pgn file by removing line breaks, collapsing
 *  strings of spaces, and replacing the symbols for moves with the characters
 *  (!, ?, etc.)
 */
Pgn.prototype.normalize = function (pgn) {
    "use strict";
	pgn = pgn.replace(/\n/g, " ");

	// replace dollar signs
	//"!", "?", "!!", "!?", "?!", and "??"
	pgn = pgn.replace(/\ \$1[0-9]*/g, "!");
	pgn = pgn.replace(/\ \$2[0-9]*/g, "?");
	pgn = pgn.replace(/\ \$3[0-9]*/g, "!!");
	pgn = pgn.replace(/\ \$4[0-9]*/g, "??");
	pgn = pgn.replace(/\ \$5[0-9]*/g, "!?");
	pgn = pgn.replace(/\ \$6[0-9]*/g, "?!");
	pgn = pgn.replace(/\ \$[0-9]+/g, "");

	// make double spaces to single spaces
	return pgn.replace(/\s+/g, ' ');
};
/**
 *	This function takes a pgn game string and extracts all the tags into the
 *  class variable props as key/value pairs. it returns the pgn string, minus
 *  the tags.
 */
Pgn.prototype.extractTags = function (pgn) {
    "use strict";
	var matches,
	    reprop = /\[([^\]]*)\]/gi,
	    tmpMatches,
	    key,
	    i,
	    length,
	    value;

    matches = pgn.match(reprop);
	if (matches) {
		// extract information from each matched property
		for (i = 0; i < matches.length; i += 1) {
			// lose the brackets
			tmpMatches = matches[i].substring(1, matches[i].length - 1);
			// split by the first space
			key = tmpMatches.substring(0, tmpMatches.indexOf(" "));
			value = tmpMatches.substring(tmpMatches.indexOf(" ") + 1);
			if (value.charAt(0) === '"') {
				value = value.substr(1);
			}
			if (value.charAt(value.length - 1) === '"') {
				value = value.substr(0, value.length - 1);
			}

			this.props[key] = value;
			pgn = pgn.replace(matches[i], "");
		}
	}
	length = this.requiredLength - 1;
	while (length) {
		if (!this.props[this.requiredProps[length]]) {
			this.props[this.requiredProps[length]] = "?";
		}
        length -= 1;
    }

	return pgn.replace(/\[[^\]]*\]/g, '').trim();
};

Pgn.prototype.nextMove = function () {
    "use strict";
    var rtrn = null;
    try {
        if (this.skip) {
            this.skip = 0;
            rtrn = [this.moves[this.currentMove].black, 'black'];
            this.currentMove += 1;
        } else {
            this.skip = 1;
            rtrn = [this.moves[this.currentMove].white, 'white'];
        }

        if (rtrn[0] === null || rtrn[0].length === 0) { rtrn = null; }
        return rtrn;
    } catch (e) {
        return null;
    }
};

Pgn.prototype.getComment = function (move, idx) {
    "use strict";
    var i = this.pgnStripped.indexOf(move, idx),
        j,
        c,
        k,
        c2;

    if (i === -1) {
        //throw("getComment error, could not find move '"
        //				+move+"'"+", with index '"+idx+"'");
        return [null, idx];
    }

    for (j = i + move.length; j < this.pgnStripped.length; j += 1) {
        c = this.pgnStripped.charAt(j);
        switch (c) {
        case ' ':
            break;
        case '_':	//found comment
            for (k = j; k < this.pgnStripped.length; k += 1) {
                c2 = this.pgnStripped.charAt(k);
                switch (c2) {
                case '_':	//found comment
                    break;
                default:	//no comment
                    // we might have many comments separated with spaces
                    // as we strip all double spaces to single ones we
                    // can just check for the next char being '_'
                    if (this.pgnStripped.length > k + 1 &&
                            this.pgnStripped.charAt(k + 1) === '_') {
                        continue;
                    }
                    return [this.pgnRaw.substring(j, k), k];
                }
            }
            break;
        default:	//no comment
            return [null, idx];
        }
    }
    return [null, idx];
};

Pgn.prototype.isBroken = function (val) {
    "use strict";
    var pCount = 0,
        cCount = 0,
        lastOne = "",
        inComment = false,
        i,
        c;

    for (i = 0; i < val.length; i += 1) {
        c = val.charAt(i);
        if (inComment) {
            switch (c) {
            case '}':
                inComment = false;
                // closing a non-existent curly brace
                if (cCount === 0) { return true; }
                // if we're closing a parenthesis instead of a curly
                if (lastOne === "p") { return true; }
                lastOne = "";
                cCount -= 1;
                break;
            case '{':
                // Cannot nest comments
                return true;
            }
        } else {
            switch (c) {
            case '(':
                pCount += 1;
                lastOne = "p";
                break;
            case ')':
                // closing a non-existent curly brace
                if (pCount === 0) { return true; }
                // closing a curly instead of a parenthesis
                if (lastOne === "c") { return true; }
                lastOne = "";
                pCount -= 1;
                break;
            case '{':
                inComment = true;
                cCount += 1;
                lastOne = "c";
                break;
            }
        }
    }
    return false;
};
/*
    At one point chesspastebin.com started getting cames
    with invalid PGNs, mostly in the form
    { comment comment ( something between starting brackets}.
    As you can see, the ( is not closed. 
    isOpen and isCurlyO are just for that to take normal
    guesses in that kind of situations.
*/
Pgn.prototype.stripItBroken = function (val, strip) {
    "use strict";
	var count = 0,
	    out = [],
	    isOpen = false,
	    isCurlyO = false,
	    curlyOpenedFst = false,
	    i,
	    c;

	for (i = 0; i < val.length; i += 1) {
		c = val.charAt(i);
		switch (c) {
        case '(':
            if (!strip) { out[out.length] = '_'; }
            count += 1;
            if (isOpen) { count -= 1; }
            isOpen = true;
            break;
        case '{':
            isCurlyO = true;
            if (!strip) { out[out.length] = '_'; }
            count += 1;
            if (!isOpen) { curlyOpenedFst = true; }
            break;
        case '}':
            if (isOpen && isCurlyO && curlyOpenedFst) {
                // lets close the open (
                count -= 1;
                isOpen = false;
            }
            isCurlyO = false;
            curlyOpenedFst = false;
            count -= 1;
            if (!strip) { out[out.length] = '_'; }
            break;
        case ')':
            if (isOpen) {
                count -= 1;
                if (!strip) { out[out.length] = '_'; }
                isOpen = false;
            }
            break;
        case '\t':
            out[out.length] = ' ';
            break;
        default:
            if (count > 0) {
                if (!strip) { out[out.length] = '_'; }
            } else {
                out[out.length] = c;
            }
		}
	}
	return out.join("");
};
/*
	Strip game comments from a PGN string. If second
	parameter set false true then comments will be replaced
	by an underscore.
*/
Pgn.prototype.stripIt = function (val, strip) {
    "use strict";
	var count = 0,
	    out = [],
	    inComment = false,
	    i,
	    c;

	for (i = 0; i < val.length; i += 1) {
		c = val.charAt(i);
		switch (c) {
        case '(':
            if (!strip) { out[out.length] = '_'; }
            if (!inComment) { count += 1; }
            break;
        case '{':
            inComment = true;
            if (!strip) { out[out.length] = '_'; }
            count += 1;
            break;
        case '}':
            count -= 1;
            if (!strip) { out[out.length] = '_'; }
            inComment = false;
            break;
        case ')':
            if (!inComment) { count -= 1; }
            if (!strip) { out[out.length] = '_'; }
            break;
        case '\t':
            out[out.length] = ' ';
            break;
        default:
            if (count > 0) {
                if (!strip) { out[out.length] = '_'; }
            } else {
                out[out.length] = c;
            }
		}
	}
	return out.join("");
};
/**
 *	Extract a comment starting from the beginning of the the pgn string.
 */
Pgn.prototype.extractGameIntro = function () {
    "use strict";
	this.gameIntro = null;

	this.pgn.trim();
	if (this.pgn.charAt(0) === '{') {
		this.gameIntro = this.pgn.substring(1, this.pgn.indexOf("}"));
		this.pgn = this.pgn.slice(this.pgn.indexOf("{"));
	}

	return;
};
/**
 *	Extract a comment starting from the beginning of the the pgn string.
 */
Pgn.prototype.extractPostGame = function () {
    "use strict";
	this.postGame = null;

	this.pgn.trim();
	if (this.pgn.charAt(this.pgn.length - 1) === '}') {
		this.postGame = this.pgn.substring(this.pgn.lastIndexOf("{") + 1,
				this.pgn.lastIndexOf("}"));
		this.pgn = this.pgn.slice(0, this.pgn.lastIndexOf("{"));
	}

	this.pgn = this.pgn.trim();
	return;
};
