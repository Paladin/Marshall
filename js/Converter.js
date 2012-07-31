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
	var i,
		j;

	this.pgn = pgn;
	this.vBoard = new Array(8);
	this.initialBoard = new Array(8);
	this.moves = [];
	this.iteIndex = 0;
	this.whiteToMove = true;
	this.startMoveNum = 1;
	this.flippedI = false;
	this.flippedV = false;

	this.wKing = [];
	this.bKing = [];
	this.wQueens = [];
	this.bQueens = [];
	this.wBishops = [];
	this.bBishops = [];
	this.wRooks = [];
	this.bRooks = [];

	for (i = 0; i < 8; i += 1) {
		this.vBoard[i] = new Array(8);
		for (j = 0; j < 8; j += 1) {
			this.vBoard[i][j] = new vSquare();
		}
	}

	this.setupVirtualBoard(pgn.props.FEN);

	// let's clone the initial pos
	for (i = 0; i < 8; i += 1) {
		this.initialBoard[i] = new Array(8);
		for (j = 0; j < 8; j += 1) {
			this.initialBoard[i][j] = this.vBoard[i][j].clone();
		}
	}
}
/**
 *	Sets up a virtual board. Since the starting position is just a special case of
 *	FEN, it checks to see if it was given a FEN, if not defaults to start.
 */
Converter.prototype.setupVirtualBoard = function (FEN) {
	"use strict";
	var val,
		i,
		j,
		c,
		file;

	FEN = FEN || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
	val = FEN.split(/\/| /g);
	for (i = 0; i < 8; i += 1) {
		file = 0;
		for (j = 0; j < val[i].length; j += 1) {
			c = val[i].charAt(j);
			switch (c) {
			case 'p':
				this.placePiece(this.vBoard[i][file], 'pawn', 'black');
				file += 1;
				break;
			case 'n':
				this.placePiece(this.vBoard[i][file], 'knight', 'black');
				file += 1;
				break;
			case 'k':
				this.placePiece(this.vBoard[i][file], 'king', 'black');
				this.bKingX = i;
				this.bKingY = file;
				file += 1;
				break;
			case 'q':
				this.placePiece(this.vBoard[i][file], 'queen', 'black');
				this.bQueens[this.bQueens.length] = [i, file];
				file += 1;
				break;
			case 'r':
				this.placePiece(this.vBoard[i][file], 'rook', 'black');
				this.bRooks[this.bRooks.length] = [i, file];
				file += 1;
				break;
			case 'b':
				this.placePiece(this.vBoard[i][file], 'bishop', 'black');
				this.bBishops[this.bBishops.length] = [i, file];
				file += 1;
				break;
			case 'P':
				this.placePiece(this.vBoard[i][file], 'pawn', 'white');
				file += 1;
				break;
			case 'N':
				this.placePiece(this.vBoard[i][file], 'knight', 'white');
				file += 1;
				break;
			case 'K':
				this.placePiece(this.vBoard[i][file], 'king', 'white');
				this.wKingX = i;
				this.wKingY = file;
				file += 1;
				break;
			case 'Q':
				this.placePiece(this.vBoard[i][file], 'queen', 'white');
				this.wQueens[this.wQueens.length] = [i, file];
				file += 1;
				break;
			case 'R':
				this.placePiece(this.vBoard[i][file], 'rook', 'white');
				this.wRooks[this.wRooks.length] = [i, file];
				file += 1;
				break;
			case 'B':
				this.placePiece(this.vBoard[i][file], 'bishop', 'white');
				this.wBishops[this.wBishops.length] = [i, file];
				file += 1;
				break;
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
				file += parseInt(c, 10);
				break;
			}
		}
	}
	if (val[8] === "b") {
		this.whiteToMove = false;
	}
	this.startMoveNum = parseInt(val[12], 10);
};
Converter.prototype.placePiece = function (theSquare, thePiece, theColor) {
	"use strict";
	theSquare.piece = thePiece;
	theSquare.color = theColor;
};

Converter.prototype.convert = function () {
	"use strict";
	var move = null;
	do {
		move = this.convertMove();
		if (move) {
			move.position = this.getForsythe(this.vBoard);
		}
		this.moves[this.moves.length] = move;
	} while (move);
};
/*
	Result iterator
*/
Converter.prototype.getCurMove = function () {
	"use strict";
	if (this.moves.length > this.iteIndex) {
		return this.moves[this.iteIndex];
	}
	return null;
};

