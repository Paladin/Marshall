/**
 * @classdesc
 * Convert PGN format to an easier format. The problem
 * with PGN is that it is really difficult and ugly to
 * accomplish backward moves. 
 * 
 * Let's say we have a move "e4" and we need to go one 
 * move back. The only info is that we have placed a pawn
 * to e4. We also have to remember from where did we place
 * the pawn. To make it easier and to have less calculations
 * the PGN is converted into a format where the from square
 * with contents is explicit and to square also. There are
 * other problems also regarding backward moving and remembering
 * which piece was taken.
 *
 * @constructor
 * @param {obj} pgn The pgn data
 *
 * @property {object}	pgn				- The pgn data object
 * @property {array}	vBoard			- Virtual Board
 * @property {array}	initialBoard	- Staring board
 * @property {boolean}	whiteToMove		- boolean flag
 * @property {integer}	startMoveNum	- starting move number
 *
 * @version 0.7.1
 * @author Toomas Ršmer
 * @author Arlen P Walker
 * @copyright 2008 Toomas Ršmer
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
 **/
var Converter = function (pgn) {
	"use strict";

	this.pgn = pgn;
	this.vBoard = new VBoard(this.pgn.props.FEN);
	this.initialBoard = new VBoard(this.pgn.props.FEN);
	this.startMoveNum = this.vBoard.getMoveNumber();
};
Converter.prototype = {
	whiteToMove:		true,
	startMoveNum:		1,
	/**
	 * Convert the identified file
	 **/
    convert:	function () {
        "use strict";
        var move = this.pgn.moveTree.next;

        this.convertLine(this.vBoard, move);
    },
    convertLine:        function (board, move) {
        "use strict";
        var variation;
        while (move !== null) {
            this.convertMove(board, move);
            if (move.down !== null) {
                if (move.previous) {
                    variation = new VBoard(move.previous.position);
                } else {
                    if (move.up) {
                        variation = new VBoard(move.goTop().previous.position);
                    }
                }
                this.convertLine(variation, move.down);
            }
            move = move.next;
        }
    },

    /*
        EOF Result Iterator
    */

    getStartPos:	function () {
        "use strict";
        return this.initialBoard;
    },

    getEndPos:	function () {
        "use strict";
        return this.vBoard;
    },

        /*
            Convert a move.
        */
    convertMove:	function (board, move) {
        "use strict";
        var from,
            parsed,
            thePiece,
            theMove,
            theSource,
            isCapture = false,
            theDestination,
            promotedTo,
            theNotes,
            newPiece;

        parsed = move.text.match(
            new RegExp("O-O-O|O-O|0-0|0-0-0|([NBRQK]?)" +   // Piece (castling)
                "([a-h]?[1-8]?)" +                          // from or to
                "(x)?" +                                    // Capture made
                "([a-h][1-8])?" +                           // to if not before
                "=?([NBRQ]?)" +                             // Promoted to
                "([+#!?]*)"                                 // Move Annotations
                )
        );
        theMove = parsed[0];
        thePiece = parsed[1];
        if (parsed[4]) {
            theSource = parsed[2];
            theDestination = parsed[4];
        } else {
            theSource = "";
            theDestination = parsed[2];
        }
        isCapture = parsed[3] === "x" ? true : false;
        promotedTo = parsed[5] || "";
        theNotes = parsed[6];

        switch (theMove) {
        case "O-O":
        case "0-0":
            board.place(move.color === "black" ? "k" : "K",
                move.color === "black" ? "g8" : "g1");
            board.clear(move.color === "black" ? "e8" : "e1");
            thePiece = "R";
            from = move.color === "black" ? "h8" : "h1";
            theDestination = move.color === "black" ? "f8" : "f1";
            break;
        case "O-O-O":
        case "0-0-0":
            board.place(move.color === "black" ? "k" : "K",
                move.color === "black" ? "c8" : "c1");
            board.clear(move.color === "black" ? "e8" : "e1");
            thePiece = "R";
            from = move.color === "black" ? "a8" : "a1";
            theDestination = move.color === "black" ? "d8" : "d1";
            break;
        default:
            switch (thePiece) {
            case "N":
            case "B":
            case "Q":
            case "R":
                from = board.findFromPiece(thePiece, theDestination,
                    theSource, move.color);
                break;
            case "K":
                from =
                    board.whereIs(move.color === "white" ? "K" : "k")[0];
                break;
            case "":
                if (theSource.length === 2 && theDestination.length === 2) {
                    from = theSource;
                } else {
                    from = board.findFromPawn(theDestination, theSource,
                        move.color, isCapture);
                }
                break;
            default:
                throw ("Can't figure out which piece to move '" +
                    move.text + "'");
            }
        }
        promotedTo =
            move.color === "black" ? promotedTo.toLowerCase() : promotedTo;
        newPiece =
            promotedTo === "" ? board.whatsOn(from).symbol : promotedTo;
        board.place(newPiece, theDestination);
        board.clear(from);

        move.position = board.getFEN();
    }
};