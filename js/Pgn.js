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
	this.moves = [];	// the moves, one move contains the black and white move

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
Pgn.prototype = {
	props:          null,
	requiredProps:	['Result', 'Black', 'White', 'Date',
								'Round', 'Site', 'Event'],
	requiredLength:	7,
	moves:          null,	// the moves,
	currentMove:    0,	// the current move in the game
	skip:			0,	// which ply at start? 0=white's, 1=black's
	gameIntro:		null,
	pgnOrig:        null,
	pgn:            null,
	pgnRaw:         null,
	pgnStripped:    null,
	moveTree:       null,
    /**
     *	Checks FEN to see if it is Black to start
     */
    isBlackToMove:	function (FEN) {
        "use strict";
        return (FEN && / b | B /.test(FEN));
    },
    /**
     *	Tests to see if last move entry should be dropped. It should be
     *  dropped if not a move, but rather a result/partial game indicator.
     */
    dropLastMove:	function (themoves) {
        "use strict";
        return !!themoves[themoves.length - 1].
            match(/1\/2-1\/2|0-1|1-0|\*|\.\.\./);
    },
    /**
     *	Pull any info the move contains about its origin into the move as well
     */
    includeOrigination:	function (move) {
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
    },
    /**
     *	If the move is prefaced by a move number, remove it. If the token
     *  contains only a move number, with no move, it will be emptied.
     */
    removeMoveNumber:	function (move) {
        "use strict";
        return move.replace(/^[1-9][0-9]*\.?[ ]*/g, "");
    },
    /**
     *	will return the pgn string without comments or with comments replaced
     *  by underscores.
     */
    stripComments:	function (pgn, replace) {
        "use strict";
        var substitute,
            interim,
            theMoves,
            theMovesBegin;

        if (replace) {
            substitute = "";
        } else {
            substitute = function (theString) {
                var a = [];
                a.length = parseInt(theString.length, 10) + 1;
                return a.join("_");
            };
        }
        interim = pgn.replace(/\{(.)*?\}/g, substitute);
        while (interim.match(/\([^()]*\)/)) {
            interim = interim.replace(/\([^()]*\)/g, substitute);
        }

        theMoves = interim.replace(/\[[^\]]*\]/g, '').trim();
        theMovesBegin = theMoves.replace(/[_ ]*/, "");
        if (!parseInt(theMovesBegin.charAt(0), 10)) {
            if (replace) {
                interim =
                    interim.substring(0, interim.length - theMoves.length);
            } else {
                interim = interim.substring(0,
                    interim.length - theMoves.length) + substitute(theMoves);
            }
        }
        return interim;
    },
    /**
     *	Does the move have information on its origin as well as destination
     */
    moveHasOrigination:	function (move) {
        "use strict";
        return move.indexOf("-") !== -1 &&
                 !/[0|o]-[0|o]/i.test(move) &&
                 !/[0|o]-[0|o]-[0|o]/i.test(move);
    },
    /**
     *	This will "normalize" the pgn file by removing line breaks, collapsing
     *  strings of spaces, and replacing the symbols for moves with the
     *  characters (!, ?, etc.)
     */
    normalize:	function (pgn) {
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
    },
    /**
     *	This function takes a pgn game string and extracts all the tags into
     *  the class variable props as key/value pairs. it returns the pgn string,
     *  minus the tags.
     */
    extractTags:	function (pgn) {
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
    },

    nextMove:	function () {
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
    },

    getComment:	function (move, idx) {
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
    },
    /**
     *	Extract a comment starting from the beginning of the the pgn string.
     */
    extractGameIntro:	function () {
        "use strict";
        this.gameIntro = null;

        this.pgn.trim();
        if (this.pgn.charAt(0) === '{') {
            this.gameIntro = this.pgn.substring(1, this.pgn.indexOf("}"));
            this.pgn = this.pgn.slice(this.pgn.indexOf("{"));
        }

        return;
    },
    /**
     *	Extract a comment starting from the beginning of the the pgn string.
     */
    extractPostGame:	function () {
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
    },
    /**
     *  Main parsing function for PGN text
     *
     * @param   {string}    The PGN text to be parsed
     */
    parse:  function (theText) {
        "use strict";
        var text = theText,
            switcher,
            previous,
            move = new MoveTree();

        this.tags = [];
        this.moveTree = move;
        while (text.length > 0) {
            switcher = text.charAt(0);
            if (/[\[]/.test(switcher)) {
                text = this.parseTag(text);
            } else if (this.isResult(text)) {
                text = this.parseResult(text, move);
            } else if (/[0-9]/.test(switcher)) {
                if (!move.isEmpty()) {
                    move.next = new MoveTree();
                    previous = move;
                    move = move.next;
                    move.previous = previous;
                }
                text = this.parseMoveNumber(text, move);
            } else if (/[a-hKQRBN]/.test(switcher)) {
                if (move.text !== null) {
                    move.next = new MoveTree();
                    previous = move;
                    move = move.next;
                    move.previous = previous;
                }
                text = this.parseMoveText(text, move);
            } else if (/[{]/.test(switcher)) {
                text = this.parseCommentary(text, move);
            } else if (/\(/.test(switcher)) {
                move = move.goBottom();
                move.down = new MoveTree();
                previous = move;
                move = move.down;
                move.up = previous;
                text = text.slice(1);
            } else if (/\)/.test(switcher)) {
                move = move.goStart();
                move = move.goTop();
                text = text.slice(1);
            } else {
                text = text.slice(1);
            }
        }
    },
    /**
     *  Parses a PGN tag
     *
     * @param   {string}    The text that is being parsed
     * @return  {string}    The text with all but the "]" removed
     */
    parseTag:  function (gameText) {
        "use strict";
        var text = gameText,
            tag;

        tag = text.substring(0, text.indexOf("]"));
        text = text.slice(tag.length);
        tag = tag.match(/([a-zA-Z0-9]*)\s\"((.)*)\"/);
        this.tags[tag[1]] = tag[2];
        return text;
    },
    /**
     *  Parses a PGN move number
     *
     * @param   {string}    The text that is being parsed
     * @param   {MoveTree}  The move to add the number to
     * @return  {string}    The text with all but the "]" removed
     */
    parseMoveNumber:  function (gameText, move) {
        "use strict";
        var text = gameText,
            tag;

        tag = text.match(/([0-9\. ]+)/);
        move.number = parseInt(tag[0], 10);
        text = text.slice(tag[0].length);
        return text;
    },
    /**
     *  Is the next token a result?
     *
     * @param   {string}    The text that is being parsed
     * @return  {boolean}   Is the next token a known result string?
     */
    isResult:  function (gameText) {
        "use strict";
        var text = gameText,
            match;

        return /^(1-0|0-1|1\/2-1\/2|1 - 0|0 - 1|1\/2 - 1\/2)/.test(text);
    },
    /**
     *  Parses a PGN result
     *
     * @param   {string}    The text that is being parsed
     * @param   {MoveTree}  The move to add the number to
     * @return  {string}    The text with all but the "]" removed
     */
    parseResult:  function (gameText, move) {
        "use strict";
        var text = gameText,
            tag;

        move.result =
            text.match(/^(1-0|0-1|1 - 0|0 - 1|1\/2-1\/2|1\/2 - 1\/2)/)[0];
        text = text.slice(move.result.length);
        return text;
    },
    /**
     *  Parses a PGN move
     *
     * @param   {string}    The text that is being parsed
     * @param   {MoveTree}  The move to add the number to
     * @return  {string}    The text with all but the "]" removed
     */
    parseMoveText:  function (gameText, move) {
        "use strict";
        var text = gameText,
            tag;

        move.text = text.match(/(^[a-hxNBRQKO\-+#=0-8!?]+)/)[0];
        text = text.slice(move.text.length);
        return text;
    },
    /**
     *  Parses a PGN comment
     *
     * @param   {string}    The text that is being parsed
     * @param   {MoveTree}  The move to add the number to
     * @return  {string}    The text with all but the "]" removed
     */
    parseCommentary:  function (gameText, move) {
        "use strict";
        var text = gameText,
            commentary;

        commentary = text.substring(1,text.indexOf("}"));
        text = text.slice(commentary.length + 1);
        if(move.isEmpty()) {
            this.gameIntro = commentary;
        } else {
            move.commentary.push(commentary);
        }
        return text;
    }
};