Converter.prototype.getCurMoveNo = function () {
	"use strict";
	return this.iteIndex;
};

Converter.prototype.nextMove = function () {
	"use strict";
	if (this.moves.length > this.iteIndex) {
		this.iteIndex += 1;
		return this.moves[this.iteIndex - 1];
	}
	return null;
};

Converter.prototype.prevMove = function () {
	"use strict";
	if (this.iteIndex > 0) {
		this.iteIndex -= 1;
		return this.moves[this.iteIndex];
	}
	return null;
};

Converter.prototype.resetToEnd = function () {
	"use strict";
	this.iteIndex = this.moves.length;
};

Converter.prototype.resetToStart = function () {
	"use strict";
	this.iteIndex = 0;
};

/*
	EOF Result Iterator
*/

Converter.prototype.getStartPos = function (flipped) {
	"use strict";
	if (flipped !== this.flippedI) {
		this.flipBoard(this.initialBoard);
		this.flippedI = !this.flippedI;
	}
	return this.initialBoard;
};

Converter.prototype.getEndPos = function (flipped) {
	"use strict";
	if (flipped !== this.flippedV) {
		this.flipBoard(this.vBoard);
		this.flippedV = !this.flippedV;
	}
	return this.vBoard;
};

Converter.prototype.flipBoard = function (board) {
	"use strict";
	var i,
		j,
		tmp;

	this.flipped = !this.flipped;
	for (i = 0; i < 8; i += 1) {
		for (j = 0; j < 4; j += 1) {
			tmp = board[i][j];
			board[i][j] = board[7 - i][7 - j];
			board[7 - i][7 - j] = tmp;
		}
	}
};

	/*
		Convert a move.
	*/
