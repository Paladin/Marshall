/**
 * @classdesc   A Virtual Chessboard. Used internally to represent a position,
 *  and to answer questions about it.
 *
 * @version 0.7.1
 * @author Arlen P Walker
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
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
 **/
var MarshallPGN = MarshallPGN || {};
MarshallPGN.VBoard = function (start) {
    "use strict";
    this.set(start);
};
MarshallPGN.VBoard.prototype = {
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

        code = this.squares[this.ensureIndex(square)] || "e";
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
        var square = this.ensureIndex(where);

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
        var square = this.ensureIndex(where);

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

        if (this.squares[this.ensureIndex(square)]) { return true; }

        return false;
    },
    /**
     * Checks to see which color is occupying the square
     *
     * @param   {string}    - The square to check
     */
    isOccupiedBy:    function (square) {
        "use strict";

        if (!this.squares[this.ensureIndex(square)]) { return ""; }

        return this.squares[this.ensureIndex(square)] > "Z" ?
                "black" : "white";
    },
    /**
     *  Ensures the number passed through will be an integer array index.
     *
     * @param   {variable}  square  Could be algebraic reference or index
     * @return  {integer}
     */
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
    /**
     *  Compares the rank of two given squares
     *
     * @param   {variable}  theOrigin       One square
     * @param   {variable}  theDestination  The other square
     * @return  {boolean}   True if the squares are on the same rank
     */
    isSameRank:     function (theOrigin, theDestination) {
        "use strict";
        var origin = this.ensureIndex(theOrigin),
            destination = this.ensureIndex(theDestination);

        if (Math.floor(origin / 10) === Math.floor(destination / 10)) {
            return true;
        }
        return false;
    },
    /**
     *  Compares the file of two given squares
     *
     * @param   {variable}  theOrigin       One square
     * @param   {variable}  theDestination  The other square
     * @return  {boolean}   True if the squares are on the same file
     */
    isSameFile:     function (theOrigin, theDestination) {
        "use strict";
        var origin = this.ensureIndex(theOrigin),
            destination = this.ensureIndex(theDestination);

        if (origin % 10 === destination % 10) {
            return true;
        }
        return false;
    },
    /**
     *  Checks to see if two squares are on the same diagonal
     *
     * @param   {variable}  theOrigin       One square
     * @param   {variable}  theDestination  The other square
     * @return  {boolean}   True if the squares are on the same diagonal
     */
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
     *
     * @param   {variable}  square  The square
     * @return  {boolean}   Does the square exist on the chessboard?
     */
    exists:         function (square) {
        "use strict";
        var index = this.ensureIndex(square);

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
     *  Gets the file letter of a square
     *
     * @param   {variable}  the address of the square, algebraic or array index
     * @return  {string}    the letter of the file for the square.
     */
    file:               function (square) {
        "use strict";
        var index = this.ensureIndex(square);
        return String.fromCharCode((index % 10) + "a".charCodeAt(0) - 1);
    },
    /**
     *  Gets the numeric rank of a square
     *
     * @param   {integer}   The index of the square
     * @return  {string}    the number of the rank for the square.
     */
    rank:               function (square) {
        "use strict";
        return Math.floor(this.ensureIndex(square) / 10);
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
    findFromPawn:   function (destination, from, color, capture) {
        "use strict";
        var index,
            direction = color === "white" ? 1 : -1,
            possibles = [],
            i,
            fromFile,
            mySymbol = color === "white" ? "P" : "p",
            left,
            right,
            bonus = color === "white" ? 2 : 7;

        if (from && from.length === 2) { return from; }
        fromFile = from.match(/^[a-h]/) ? from.match(/^[a-h]/)[0] : "";
        index = this.ensureIndex(destination);
        possibles = this.whereIs(mySymbol);

        if (capture) {
            left = this.index2Algebraic(index - (direction * 9));
            right = this.index2Algebraic(index - (direction * 11));
            if (this.file(left) === fromFile) { return left; }
            if (this.file(right) === fromFile) { return right; }
        } else {
            for (i = 0; i < possibles.length; i += 1) {
                if (this.file(possibles[i]) === this.file(destination)) {
                    if (this.rank(possibles[i]) + direction ===
                            this.rank(destination)) {
                        return possibles[i];
                    }
                    if (this.rank(possibles[i]) === bonus &&
                            this.rank(possibles[i]) + direction * 2 ===
                            this.rank(destination)) {
                        return possibles[i];
                    }
                }
            }
        }
        return from;
    },
    /**
     *  Disambiguates a piece move when there are more than one possibility
     *
     * @param   {string}    from    The "from" text, may be partial square ref
     * @param   {array}     moves   The possible sources for the moving piece
     * @return  {string}    the algebraic reference to the source square
     */
    whichPiece:          function (from, moves) {
        "use strict";
        var i,
            rank = null,
            file = null;

        if (from) {
            if (from > "Z") {
                file = from;
            } else {
                rank = from;
            }
        }
        for (i = 0; i < moves.length; i += 1) {
            if (rank && rank === moves[i].charAt(1)) { return moves[i]; }
            if (file && file === moves[i].charAt(0)) { return moves[i]; }
        }
        return "";
    },
    /**
     *  Finds the piece that is moving to a given square, will use the extra
     *  characters in the move text to disambiguate.
     *
     * @param   {string}    thePiece    A single-letter piece identifier
     * @param   {string}    destination The algebraic square ref to move to
     * @param   {string}    from        What's known about the source
     * @param   {string}    color       The color moving
     * @return  {string}    The algebraic square reference to move from
     */
    findFromPiece:     function (thePiece, destination, from, color) {
        "use strict";
        var i,
            mySymbol = color ===
                "white" ? thePiece.toUpperCase() : thePiece.toLowerCase(),
            possibles = [],
            possibleFroms = [],
            piece = new MarshallPGN.Piece(mySymbol);

        if (from && from.length === 2) { return from; }
        possibleFroms = this.whereIs(mySymbol);
        for (i = 0; i < possibleFroms.length; i += 1) {
            if (piece.isLegal(this, this.ensureIndex(possibleFroms[i]),
                    this.ensureIndex(destination))) {
                possibles.push(possibleFroms[i]);
            }
        }
        if (possibles.length === 1) { return possibles[0]; }
        return this.whichPiece(from, possibles);
    },
    /**
     *  Am I in check?
     *
     *  @param  {string}    color   Look for check on this king
     *
     *  @return {boolean}   Well, is it in check?
     */
    isCheck:        function (myColor) {
        "use strict";
        var me,
            enemyColor,
            enemyKing,
            enemyQueen,
            enemyRook,
            enemyBishop,
            enemyKnight;

        if (myColor === "black") {
            me = this.whereIs("k")[0];
            enemyColor = "white";
        } else {
            me = this.whereIs("K")[0];
            enemyColor = "black";
        }
        enemyKing = enemyColor === "white" ? "K" : "k";
        enemyQueen = enemyColor === "white" ? "Q" : "q";
        enemyRook = enemyColor === "white" ? "R" : "r";
        enemyBishop = enemyColor === "white" ? "B" : "b";
        enemyKnight = enemyColor === "white" ? "N" : "n";

        if (this.findFromPawn(me, "", enemyColor, true)) { return true; }
        if (this.pieceCheck(enemyKing, me)) { return true; }
        if (this.pieceCheck(enemyKnight, me)) { return true; }
        if (this.pieceCheck(enemyBishop, me)) { return true; }
        if (this.pieceCheck(enemyRook, me)) { return true; }
        if (this.pieceCheck(enemyQueen, me)) { return true; }
        return false;
    },
    /**
     *  Checks all of a piece type to see if any are giving check
     *
     * @param   {string}    symbol  The symbol of the piece
     * @param   {string}    myKing  Algebraic square address for the king
     * @return  {boolean}   True if the king is in check by one of those pieces
     */
    pieceCheck:     function (symbol, myKing) {
        "use strict";
        var piece = new MarshallPGN.Piece(symbol),
            enemies = this.whereIs(symbol),
            i;

        for (i = 0; i < enemies.length; i += 1) {
            if (piece.isLegal(this, this.ensureIndex(enemies[i]),
                    this.ensureIndex(myKing), true)) { return true; }
        }
        return false;
    },
    /**
     *  Is the line clear from source to destination? (a piece of the enemy's
     *  color may be on the destination square, all intermediate squares must
     *  be clear.
     *
     * @param   {variable}  source      The starting square
     * @param   {variable}  destination The ending square
     * @param   {string}    color       My color
     */
    isLineClear:        function (source, destination, color) {
        "use strict";
        var srcIndex = this.ensureIndex(source),
            destIndex = this.ensureIndex(destination);

        if (this.isOccupiedBy(destIndex) === color) { return false; }
        if (this.rank(srcIndex) === this.rank(destIndex)) {
            return this.checkLine(source, destination, 1);
        }
        if (this.file(srcIndex) === this.file(destIndex)) {
            return this.checkLine(source, destination, 10);
        }
        if ((srcIndex - destIndex) % 9 === 0) {
            return this.checkLine(source, destination, 9);
        }
        if ((srcIndex - destIndex) % 11 === 0) {
            return this.checkLine(source, destination, 11);
        }
        return false;
    },
    /**
     *  Checks to see if a progression of squares is clear
     *
     * @param   {variable}  source      The lower square index
     * @param   {variable}  destination The higher square index
     * @param   {integer}   increment   The increment to the next square
     *
     * @return  {boolean}   Are they all clear?
     */
    checkLine:          function (source, destination, increment) {
        "use strict";
        var srcIndex = this.ensureIndex(source),
            destIndex = this.ensureIndex(destination),
            square,
            lower = srcIndex < destIndex ? srcIndex : destIndex,
            higher = srcIndex === lower ? destIndex : srcIndex;

        for (square = lower + increment; square < higher; square +=
                increment) {
            if (this.isOccupied(square)) { return false; }
        }
        return true;
    }
};
