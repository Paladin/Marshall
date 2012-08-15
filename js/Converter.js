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
 * @property {array}	moves			- array of moves
 * @property {integer}	iteIndex		- 
 * @property {boolean}	whiteToMove		- boolean flag
 * @property {integer}	startMoveNum	- starting move number
 * @property {array}	wKing			- Where are the white kings?
 * @property {array}	bKing			- Where are the Black Kings?
 * @property {array}	wQueens			- Where are the white queens?
 * @property {array}	bQueens			- Where are the Black queens?
 * @property {array}	wBishops		- Where are the white Bishops?
 * @property {array}	bBisohps		- Where are the Black bishops?
 * @property {array}	wRooks			- Where are the white rooks?
 * @property {array}	bRooks			- Where are the Black rooks?
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
	this.moves = [];

	this.wKing = [];
	this.bKing = [];
	this.wQueens = [];
	this.bQueens = [];
	this.wBishops = [];
	this.bBishops = [];
	this.wRooks = [];
	this.bRooks = [];
};
Converter.prototype = {
	iteIndex:			0,
	whiteToMove:		true,
	startMoveNum:		1,
	/**
	 * Convert the identified file
	 **/
    convert:	function () {
        "use strict";
        var move = this.pgn.moveTree.next,
            thisMove;
//         do {
//             thisMove = this.pgn.nextMove();
//             if (thisMove) {
//                 move = this.convertMove( this.vBoard,
//                     {"text": thisMove[0], "color": thisMove[1]}
//                 );
//             } else {
//                 move = null;
//             }
//             this.moves[this.moves.length] = move;
//         } while (move);
        this.convertLine(this.vBoard, move);
    },
    convertLine:        function(board, move) {
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
        Result iterator
    */
    getCurMove:	function () {
        "use strict";
        if (this.moves.length > this.iteIndex) {
            return this.moves[this.iteIndex];
        }
        return null;
    },

    getCurMoveNo:	function () {
        "use strict";
        return this.iteIndex;
    },

    setCurMoveNo:	function (ply) {
        "use strict";
        this.iteIndex = ply;
    },

    nextMove:	function () {
        "use strict";
        if (this.moves.length > this.iteIndex) {
            this.iteIndex += 1;
            return this.moves[this.iteIndex - 1];
        }
        return null;
    },

    getPrevPosition:	function () {
        "use strict";
        return this.moves[this.iteIndex - 1].position;
    },

    prevMove:	function () {
        "use strict";
        if (this.iteIndex > 0) {
            this.iteIndex -= 1;
            return this.moves[this.iteIndex];
        }
        return null;
    },

    resetToEnd:	function () {
        "use strict";
        this.iteIndex = this.moves.length;
    },

    resetToStart:	function () {
        "use strict";
        this.iteIndex = 0;
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
            newPiece,
            myMove = null;

        parsed = move.text.match(/O-O-O|O-O|0-0|0-0-0|([NBRQK]?)([a-h]?[1-8]?)(x)?([a-h][1-8])?=?([NBRQ]?)([\+#!\?]*)/);
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

//         myMove = new MyMove();
//         myMove.moveStr = move.text;
        move.position = board.getFEN();
// 
//         return myMove;
    },
    /*
       Find from any move
    */
    findFromAny:	function (toSAN, toCoords) {
        "use strict";
        if (toCoords[2][0] !== -1 && toCoords[2][1] !== -1) {
            return [toCoords[2][1], toCoords[2][0]];
        }

        throw ('No move found for the generic move ' + toSAN);
    },
    movePiece:	function (from, to, prom) {
        "use strict";
        var hist = to.clone(),
            tmpPiece = from.piece,
            pPiece = null;

        to.piece = from.piece;
        to.color = from.color;
        to.type = from.type;

        from.piece = null;
        from.color = null;
        from.type = null;

        // promoting the piece
        if (prom.length > 0) {
            pPiece = tmpPiece;

            switch (prom) {
            case 'R':
                to.piece = 'rook';
                break;
            case 'B':
                to.piece = 'bishop';
                break;
            case 'N':
                to.piece = 'knight';
                break;
            case 'Q':
                to.piece = 'queen';
                break;
            default:
                throw ('Unknown promotion');
            }
        }
        return [from, to, hist, pPiece];
    }
};