Converter.prototype.convertMove = function (board) {
	"use strict";
	var to = this.pgn.nextMove(),
		oldTo = to,
		color,
		pawnre = /^[a-z]+[1-8]/,
		genericre = /^[a-z][1-8]-[a-z][1-8]/,
		knightre = /^N[0-9]?[a-z]+[1-8]/i,
		bishre = /^B[a-z]+[1-8]/,
		queenre = /^Q([a-z]|[0-9])?[a-z]+[1-8]/i,
		rookre = /^R([a-z]|[0-9])?[a-z]+[1-8]/i,
		lCastlere = /^(0|O)-(0|O)-(0|O)/i,
		sCastlere = /^(0|O)-(0|O)/i,
		kingre = /^K[a-z]+[1-8]/i,
		prom = "",
		wCoords,
		bCoords,
		toCoords,
		fromCoords,
		coords,
		from,
		result,
		enPassante,
		sq,
		enP,
		myMove = null,
		pawnM = false;

	if (to === null) {
		return;
	}
	color = to[1];
	to = to[0];

	toCoords = this.getSquare(to);
	if (knightre.test(to)) {
		fromCoords = this.findFromKnight(this, to, toCoords, color);
		from = this.vBoard[fromCoords[0]][fromCoords[1]];
		to = this.vBoard[toCoords[0]][toCoords[1]];
	} else if (bishre.test(to)) {
		fromCoords = this.findFromBish(this, to, toCoords, color);
		from = this.vBoard[fromCoords[0]][fromCoords[1]];
		to = this.vBoard[toCoords[0]][toCoords[1]];
		this.updatePieceLocation(from, fromCoords, toCoords, "Bishop");
	} else if (queenre.test(to)) {
		fromCoords = this.findFromQueen(this, this.vBoard, to, toCoords, color);
		from = this.vBoard[fromCoords[0]][fromCoords[1]];
		to = this.vBoard[toCoords[0]][toCoords[1]];
		this.updatePieceLocation(from, fromCoords, toCoords, "Queen");
	} else if (rookre.test(to)) {
		fromCoords = this.findFromRook(this, this.vBoard, to, toCoords, color);
		from = this.vBoard[fromCoords[0]][fromCoords[1]];
		to = this.vBoard[toCoords[0]][toCoords[1]];
		this.updatePieceLocation(from, fromCoords, toCoords, "Rook");
	} else if (kingre.test(to)) {
		fromCoords = this.findFromKing(this, color);
		from = this.vBoard[fromCoords[0]][fromCoords[1]];
		to = this.vBoard[toCoords[0]][toCoords[1]];
		if ('white' === from.color) {
			this.wKingX = toCoords[0];
			this.wKingY = toCoords[1];
		} else {
			this.bKingX = toCoords[0];
			this.bKingY = toCoords[1];
		}
	} else if (sCastlere.test(to)) {
		bCoords = ['e8', 'g8', 'h8', 'f8'];
		wCoords = ['e1', 'g1', 'h1', 'f1'];

		if (lCastlere.test(to)) {
			bCoords = ['e8', 'c8', 'a8', 'd8'];
			wCoords = ['e1', 'c1', 'a1', 'd1'];
		}
		coords = color === 'white' ? wCoords : bCoords;

		fromCoords = this.getSquare(coords[0]);
		toCoords = this.getSquare(coords[1]);

		from = this.vBoard[fromCoords[0]][fromCoords[1]];
		to = this.vBoard[toCoords[0]][toCoords[1]];
		// update king location
		if ('king' === from.piece && 'white' === from.color) {
			this.wKingX = toCoords[0];
			this.wKingY = toCoords[1];
		} else if ('king' === from.piece && 'black' === from.color) {
			this.bKingX = toCoords[0];
			this.bKingY = toCoords[1];
		}
		result = this.movePiece(this, from, to, prom);

		myMove = new MyMove();
		myMove.moveStr = oldTo[0];
		myMove.oPiece = result[2].piece;
		myMove.oColor = result[2].color;
		myMove.pPiece = result[3];

		myMove.add(new MySquare(fromCoords[0], fromCoords[1],
			result[0].piece, result[0].color));

		myMove.add(new MySquare(toCoords[0], toCoords[1],
			result[1].piece, result[1].color));

		fromCoords = this.getSquare(coords[2]);
		toCoords = this.getSquare(coords[3]);
		from = this.vBoard[fromCoords[0]][fromCoords[1]];
		to = this.vBoard[toCoords[0]][toCoords[1]];
		this.updatePieceLocation(from, fromCoords, toCoords, "Rook");
	} else if (genericre.test(to)) {
		// dbl information move, g4-g6
		fromCoords = this.findFromAny(to, toCoords);
		from = this.vBoard[fromCoords[0]][fromCoords[1]];
		to = this.vBoard[toCoords[0]][toCoords[1]];
		this.updatePieceLocation(from, fromCoords, toCoords,
			from.piece.charAt(0).toUpperCase() + from.piece.slice(1));
	} else if (pawnre.test(to)) {
		// let see if it is a promotional move
		if (/^[a-z]+[1-8]=[A-Z]/.test(to)) {
			prom = to.charAt(to.indexOf('=') + 1);
		}
		fromCoords = this.findFromPawn(this.vBoard, to, toCoords, color);
		pawnM = true;
		from = this.vBoard[fromCoords[0]][fromCoords[1]];
		to = this.vBoard[toCoords[0]][toCoords[1]];
	} else {
		throw ("Can't figure out which piece to move '" + oldTo + "'");
	}
	this.cleanUpAfterCapture(to, toCoords);

	// in case of castling we don't have a null value
	if (!myMove) {
		myMove = new MyMove();
	}
	enPassante = null;
	if (pawnM) {
		enPassante = this.getEnPassante(this, fromCoords[0], fromCoords[1],
			toCoords[0], toCoords[1]);
	}
	if (enPassante) {
		sq = this.vBoard[enPassante[0]][enPassante[1]];
		enP = new MySquare(enPassante[0], enPassante[1], sq.piece, sq.color);
		myMove.enP = enP;
		this.vBoard[enPassante[0]][enPassante[1]].color = null;
		this.vBoard[enPassante[0]][enPassante[1]].piece = null;
		this.vBoard[enPassante[0]][enPassante[1]].type = null;
	}

	result = this.movePiece(this, from, to, prom);

	myMove.oPiece = result[2].piece;
	myMove.oColor = result[2].color;
	myMove.pPiece = result[3];
	myMove.moveStr = oldTo[0];

	if (prom) {
		if ("queen" === result[1].piece) {
			if ('white' === result[1].color) {
				this.wQueens[this.wQueens.length] = [toCoords[0], toCoords[1]];
			} else {
				this.bQueens[this.bQueens.length] = [toCoords[0], toCoords[1]];
			}
		} else if ("bishop" === result[1].piece) {
			if ('white' === result[1].color) {
				this.wBishops[this.wBishops.length] = [toCoords[0], toCoords[1]];
			} else {
				this.bBishops[this.bBishops.length] = [toCoords[0], toCoords[1]];
			}
		} else if ("rook" === result[1].piece) {
			if ('white' === result[1].color) {
				this.wRooks[this.wRooks.length] = [toCoords[0], toCoords[1]];
			} else {
				this.bRooks[this.bRooks.length] = [toCoords[0], toCoords[1]];
			}
		}
	}

	myMove.add(new MySquare(fromCoords[0], fromCoords[1], result[0].piece,
		result[0].color));

	myMove.add(new MySquare(toCoords[0], toCoords[1], result[1].piece,
		result[1].color));

	return myMove;
};
/**
 *	Update piece location Array
 */
