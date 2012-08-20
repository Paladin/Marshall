var MarshallPGN = MarshallPGN || {};
/**
 *  @classdesc  Piece represents individual chess pieces. It's a factory
 *      class, returning an object tailored for the specific piece requested.
 *
 * @constructor
 * @param   {string}    piece   Piece symbol
 *
 * @property    {string}    symbol  The symbol of the piece
 * @property    {string}    color   The color of the piece
 * @property    {array}     myMoves An Array of move calculators
 *
 * @version 0.7.1
 * @author Toomas R&#246;mer
 * @author Arlen P Walker
 * @copyright 2008 Toomas Römer
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
MarshallPGN.Piece = function (piece) {
    "use strict";
    this.symbol = piece;
    this.color = (/[a-z]/).test(piece) ? "black" : "white";
    switch (piece) {
    case "P":
    case "p":
        break;
    case "N":
    case "n":
        this.myMoves = [8, 19, 21, 12, -8, -19, -21, -12];
        this.isLegal = this.isLegalKnight;
        break;
    case "B":
    case "b":
        this.isLegal = this.isLegalBishop;
        break;
    case "R":
    case "r":
        this.isLegal = this.isLegalRook;
        break;
    case "Q":
    case "q":
        this.isLegal = this.isLegalQueen;
        break;
    case "K":
    case "k":
        this.myMoves = [9, 10, 11, -1, 1, -9, -10, -11];
        this.isLegal = this.isLegalKing;
        break;
    }
};
MarshallPGN.Piece.prototype = {
    symbol:     null,
    color:      null,
    /**
     *  Checks to see if it is legal for the piece to move to the destination
     *  square. This is an alias of the piece-specific isLegal
     *
     * @param   {object}    board       The virtual board the piece is on
     * @param   {integer}   origin      The index of the square it's on
     * @param   {integer}   destination The index of the destination square
     * @param   {boolean}   ignorePins  Ignore pins when checking move
     * @return  {boolean}   Was the move legal?
     *
     * @see     isLegalKnight
     * @see     isLegalBishop
     * @see     isLegalKing
     * @see     isLegalQueen
     * @see     isLegalRook
     */
    isLegal:    null,
    /**
     *  Checks to see if the king will be in check after the move
     *
     * @param   {object}    board       The virtual board the piece is on
     * @param   {integer}   origin      The index of the square it's on
     * @param   {integer}   destination The index it's going to
     */
    isPossible:   function (board, origin, destination) {
        "use strict";
        var originHold,
            destHold,
            possible;
        originHold = board.whatsOn(origin);
        destHold = board.whatsOn(destination);
        board.clear(origin);
        board.place(this.symbol, destination);
        possible = !board.isCheck(originHold.color);
        board.place(destHold.symbol, destination);
        board.place(this.symbol, origin);
        return possible;
    },
    /**
     *  Checks to see if it is legal for a knight to move to the destination
     *  square. This is aliased into isLegal() if the piece is a knight.
     *
     * @param   {object}    board       The virtual board the piece is on
     * @param   {integer}   origin      The index of the square it's on
     * @param   {integer}   destination The index of the destination square
     * @param   {boolean}   ignorePins  Ignore pins when checking move
     */
    isLegalKnight:  function (board, origin, destination, ignorePins) {
        "use strict";
        var i;
        if (!ignorePins &&
                !this.isPossible(board, origin, destination, ignorePins)) {
            return false;
        }
        for (i = 0; i < this.myMoves.length; i += 1) {
            if ((origin + this.myMoves[i]) === destination) {
                return true;
            }
        }
        return false;
    },
    /**
     *  Checks to see if it is legal for a King to move to the destination
     *  square. This is aliased into isLegal() if the piece is a king.
     *
     * @param   {object}    board       The virtual board the piece is on
     * @param   {integer}   origin      The index of the square it's on
     * @param   {integer}   destination The index of the destination square
     */
    isLegalKing:    function (board, origin, destination) {
        "use strict";
        var i;
        if (!this.isPossible(board, origin, destination, false)) {
            return false;
        }
        for (i = 0; i < this.myMoves.length; i += 1) {
            if ((origin + this.myMoves[i]) === destination) {
                return true;
            }
        }
        return false;
    },
    /**
     *  Checks to see if it is legal for a Bishop to move to the destination
     *  square. This is aliased into isLegal() if the piece is a bishop.
     *
     * @param   {object}    board       The virtual board the piece is on
     * @param   {integer}   origin      The index of the square it's on
     * @param   {integer}   destination The index of the destination square
     */
    isLegalBishop:    function (board, origin, destination, ignorePins) {
        "use strict";
        if (!ignorePins &&
                !this.isPossible(board, origin, destination, ignorePins)) {
            return false;
        }
        if (board.isSameDiagonal(origin, destination)) {
            if (board.isLineClear(origin, destination, this.color)) {
                return true;
            }
        }
        return false;
    },
    /**
     *  Checks to see if it is legal for a Rook to move to the destination
     *  square. This is aliased into isLegal() if the piece is a rook.
     *
     * @param   {object}    board       The virtual board the piece is on
     * @param   {integer}   origin      The index of the square it's on
     * @param   {integer}   destination The index of the destination square
     */
    isLegalRook:    function (board, origin, destination, ignorePins) {
        "use strict";
        if (!ignorePins && !this.isPossible(board, origin, destination)) {
            return false;
        }
        if (board.isSameRank(origin, destination) ||
                board.isSameFile(origin, destination)) {
            if (board.isLineClear(origin, destination, this.color)) {
                return true;
            }
        }
        return false;
    },
    /**
     *  Checks to see if it is legal for a Queen to move to the destination
     *  square. This is aliased into isLegal() if the piece is a queen.
     *
     * @param   {object}    board       The virtual board the piece is on
     * @param   {integer}   origin      The index of the square it's on
     * @param   {integer}   destination The index of the destination square
     */
    isLegalQueen:    function (board, origin, destination, ignorePins) {
        "use strict";
        return this.isLegalBishop(board, origin, destination, ignorePins) ||
            this.isLegalRook(board, origin, destination, ignorePins);
    }
};
