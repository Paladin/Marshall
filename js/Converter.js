/**
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
 * @property {boolean}	flippedI		- 
 * @property {boolean}	flippedV		- 
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
function Converter(pgn) {
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
}
Converter.prototype = {
	iteIndex:			0,
	whiteToMove:		true,
	startMoveNum:		1,
	flippedI:			false,
	flippedV:			false,
    placePiece:	function (theSquare, thePiece, theColor) {
        "use strict";
        theSquare.piece = thePiece;
        theSquare.color = theColor;
    },

    convert:	function () {
        "use strict";
        var move = null;
        do {
            move = this.convertMove();
            if (move) {
                move.position = this.vBoard.getFEN();
            }
            this.moves[this.moves.length] = move;
        } while (move);
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
    convertMove:	function () {
        "use strict";
        var to = this.pgn.nextMove(),
            oldTo = to,
            color,
            toCoords,
            from,
            parsed,
            moveText,
            thePiece,
            theMove,
            theSource,
            isCapture = false,
            theDestination,
            promotedTo,
            theNotes,
            newPiece,
            myMove = null;

        if (to === null) {
            return;
        }

        color = to[1];
        to = to[0];
        moveText = to;
        toCoords = this.getSquare(moveText);

        parsed = moveText.match(/O-O-O|O-O|0-0|0-0-0|([NBRQK]?)([a-h]?[1-8]?)(x)?([a-h][1-8])?=?([NBRQ]?)([\+#!\?]*)/);
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
            this.vBoard.place(color === "black" ? "k" : "K",
                color === "black" ? "g8" : "g1");
            this.vBoard.clear(color === "black" ? "e8" : "e1");
            thePiece = "R";
            from = color === "black" ? "h8" : "h1";
            theDestination = color === "black" ? "f8" : "f1";
            break;
        case "O-O-O":
        case "0-0-0":
            this.vBoard.place(color === "black" ? "k" : "K",
                color === "black" ? "c8" : "c1");
            this.vBoard.clear(color === "black" ? "e8" : "e1");
            thePiece = "R";
            from = color === "black" ? "a8" : "a1";
            theDestination = color === "black" ? "d8" : "d1";
            break;
        default:
            switch (thePiece) {
            case "N":
                from = this.vBoard.findFromKnight(theDestination, theSource,
                    color);
                break;
            case "B":
                from = this.vBoard.findFromBishop(theDestination, theSource,
                    color);
                break;
            case "Q":
                from = this.vBoard.findFromQueen(theDestination, theSource,
                    color);
                break;
            case "R":
                from = this.vBoard.findFromRook(theDestination, theSource,
                    color);
                break;
            case "K":
                from = this.vBoard.whereIs(color === "white" ? "K" : "k")[0];
                break;
            case "":
                if (theSource.length === 2 && theDestination.length === 2) {
                    from = theSource;
                } else {
                    from = this.vBoard.findFromPawn(theDestination, theSource,
                        isCapture, color);
                }
                break;
            default:
                throw ("Can't figure out which piece to move '" + oldTo + "'");
            }
        }
        promotedTo = color === "black" ? promotedTo.toLowerCase() : promotedTo;
        newPiece =
            promotedTo === "" ? this.vBoard.whatsOn(from).symbol : promotedTo;
        this.vBoard.place(newPiece, theDestination);
        this.vBoard.clear(from);

        myMove = new MyMove();
        myMove.moveStr = oldTo[0];
        myMove.position = this.vBoard.getFEN();

        return myMove;
    },
    /**
     *	Update piece location Array
     */
    updatePieceLocation:	function (from, fromCoords,
        toCoords, piece) {
        "use strict";
        var idx,
            locationArray = from.color.substring(0, 1) + piece + "s";

        idx = this.findPieceIdx(this[locationArray], fromCoords);
        this[locationArray][idx][0] = toCoords[0];
        this[locationArray][idx][1] = toCoords[1];
    },
    /**
     *	Clean up after capturing a piece
     */
    cleanUpAfterCapture:	function (to, toCoords) {
        "use strict";
        var idx;

        if ('queen' === to.piece) {
            if ('white' === to.color) {
                idx = this.findPieceIdx(this.wQueens, toCoords);
                this.wQueens.splice(idx, 1);
            } else {
                idx = this.findPieceIdx(this.bQueens, toCoords);
                this.bQueens.splice(idx, 1);
            }
        } else if ('bishop' === to.piece) {
            if ('white' === to.color) {
                idx = this.findPieceIdx(this.wBishops, toCoords);
                this.wBishops.splice(idx, 1);
            } else {
                idx = this.findPieceIdx(this.bBishops, toCoords);
                this.bBishops.splice(idx, 1);
            }
        } else if ('rook' === to.piece) {
            if ('white' === to.color) {
                idx = this.findPieceIdx(this.wRooks, toCoords);
                this.wRooks.splice(idx, 1);
            } else {
                idx = this.findPieceIdx(this.bRooks, toCoords);
                this.bRooks.splice(idx, 1);
            }
        }
    },
        /* FINDING FROM LOCATION FUNCTIONS
            When a SAN (Standard Algebraic Notation) move is given
            we need to figure out from where the move is made. Lets
            say the SAN is "e4" - pawn moves to e4. The from location
            can be e2, e3 or e5. This depends on the color of the player
            and on where the pawn was located. All pieces have different
            logic on finding which piece exactly has to move to the location.
        */
    findPieceIdx:	function (arr, coords) {
        "use strict";
        var i;

        for (i = 0; i < arr.length; i += 1) {
            if (arr[i][0] === coords[0] && arr[i][1] === coords[1]) {
                return i;
            }
        }
    },
        /*
            Find the pawn from location.
        */
    findFromPawn:	function (pos, to, tmp, color) {
        "use strict";
        var x = tmp[1],
            y = tmp[0],
            froms,
            i,
            j,
            j2;

        if (tmp[2][0] !== -1 && tmp[2][1] !== -1) {
            return [tmp[2][1], tmp[2][0]];
        }

        // taking move or with xtra information
        if (tmp[2][0] !== -1 || tmp[3] !== -1) {
            froms = [
                [tmp[0] + 1, tmp[1] - 1],
                [tmp[0] + 1, tmp[1] + 1],
                [tmp[0] - 1, tmp[1] - 1],
                [tmp[0] - 1, tmp[1] + 1]
            ];

            for (i = 0; i < froms.length; i += 1) {
                try {
                    if (pos[froms[i][0]][froms[i][1]].piece === 'pawn' &&
                            pos[froms[i][0]][froms[i][1]].color === color) {
                        // we have the file information too
                        if (tmp[3] !== -1 && tmp[3] === froms[i][1]) {
                            // no back taking
                            if (y < froms[i][0] && color === "black") {
                                continue;
                            }
                            if (y > froms[i][0] && color === "white") {
                                continue;
                            }
                            return [froms[i][0], froms[i][1]];
                        }
                            //else
                            //	return new Array(froms[i][0], froms[i][1])
                    }
                } catch (e) {}
            }
        } else {
            // non-taking move
            try {
                for (i = 0; i < 8; i += 1) {
                    j = (color === 'white') ? 7 - i : i;
                    if (pos[j][x].piece === 'pawn' &&
                            pos[j][x].color === color) {
                        if (Math.abs(j - y) > 2) {
                            continue;
                        }
                        // we might be looking at the wrong pawn
                        // there can be one between src and dst
                        if (2 === Math.abs(j - y)) {
                            j2 = (color === 'white') ? (j - 1) : j + 1;
                            if (pos[j2][x].piece === 'pawn' &&
                                    pos[j2][x].color === color) {
                                return [j2, x];
                            }
                        }
                        return [j, x];
                    }
                }
            } catch (e2) {}
        }
        throw ("Could not find a move with a pawn '" + to + "'");
    },
        /*
            Find the bishop from location.
        */
    findFromBish:	function (board, toSAN, toCoords, color) {
        "use strict";
        var arr,
            i;

        if (toCoords[2][0] !== -1 && toCoords[2][1] !== -1) {
            return [toCoords[2][1], toCoords[2][0]];
        }

        if (color === 'white') {
            arr = board.wBishops;
        } else {
            arr = board.bBishops;
        }
        for (i = 0; i < arr.length; i += 1) {
            if (Math.abs(arr[i][0] - toCoords[0]) ===
                    Math.abs(arr[i][1] - toCoords[1])) {
                return [arr[i][0], arr[i][1]];
            }
        }

        throw ('No move found for the bishop ' + toSAN);
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
    /* 
        Find the king from location.
    */
    findFromKing:	function (board, color) {
        "use strict";
        var x = board.wKingX,
            y = board.wKingY;

        if ("black" === color) {
            x = board.bKingX;
            y = board.bKingY;
        }
        return [x, y];
    },
    /* 
        Find the queen's from location.
    */
    findFromQueen:	function (board, pos, toSAN, to, color) {
        "use strict";
        var extra = to[2],
            rtrns = [],
            queens,
            i,
            dx,
            dy,
            rdx,
            rdy,
            x,
            y;

        if (to[2][0] !== -1 && to[2][1] !== -1) {
            return [to[2][1], to[2][0]];
        }

        if (color === 'white') {
            queens = board.wQueens;
        } else if (color === 'black') {
            queens = board.bQueens;
        }
        for (i = 0; i < queens.length; i += 1) {
            dx = Math.abs(to[0] - queens[i][0]);
            dy = Math.abs(to[1] - queens[i][1]);

            rdx = this.setMoveIncrement(to[0] - queens[i][0]);
            rdy = this.setMoveIncrement(to[1] - queens[i][1]);

            if (this.bishopMove(dx, dy) || this.rookMove(dx, dy)) {
                x = queens[i][0];
                y = queens[i][1];
                while (true) {
                    x += rdx;
                    y += rdy;
                    if (x === to[0] && y === to[1]) {
                        if (extra[0] !== -1 || extra[1] !== -1) {
                            if (extra[0] !== queens[i][1] &&
                                    extra[1] !== queens[i][0]) {
                                break;
                            }
                            return [queens[i][0], queens[i][1]];
                        }
                        rtrns[rtrns.length] = [queens[i][0], queens[i][1]];
                        break;
                    }
                    if (this.pathBlocked(pos[x][y])) {
                        break;
                    }
                }
            }
        }

        if (rtrns.length > 1) {
            for (i = 0; i < rtrns.length; i += 1) {
                if (!this.leavesOwnKingInCheck(board, pos, rtrns[i])) {
                    return rtrns[i];
                }
            }
        } else if (rtrns.length === 1) {
            return rtrns[0];
        }

        throw ("No queen move found '" + toSAN + "'");
    },
        /* 
            Find the rook's from location.
        */
    findFromRook:	function (board, pos, toSAN, to, color) {
        "use strict";
        var extra = to[2],
            rtrns = [],
            rooks,
            i,
            dx,
            dy,
            rdx,
            rdy,
            x,
            y;

        if (color === 'white') {
            rooks = board.wRooks;
        } else {
            rooks = board.bRooks;
        }

        // loop through rooks and lets see
        // which one can move to the position
        for (i = 0; i < rooks.length; i += 1) {
            dx = Math.abs(to[0] - rooks[i][0]);
            dy = Math.abs(to[1] - rooks[i][1]);

            rdx = this.setMoveIncrement(to[0] - rooks[i][0]);
            rdy = this.setMoveIncrement(to[1] - rooks[i][1]);

            if (this.rookMove(dx, dy)) {
                x = rooks[i][0];
                y = rooks[i][1];
                while (true) {
                    x += rdx;
                    y += rdy;
                    if (x === to[0] && y === to[1]) {
                        // if we have all extra information
                        // and positions match, we have a win
                        if (extra[0] !== -1 && extra[1] !== -1) {
                            if (extra[1] === rooks[i][0] &&
                                    extra[0] === rooks[i][1]) {
                                return [rooks[i][0], rooks[i][1]];
                            }
                        } else if (extra[0] !== -1 || extra[1] !== -1) {
                            if (extra[1] !== rooks[i][0] &&
                                    extra[0] !== rooks[i][1]) {
                                break;
                            }
                            return [rooks[i][0], rooks[i][1]];
                        }
                        rtrns[rtrns.length] = [rooks[i][0], rooks[i][1]];
                        break;
                    }
                    if (this.pathBlocked(pos[x][y])) {
                        break;
                    }
                }
            }
        }

        if (rtrns.length > 1) {
            for (i = 0; i < rtrns.length; i += 1) {
                if (!this.leavesOwnKingInCheck(board, pos, rtrns[i])) {
                    return rtrns[i];
                }
            }
        } else if (rtrns.length === 1) {
            return rtrns[0];
        }

        throw ("No rook move found '" + toSAN + "'");
    },
        /* 
            Find the knight's from location.
        */
    findFromKnight:	function (brd, toSAN, to, color) {
        "use strict";
        var originFromMove = to[2],
            pos = brd.vBoard,
            rtrns = [],
            froms = this.possibleKnightOrigins(to),
            i;

        if (this.originGiven(to)) {
            return [originFromMove[1], originFromMove[0]];
        }

        for (i = 0; i < froms.length; i += 1) {
            try {
                if (this.isMyKnight(pos, froms[i], color) &&
                        this.matchOrigin(froms[i], originFromMove)) {
                    rtrns[rtrns.length] = [froms[i][0], froms[i][1]];
                }
            } catch (e) {}
        }
        /*
         *	TODO: Some tests leave king in check, examine further.
         */
        if (rtrns.length > 1) {
            for (i = 0; i < rtrns.length; i += 1) {
                if (!this.leavesOwnKingInCheck(brd, pos, rtrns[i])) {
                    return rtrns[i];
                }
            }
        } else if (rtrns.length === 1) {
            return rtrns[0];
        }
        throw ("No knight move found. '" + toSAN + "'");
    },

    setMoveIncrement:	function (delta) {
        "use strict";

        if (delta === 0) {
            return delta;
        }
        return delta / Math.abs(delta);
    },
    rookMove:	function (dx, dy) {
        "use strict";
        return dx === 0 || dy === 0;
    },
    bishopMove:	function (dx, dy) {
        "use strict";
        return dx === dy;
    },
    pathBlocked:	function (path) {
        "use strict";
        return path && path.piece;
    },

    leavesOwnKingInCheck:	function (brd, pos, from) {
        "use strict";

        var holdMe = pos[from[0]][from[1]],
            checked;

        pos[from[0]][from[1]] = new vSquare();

        checked = this.isKingChecked(brd, from.color, pos);
        pos[from[0]][from[1]] = holdMe;

        return checked;
    },

    matchOrigin:	function (possible, given) {
        "use strict";
        return ((given[0] === -1 || possible[1] === given[0]) &&
                    (given[1] === -1 || possible[0] === given[1]));
    },

    isMyKnight:	function (virtualBoard, from, color) {
        "use strict";
        return (virtualBoard[from[0]][from[1]].piece === 'knight' &&
                 virtualBoard[from[0]][from[1]].color === color);
    },

    originGiven:	function (to) {
        "use strict";
        return (to[2][0] !== -1 && to[2][1]  !== -1);
    },

    possibleKnightOrigins:	function (destination) {
        "use strict";
        return [
            [destination[0] + 2, destination[1] + 1],
            [destination[0] + 2, destination[1] - 1],

            [destination[0] - 2, destination[1] + 1],
            [destination[0] - 2, destination[1] - 1],

            [destination[0] + 1, destination[1] + 2],
            [destination[0] - 1, destination[1] + 2],

            [destination[0] + 1, destination[1] - 2],
            [destination[0] - 1, destination[1] - 2]
        ];
    },
        /*
         * Converts a SAN (Standard Algebraic Notation) into 
         * board coordinates. The SAN is in the format of
         * eg e4, dxe4, R2b7. When SAN contains extra information
         * "taking move", "en passante", "check", "piece from a
         * specific file or rank" it is also extracted.
        */
    getSquare:	function (coord) {
        "use strict";
        var map = {
                a: 7,
                b: 6,
                c: 5,
                d: 4,
                e: 3,
                f: 2,
                g: 1,
                h: 0
            },
            extra = [-1, -1],
            taking = -1,
            tmp,
            rtrn;

        if (arguments.length !== 1) {
            throw "Wrong number of arguments";
        }

        // if only from certain file we can make the move

        // trim the everything from +
        if (coord.indexOf("+") !== -1) {
            coord = coord.substring(0, coord.indexOf("+"));
        }
        // let's trim the piece prefix
        if (/^[A-Z]/.test(coord) ||
                /^[nbrqk]{1,1}[abcdefgh]{1,1}/.test(coord)) {
            coord = coord.substr(1);
        }

        // the move is a taking move, we have to look for different
        // files then with pawns
        if (/x/.test(coord)) {
            tmp = coord.split("x");
            if (tmp[0].length) {
                if (/[a-z][0-9]/.test(tmp[0])) {
                    extra[0] = 7 - map[tmp[0].charAt(0)];
                    extra[1] = 8 - tmp[0].charAt(1);
                } else if (/[a-z]/.test(tmp[0])) {
                    extra[0] = 7 - map[tmp[0]];
                } else if (/[0-9]/.test(tmp[0])) {
                    extra[1] = 8 - tmp[0];
                }
            }
            coord = tmp[1];
            taking = 7 - map[tmp[0]];
        }

        // we have extra information on the from file
        // eg Rbd7
        if (/^[a-z]{2,2}/.test(coord)) {
            extra[0] = 7 - map[coord.substring(0, 1)];
            coord = coord.substring(1);
        }

        // we have the row no
        // eg R8d5
        if (/^[0-9][a-z][0-9]/.test(coord)) {
            extra[1] = 8 - coord.substring(0, 1);
            coord = coord.substring(1);
        }

        // we have both Ng8e7
        if (/^([a-z][0-9])[a-z][0-9]/.test(coord)) {
            tmp = coord.match(/^([a-z][0-9])[a-z][0-9]/);
            extra[0] = 7 - map[tmp[1].charAt(0)];
            extra[1] = 8 - tmp[1].charAt(1);
            coord = coord.replace(/[a-z][0-9]/, "");
        }

        // we have Yahoo format, e2-e4
        if (/^([a-z][0-9])-([a-z][0-9])/.test(coord)) {
            tmp = coord.match(/^([a-z][0-9])-([a-z][0-9])/);
            extra[0] = 7 - map[tmp[1].charAt(0)];
            extra[1] = 8 - tmp[1].charAt(1);
            coord = tmp[2];
        }

        rtrn = [8 - coord.charAt(1), 7 - map[coord.charAt(0)],
                                extra, taking];

        return rtrn;
    },
    /*
     * Finds location of pawn captured en passant
     */
    getEnPassante:	function (brd, from, to) {
        "use strict";

        // pawn move
        if ("pawn" !== brd.whatsOn(from).piece) {
            return null;
        }
        // taking move
        if (brd.isSameFile(to, from)) {
            return null;
        }
        // destination should be null
        if (brd.whatsOn(to).piece !== "empty") {
            return null;
        }
        // the piece we are looking for
        return to.charAt(0) + from.charAt(1);
    },
    getOppColor:	function (color) {
        "use strict";
        return "white" === color ? "black" : "white";
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
    },
    isKingChecked:	function (brd, col) {
        "use strict";
        var x,
            y;

        if ("black" === col) {
            x = brd.bKingX;
            y = brd.bKingY;
        } else {
            x = brd.wKingX;
            y = brd.wKingY;
        }
        // diagonals, looking for bishops, queens
        if (this.checkFound(brd.vBoard, x, y, -1, -1, col,
                ["bishop", "queen"])) {
            return true;
        }
        if (this.checkFound(brd.vBoard, x, y, 1, 1, col, ["bishop", "queen"])) {
            return true;
        }
        if (this.checkFound(brd.vBoard, x, y, 1, -1, col,
                ["bishop", "queen"])) {
            return true;
        }
        if (this.checkFound(brd.vBoard, x, y, -1, 1, col,
                ["bishop", "queen"])) {
            return true;
        }

        // horizontals, verticals - looking for rooks and queens
        if (this.checkFound(brd.vBoard, x, y, 0, 1, col, ["rook", "queen"])) {
            return true;
        }
        if (this.checkFound(brd.vBoard, x, y, 0, -1, col, ["rook", "queen"])) {
            return true;
        }
        if (this.checkFound(brd.vBoard, x, y, 1, 0, col, ["rook", "queen"])) {
            return true;
        }
        if (this.checkFound(brd.vBoard, x, y, -1, 0, col, ["rook", "queen"])) {
            return true;
        }

        return false;
    },

    checkFound:	function (board, rank, file, deltaRank,
                                    deltaFile, color, pieces) {
        "use strict";
        var opponent = this.getOppColor(color),
            theSquare,
            i;

        try {
            for (i = 1; i < 8; i += 1) {
                theSquare =
                    board[rank + (i * deltaRank)][file + (i * deltaFile)];
                if (theSquare.color === color) {
                    break;
                }
                if (theSquare.color === opponent) {
                    if (pieces.indexOf(theSquare.piece) > -1) {
                        return true;
                    }
                    break;
                }
            }
        } catch (e) {}
        return false;
    }
};