/**
 * VBoard
 *
 * A Virtual Chessboard.
 *
 * @constructor
 *
 * @property {array}	squares		    - The squares, with a border
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
    squares:        new Array(100), //one square border simplifies the math
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

        return this.addressLimit(rank) * 10 + this.addressLimit(file);
    },
    /**
     * Limits a square address to the board, or returns zero.
     *
     * @param   {integer}    - The address
     *
     * @return  {integer}   - The rank or file address. 0 if illegal
     */
    addressLimit:   function (address) {
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
            FENIndex;

        this.squares = new Array(100);
        FEN = (position || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR").
                split("/").reverse();
        for (rank = 1; rank <= FEN.length; rank += 1) {
            file = 1;
            for (FENIndex = 0; FENIndex < FEN[rank - 1].length; FENIndex += 1) {
                skip = parseInt(FEN[rank - 1].charAt(FENIndex), 10);
                if (skip) {
                    file += skip;
                } else {
                    this.squares[rank * 10 + file] = FEN[rank - 1].
                            charAt(FENIndex);
                }
                file += 1;
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
    }
};