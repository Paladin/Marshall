/**
 * VBoard
 *
 * A Virtual Chessboard.
 *
 * @constructor
 *
 * @property {array}	squares		    - The squares, with a border
 * @property {boolean}  whiteToMove     - Is white to move
 * @property {boolean}	whiteCastles00  - Can White castle 0-0
 * @property {boolean}	whiteCastles000 - Can White castle 0-0-0
 * @property {boolean}	blackCastles00  - Can Black castle 0-0
 * @property {boolean}	blackCastles000 - Can Black castle 0-0-0
 * @property {string}	epTarget        - Target square for en passant
 * @property {integer}	halfMoveClock   - Plies since capture or pawn move
 * @property {integer}	currentMove     - Current move number
 *
 * @version 0.7.1
 * @author Arlen P Walker
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
 **/
var VBoard = function (start) {
    "use strict";
    this.set(start);
};

VBoard.prototype = {
    squares:            new Array(100), //one square border simplifies the math
    whiteToMove:        true,
    whiteCasltes00:     true,
    whiteCastles000:    true,
    blackCastles00:     true,
    blackCastles000:    true,
    epTarget:           "",
    halfMoveClock:      0,
    currentMove:        1,
    /**
     * Translates a "normal" algebraic square address to an array index
     *
     * @param   {string}    - The address to translate ("a2", "g7", etc.)
     *
     * @return  {integer}   - The index into the array. 0 if illegal
     */
    algebraic2Index:    function (address) {
        "use strict";
        var file = this.limitAddress(address.toLowerCase().charCodeAt(0) -
                "a".charCodeAt(0) + 1),
            rank = this.limitAddress(parseInt(address.charAt(1), 10));

        if (file === 0 || rank === 0) { return 0; }

        return rank * 10 + file;
    },
    /**
     * Translates an array index to a "normal" algebraic square address
     *
     * @param   {integer}   - The index to translate (34, 27, etc.)
     *
     * @return  {string}   - The square name ("" if illegal)
     */
    index2Algebraic:    function (index) {
        "use strict";
        var rank = Math.floor(index / 10),
            file = String.fromCharCode((index % 10) + "a".charCodeAt(0) - 1);

        if (rank < 1 || rank > 8 || file < "a" || file > "h") { return ""; }

        return file + rank;
    },
    /**
     * Limits a square address to the board, or returns zero.
     *
     * @param   {integer}    - The address
     *
     * @return  {integer}   - The rank or file address. 0 if illegal
     */
    limitAddress:   function (address) {
        "use strict";
        return address < 1 || address > 8 ? 0 : address;
    },
    /**
     * Sets up a position on the board.
     *
     * @param   {string}    - The position
     */
    set:   function (position) {
        "use strict";
        var rank,
            file,
            skip,
            FEN,
            flags,
            flagstart,
            FENIndex;

        this.squares = new Array(100);
        FEN = (position ||
                "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1").
                split("/").reverse();
        flagstart = FEN[0].indexOf(" ");
        if (flagstart > 0) {
            flags = FEN[0].substring(flagstart).split(" ");

            this.whiteToMove = flags[1].toLowerCase().indexOf("w") >= 0;

            this.whiteCastles00 = flags[2].indexOf("K") >= 0;
            this.whiteCastles000 = flags[2].indexOf("Q") >= 0;
            this.blackCastles00 = flags[2].indexOf("k") >= 0;
            this.blackCastles000 = flags[2].indexOf("q") >= 0;

            this.epTarget = flags[3] === "-" ? "" : flags[3];
            this.halfMoveClock = parseInt(flags[4], 10);
            this.currentMove = parseInt(flags[5], 10);

            FEN[0] = FEN[0].substring(0, flagstart).trim();
        }
        for (rank = 1; rank <= FEN.length; rank += 1) {
            file = 1;
            for (FENIndex = 0; FENIndex < FEN[rank - 1].length; FENIndex += 1) {
                skip = parseInt(FEN[rank - 1].charAt(FENIndex), 10);
                if (skip) {
                    file += skip;
                } else {
                    this.squares[rank * 10 + file] = FEN[rank - 1].
                            charAt(FENIndex);
                    file += 1;
                }
            }
        }
    },
    /**
     * Tells you what's on a given square.
     *
     * @param   {string}    - The square
     */
    whatsOn:   function (square) {
        "use strict";
        var types = {
            "e":  {"piece": "empty", "color": "", "symbol": ""},
            "p":  {"piece": "pawn", "color": "black", "symbol": "p"},
            "n":  {"piece": "knight", "color": "black", "symbol": "n"},
            "b":  {"piece": "bishop", "color": "black", "symbol": "b"},
            "r":  {"piece": "rook", "color": "black", "symbol": "r"},
            "q":  {"piece": "queen", "color": "black", "symbol": "q"},
            "k":  {"piece": "king", "color": "black", "symbol": "k"},
            "P":  {"piece": "pawn", "color": "white", "symbol": "P"},
            "N":  {"piece": "knight", "color": "white", "symbol": "N"},
            "B":  {"piece": "bishop", "color": "white", "symbol": "B"},
            "R":  {"piece": "rook", "color": "white", "symbol": "R"},
            "Q":  {"piece": "queen", "color": "white", "symbol": "Q"},
            "K":  {"piece": "king", "color": "white", "symbol": "K"}
        },
            code;

        code = this.squares[this.algebraic2Index(square)] || "e";
        return types[code];
    },
    /**
     * Places a piece on a given square
     *
     * @param   {string}    - The piece
     * @param   {string}    - Where to put it (algebraic notation)
     */
    place:      function (piece, where) {
        "use strict";
        var square = this.algebraic2Index(where);

        if (square > 0) { this.squares[square] = piece; }

        return;
    },
    /**
     * Clears a given square
     *
     * @param   {string}    - Which square (algebraic notation)
     */
    clear:      function (where) {
        "use strict";
        var square = this.algebraic2Index(where);

        this.squares[square] = null;

        return;
    },
    /**
     * Returns the the FEN of the current position
     */
    getFEN:     function () {
        "use strict";
        var FEN = "",
            castles = "",
            empty,
            rank,
            file;

        function addEmpties() {
            if (empty > 0) {
                FEN = FEN + empty;
                empty = 0;
            }
        }

        for (rank = 80; rank > 9; rank -= 10) {
            empty = 0;
            for (file = 1; file < 9; file += 1) {
                if (this.squares[rank + file]) {
                    addEmpties();
                    FEN = FEN + this.squares[rank + file];
                } else {
                    empty += 1;
                }
            }
            addEmpties();
            if (rank !== 10) { FEN += "/"; }
        }

        FEN += this.whiteToMove ? " w" : " b";

        castles += this.whiteCastles00 ? "K" : "";
        castles += this.whiteCastles000 ? "Q" : "";
        castles += this.blackCastles00 ? "k" : "";
        castles += this.blackCastles000 ? "q" : "";
        FEN += castles.length > 0 ? " " + castles : " -";

        FEN += this.epTarget.length > 0 ? " " + this.epTarget : " -";
        FEN += " " + this.halfMoveClock;
        FEN += " " + this.currentMove;

        return FEN;
    },
    /**
     * Locates all squares with a given piece
     *
     * @param   {string}    - The piece
     */
    whereIs:      function (piece) {
        "use strict";
        var squares = [],
            index;

        for (index = 11; index < 89; index += 1) {
            if (index % 10 > 0 && index % 10 < 9) {
                if (this.squares[index] === piece) {
                    squares.push(this.index2Algebraic(index));
                }
            }
        }

        return squares;
    },
    /**
     * Checks to see if the square is occupied.
     *
     * @param   {string}    - The square to check
     */
    isOccupied:     function (square) {
        "use strict";

        if (this.squares[this.algebraic2Index(square)]) { return true; }

        return false;
    },
    /**
     * Checks to see which color is occupying the square
     *
     * @param   {string}    - The square to check
     */
    isOccupiedBy:    function (square) {
        "use strict";

        if (!this.squares[this.algebraic2Index(square)]) { return ""; }

        return this.squares[this.algebraic2Index(square)] > "Z" ?
                "black" : "white";
    },
    ensureIndex:    function (square) {
        "use strict";
        var index;

        if (square.length === undefined) {
            index = square;
        } else {
            index = this.algebraic2Index(square);
        }
        return index;
    },
    isSameRank:     function (theOrigin, theDestination) {
        "use strict";
        var origin = this.ensureIndex(theOrigin),
            destination = this.ensureIndex(theDestination);

        if (Math.floor(origin / 10) === Math.floor(destination / 10)) {
            return true;
        }
        return false;
    },
    isSameFile:     function (theOrigin, theDestination) {
        "use strict";
        var origin = this.ensureIndex(theOrigin),
            destination = this.ensureIndex(theDestination);

        if (origin % 10 === destination % 10) {
            return true;
        }
        return false;
    },
    isSameDiagonal:     function (theOrigin, theDestination) {
        "use strict";
        var origin = this.ensureIndex(theOrigin),
            destination = this.ensureIndex(theDestination);

        if ((origin - destination) % 9 === 0 ||
                (origin - destination) % 11 === 0) {
            return true;
        }
        return false;
    },
    /**
     * Checks to see if a given square (algebraic or index) is legitimate.
     */
    exists:         function (square) {
        "use strict";
        var index;

        if (square.length === undefined) {
            index = square;
        } else {
            index = this.algebraic2Index(square);
        }

        if (index < 11 || index > 88 || index % 10 === 0 || index % 10 === 9) {
            return false;
        }
        return true;
    },
    /**
     * Get the current move number
     *
     *  @return {integer}   the current move number value
     */
    getMoveNumber:      function () {
        "use strict";
        return this.currentMove;
    },
    /**
     * @return  {string}    the letter of the file for the square.
     */
    file:               function (square) {
        "use strict";
        var index = parseInt(square, 10);
        if (!index) { index = this.algebraic2Index(square); }
        return String.fromCharCode((index % 10) + "a".charCodeAt(0) - 1);
    },
    /**
     * Is the square a possible en passant square?
     *
     *  @param  {var}       square
     *  @return {boolean}   is it a legal 3rd or 6th rank square?
     */
    possibleEPTarget:   function (square) {
        "use strict";
        var index = parseInt(square, 10);

        if (!index) { index = this.algebraic2Index(square); }

        if ((Math.floor(index / 10) === 3 || Math.floor(index / 10) === 6) &&
                this.exists(index)) {
            return true;
        }
        return false;
    },
    findFromPawn:   function (destination, from, capture, color) {
        "use strict";
        var index,
            direction = color === "white" ? 1 : -1;

        if (from && from.length === 2) { return from; }

        index = this.algebraic2Index(destination);

        if (capture) {
            if (this.file(this.index2Algebraic(index - 9 * direction)) ===
                    from) {
                from = this.index2Algebraic(index - 9 * direction);
            } else {
                from = this.index2Algebraic(index - 11 * direction);
            }
        } else {
            if (this.isOccupied(this.index2Algebraic(
                    this.algebraic2Index(destination) - 10 * direction
                ))) {
                from = this.index2Algebraic(this.algebraic2Index(destination) -
                    10 * direction);
            } else {
                from = this.index2Algebraic(this.algebraic2Index(destination) -
                    20 * direction);
            }
        }
        return from;
    },
    findFromKnight:     function (destination, from, color) {
        "use strict";
        var possibles = [],
            index,
            i,
            rank = null,
            file = null,
            mySymbol = color === "white" ? "N" : "n",
            myHome,
            moves = [8, 19, 21, 12, -8, -19, -21, -12];

        if (from && from.length === 2) { return from; }
        if (from) {
            if (from > "Z") {
                file = from;
            } else {
                rank = from;
            }
        }
        possibles = this.whereIs(mySymbol);
        index = this.algebraic2Index(destination);

        for (i = 0; i < 8; i += 1) {
            myHome = this.index2Algebraic(index + moves[i]);
            if (possibles.indexOf(myHome) !== -1) {
                if (rank === null && file === null) { return myHome; }
                if (rank && rank === myHome.charAt(1)) { return myHome; }
                if (file && file === myHome.charAt(0)) {return myHome; }
            }
        }
        return "";
    },
    findFromBishop:     function (destination, from, color) {
        "use strict";
        var possibles = [],
            index,
            i,
            j,
            rank = null,
            file = null,
            mySymbol = color === "white" ? "B" : "b",
            myMoves = [9, 11, -9, -11],
            moves = [];

        if (from && from.length === 2) { return from; }
        if (from) {
            if (from > "Z") {
                file = from;
            } else {
                rank = from;
            }
        }

        index = this.algebraic2Index(destination);
        for (j = 0; j < 4; j += 1) {
            i = index + myMoves[j];
            while (this.exists(i) &&
                    !this.isOccupied(this.index2Algebraic(i))) {
                moves.push(this.index2Algebraic(i));
                i += myMoves[j];
            }
            if (this.whatsOn(this.index2Algebraic(i)).symbol === mySymbol) {
                moves.push(this.index2Algebraic(i));
            }
        }

        possibles = this.whereIs(mySymbol);
        for (i = 0; i < moves.length; i += 1) {
            if (possibles.indexOf(moves[i]) !== -1) {
                if (rank === null && file === null) { return moves[i]; }
                if (rank && rank === moves[i].charAt(1)) { return moves[i]; }
                if (file && file === moves[i].charAt(0)) {return moves[i]; }
            }
        }
        return "";
    },
    findFromRook:     function (destination, from, color) {
        "use strict";
        var possibles = [],
            index,
            i,
            j,
            rank = null,
            file = null,
            mySymbol = color === "white" ? "R" : "r",
            myMoves = [-1, 1, 10, -10],
            moves = [];

        if (from && from.length === 2) { return from; }
        if (from) {
            if (from > "Z") {
                file = from;
            } else {
                rank = from;
            }
        }

        index = this.algebraic2Index(destination);
        for (j = 0; j < 4; j += 1) {
            i = index + myMoves[j];
            while (this.exists(i) &&
                    !this.isOccupied(this.index2Algebraic(i))) {
                moves.push(this.index2Algebraic(i));
                i += myMoves[j];
            }
            if (this.whatsOn(this.index2Algebraic(i)).symbol === mySymbol) {
                moves.push(this.index2Algebraic(i));
            }
        }

        possibles = this.whereIs(mySymbol);
        for (i = 0; i < moves.length; i += 1) {
            if (possibles.indexOf(moves[i]) !== -1) {
                if (rank === null && file === null) { return moves[i]; }
                if (rank && rank === moves[i].charAt(1)) { return moves[i]; }
                if (file && file === moves[i].charAt(0)) {return moves[i]; }
            }
        }
        return "";
    },
    findFromQueen:     function (destination, from, color) {
        "use strict";
        var possibles = [],
            index,
            i,
            j,
            rank = null,
            file = null,
            mySymbol = color === "white" ? "Q" : "q",
            myMoves = [-1, 1, 9, 10, 11, -9, -10, -11],
            moves = [];

        if (from && from.length === 2) { return from; }
        if (from) {
            if (from > "Z") {
                file = from;
            } else {
                rank = from;
            }
        }

        index = this.algebraic2Index(destination);
        for (j = 0; j < 8; j += 1) {
            i = index + myMoves[j];
            while (this.exists(i) &&
                    !this.isOccupied(this.index2Algebraic(i))) {
                moves.push(this.index2Algebraic(i));
                i += myMoves[j];
            }
            if (this.whatsOn(this.index2Algebraic(i)).symbol === mySymbol) {
                moves.push(this.index2Algebraic(i));
            }
        }

        possibles = this.whereIs(mySymbol);
        for (i = 0; i < moves.length; i += 1) {
            if (possibles.indexOf(moves[i]) !== -1) {
                if (rank === null && file === null) { return moves[i]; }
                if (rank && rank === moves[i].charAt(1)) { return moves[i]; }
                if (file && file === moves[i].charAt(0)) {return moves[i]; }
            }
        }
        return "";
    }
};