Converter.prototype.updatePieceLocation = function (from, fromCoords,
	toCoords, piece) {
	"use strict";
	var idx,
		locationArray = from.color.substring(0, 1) + piece + "s";

	idx = this.findPieceIdx(this[locationArray], fromCoords);
	this[locationArray][idx][0] = toCoords[0];
	this[locationArray][idx][1] = toCoords[1];
};
/**
 *	Clean up after capturing a piece
 */
Converter.prototype.cleanUpAfterCapture = function (to, toCoords) {
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
};
	/* FINDING FROM LOCATION FUNCTIONS
		When a SAN (Standard Algebraic Notation) move is given
		we need to figure out from where the move is made. Lets
		say the SAN is "e4" - pawn moves to e4. The from location
		can be e2, e3 or e5. This depends on the color of the player
		and on where the pawn was located. All pieces have different
		logic on finding which piece exactly has to move to the location.
	*/
Converter.prototype.findPieceIdx = function (arr, coords) {
	"use strict";
	var i;

	for (i = 0; i < arr.length; i += 1) {
		if (arr[i][0] === coords[0] && arr[i][1] === coords[1]) {
			return i;
		}
	}
};
	/*
		Find the pawn from location.
	*/
Converter.prototype.findFromPawn = function (pos, to, tmp, color) {
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
};
	/*
		Find the bishop from location.
	*/
