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
 * @property {string}	pgnOrig         - original PGN string
 *
 * @version 0.7.1
 * @author Toomas Ršmer
 * @author Arlen P Walker
 * @copyright 2008 Toomas R&#246;mer
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
 **/
var Pgn = function (pgn) {
    "use strict";
	var themoves,
	    sizeOfTheMoves,
	    i,
	    move,
	    pgnParsing,
	    ply = [null, null],
	    plyidx = 0;	//make this 1 if FEN and black to move

	// properties of the game eg players, ELOs etc
	this.props = {};

    this.pgnOrig = pgn;
    this.parse(pgn);
};
Pgn.prototype = {
	props:          null,
	requiredProps:	['Result', 'Black', 'White', 'Date',
								'Round', 'Site', 'Event'],
	requiredLength:	7,
	pgnOrig:        null,
	moveTree:       null,
    /**
     *  Main parsing function for PGN text
     *
     * @param   {string}    The PGN text to be parsed
     */
    parse:  function (theText) {
        "use strict";
        var text = theText,
            move = new MoveTree({"text": "..."}),
            levels = 0;

        this.color = "white";
        this.tags = {};
        this.moveTree = move;

        while (text.length > 0) {
            if (/[\[]/.test(text.charAt(0))) {
                text = this.parseTag(text);

            } else if (this.isResult(text)) {
                text = this.parseResult(text, move);

            } else if (/[0-9]/.test(text.charAt(0))) {
                if (!move.isEmpty()) { move = move.addNext(); }
                text = this.parseMoveNumber(text, move);

            } else if (/[a-hKQRBNOo]/.test(text.charAt(0))) {
                if (move.text !== null) { move = move.addNext(); }
                text = this.parseMoveText(text, move);
                move.color = this.color;
                if (move.text !== "O-O-O" && move.text !== "O-O") {
                    move.destination =
                        move.text.match(/([a-z][1-8])[!?+#]*$/)[1];
                }
                this.color = this.alternate(this.color, "white", "black");

            } else if ((/\$/).test(text.charAt(0))) {
                text = this.parseNAG(text, move);

            } else if (/[{]/.test(text.charAt(0))) {
                text = this.parseCommentary(text, move);

            } else if (/\(/.test(text.charAt(0))) {
                this.color = move.color;
                levels = 1;
                while (move.down !== null) {
                    move = move.down;
                    levels += 1;
                }
                move = move.addVariation();
                move.levelsToParent = levels;
                text = text.slice(1);

            } else if (/\)/.test(text.charAt(0))) {
                move = move.goStart();
                levels = move.levelsToParent;
                while (levels > 0) {
                    move = move.up || move;
                    levels -= 1;
                }
                this.color = this.alternate(move.color, "white", "black");
                text = text.slice(1);

            } else {
                text = text.slice(1);
            }
        }
    },
    /**
     *  Parses a NAG based on entries from the external NAG array
     *
     * @param   {string}    gameText    The text being parsed
     * @param   {object}    move        The move being parsed into
     * @return  {string}    The string after parsing out the NAG
     */
    parseNAG:       function (gameText, move) {
        var nagMatch = gameText.match(/^\$([0-9]{1,3})/),
            nagIndex = nagMatch[1];

        if (NAG[nagIndex]) {
            if (NAG[nagIndex].text) {
                move.text += NAG[nagIndex].code;
            } else {
                move.commentary.push(NAG[nagIndex].code);
            }
        }
        return gameText.slice(nagMatch[0].length);
    },
    /**
     *  Alternates between two options
     *
     * @param   {any}       - Current status
     * @param   {any}       - Option 1
     * @param   {any}       - Option 2
     */
    alternate:  function (current, option1, option2) {
        "use strict";
        if (current === option1) { return option2; }
        return option1;
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
        tag = tag.match(/([\w]*)\s\"([\w \\\/,\.:\-\?\*]*)\"/);
        this.props[tag[1]] = tag[2];
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
        var text = gameText;

        return (/^(1-0|0-1|1\/2-1\/2|1 - 0|0 - 1|1\/2 - 1\/2)/).test(text);
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
        var text = gameText;

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
        var text = gameText;

        move.text = text.match(/(^[a-hxNBRQKO\-+#=0-8!?]+)/)[0];
        if (move.number < 1) {
            if (move.previous) {
                move.number = move.previous.number;
            } else {
                if (move.up) { move.number = move.up.number; }
            }
        }
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

        commentary = text.substring(1, text.indexOf("}"));
        text = text.slice(commentary.length + 2);
        move.commentary.push(commentary);
        return text;
    }
};
