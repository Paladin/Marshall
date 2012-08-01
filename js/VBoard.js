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
        var file = address.toLowerCase().charCodeAt(0) -
                "a".charCodeAt(0) + 1,
            rank = parseInt(address.charAt(1), 10);

        return this.limitAddress(rank) * 10 + this.limitAddress(file);
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
        return this.squares[this.algebraic2Index(square)];
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
    }
};