Converter.prototype.findFromBish = function (board, toSAN, toCoords, color) {
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
};
/*
   Find from any move
*/
Converter.prototype.findFromAny = function (toSAN, toCoords) {
	"use strict";
	if (toCoords[2][0] !== -1 && toCoords[2][1] !== -1) {
		return [toCoords[2][1], toCoords[2][0]];
	}

	throw ('No move found for the generic move ' + toSAN);
};
/* 
	Find the king from location.
*/
Converter.prototype.findFromKing = function (board, color) {
	"use strict";
	var x = board.wKingX,
		y = board.wKingY;

	if ("black" === color) {
		x = board.bKingX;
		y = board.bKingY;
	}
	return [x, y];
};
/* 
	Find the queen's from location.
*/
Converter.prototype.findFromQueen = function (board, pos, toSAN, to, color) {
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
						if (extra[0] !== queens[i][1] && extra[1] !== queens[i][0]) {
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
};
	/* 
		Find the rook's from location.
	*/
Converter.prototype.findFromRook = function (board, pos, toSAN, to, color) {
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
						if (extra[1] === rooks[i][0] && extra[0] === rooks[i][1]) {
							return [rooks[i][0], rooks[i][1]];
						}
					} else if (extra[0] !== -1 || extra[1] !== -1) {
						if (extra[1] !== rooks[i][0] && extra[0] !== rooks[i][1]) {
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
};
	/* 
		Find the knight's from location.
	*/
Converter.prototype.findFromKnight = function (brd, toSAN, to, color) {
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
	 *	TODO: Some tests leave king in check, needs to be examined further.
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
};

Converter.prototype.setMoveIncrement = function (delta) {
	"use strict";

	if (delta === 0) {
		return delta;
	}
	return delta / Math.abs(delta);
};
Converter.prototype.rookMove = function (dx, dy) {
	"use strict";
	return dx === 0 || dy === 0;
};
Converter.prototype.bishopMove = function (dx, dy) {
	"use strict";
	return dx === dy;
};
Converter.prototype.pathBlocked = function (path) {
	"use strict";
	return path && path.piece;
};

Converter.prototype.leavesOwnKingInCheck = function (brd, pos, from) {
	"use strict";

	var holdMe = pos[from[0]][from[1]],
		checked;

	pos[from[0]][from[1]] = new vSquare();

	checked = this.isKingChecked(brd, from.color, pos);
	pos[from[0]][from[1]] = holdMe;

	return checked;
};

Converter.prototype.matchOrigin = function (possible, given) {
	"use strict";
	return ((given[0] === -1 || possible[1] === given[0]) &&
				(given[1] === -1 || possible[0] === given[1]));
};

Converter.prototype.isMyKnight = function (virtualBoard, from, color) {
	"use strict";
	return (virtualBoard[from[0]][from[1]].piece === 'knight' &&
			 virtualBoard[from[0]][from[1]].color === color);
};

Converter.prototype.originGiven = function (to) {
	"use strict";
	return (to[2][0] !== -1 && to[2][1]  !== -1);
};

Converter.prototype.possibleKnightOrigins = function (destination) {
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
};
	/*
	 * Converts a SAN (Standard Algebraic Notation) into 
	 * board coordinates. The SAN is in the format of
	 * eg e4, dxe4, R2b7. When SAN contains extra information
	 * "taking move", "en passante", "check", "piece from a
	 * specific file or rank" it is also extracted.
	*/
Converter.prototype.getSquare = function (coord) {
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
	if (/^[A-Z]/.test(coord) || /^[nbrqk]{1,1}[abcdefgh]{1,1}/.test(coord)) {
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
};
/*
 *		TODO: revisit this function for correctness after system is under test
 */
Converter.prototype.getEnPassante = function (brd, x1, y1, x2, y2) {
	"use strict";

	var from = brd.vBoard[x1][y1],
		to = brd.vBoard[x2][y2];

	// pawn move
	if ("pawn" !== from.piece) {
		return null;
	}
	// taking move
	if ((y1 - y2) === 0) {
		return null;
	}
	// destination should be null
	if (null !== to.piece) {
		return null;
	}
	// the piece we are looking for
	return [x1, y2];
};
Converter.prototype.getOppColor = function (color) {
	"use strict";
	return "white" === color ? "black" : "white";
};
Converter.prototype.movePiece = function (board, from, to, prom) {
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
};
Converter.prototype.isKingChecked = function (brd, col) {
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
	if (this.checkFound(brd.vBoard, x, y, -1, -1, col, ["bishop", "queen"])) {
		return true;
	}
	if (this.checkFound(brd.vBoard, x, y, 1, 1, col, ["bishop", "queen"])) {
		return true;
	}
	if (this.checkFound(brd.vBoard, x, y, 1, -1, col, ["bishop", "queen"])) {
		return true;
	}
   if (this.checkFound(brd.vBoard, x, y, -1, 1, col, ["bishop", "queen"])) {
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
};

Converter.prototype.checkFound = function (board, rank, file, deltaRank,
								deltaFile, color, pieces) {
	"use strict";
	var opponent = this.getOppColor(color),
		i;

	try {
		for (i = 1; i < 8; i += 1) {
			theSquare = board[rank + (i * deltaRank)][file + (i * deltaFile)];
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
};
/**
 *	Gets the forsythe notation of a vBoard position.
 *
 *	TODO: Reconcile the inconsistent ways a vBoard is used in this code.
 */
Converter.prototype.getForsythe = function (theBoard) {
	"use strict";
	var position = "/",		// establish position as string
		empty,
		rank,
		file,
		p,
		piece;

	function addEmpties() {
		if (empty > 0) {
			position = position + empty;
			empty = 0;
		}
	}

	for (rank = 0; rank < 8; rank += 1) {
		empty = 0;
		for (file = 0; file < 8; file += 1) {
			p = theBoard[rank][file];	// FEN input board is opposite of vBoard
			piece = p.piece;
			if (p.piece) {
				addEmpties();
				if (p.color === 'black') {
					piece = p.piece.toLowerCase();
				} else {
					piece = p.piece.toUpperCase();
				}
				if (piece === 'KNIGHT' || piece === 'knight') {
					piece = piece.charAt(1);
				} else {
					piece = piece.charAt(0);
				}
				position = position + piece;
			} else {
				empty += 1;
			}
		}
		addEmpties();
		position = position + "/";
	}

	return position.slice(1, -1);	// Remove the first and last slash
};