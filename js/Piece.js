/**
 *  @classdesc  Piece represents individual chess pieces. It's a factory
 *      class, returning an object tailored for the specific piece requested.
 *
 * @param   {string}    piece   Piece symbol
 */
var Piece = function (piece) {
    this.symbol = piece;
    this.color = (/[a-z]/).test(piece) ? "black" : "white";
    switch (piece) {
    case "P":
    case "p":
        break;
    case "N":
    case "n":
        this.myMoves = [8, 19, 21, 12, -8, -19, -21, -12],
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
        this.myMoves = [9, 10, 11, -1, 1, -9. -10, -11],
        this.isLegal = this.isLegalKing;
        break;
    }
}
Piece.prototype = {
    symbol:     null,
    color:      null,
    /**
     *  Checks to see if the piece is pinned
     *
     * @param   {object}    board   The virtual board the piece is on
     * @param   {integer}   origin  The index of the square it's on
     */
    isPossible:   function (board, origin, destination) {
        var holding,
            possible;
        holding = board.whatsOn(origin);
        board.clear(origin);
        possible = !board.isCheck(holding.color);
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
        var i;
        if (!ignorePins && !this.isPossible(board, origin, destination, ignorePins)) { return false; }
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
        var i;
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
        if (!ignorePins && !this.isPossible(board, origin, destination, ignorePins)) { return false; }
        if (board.isSameDiagonal(origin, destination)) {
            if(board.isLineClear(origin, destination, this.color)) {
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
        if (!ignorePins && !this.isPossible(board, origin, destination)) { return false; }
        if (board.isSameRank(origin, destination) ||
                board.isSameFile(origin, destination)) {
            if(board.isLineClear(origin, destination, this.color)) {
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
        return this.isLegalBishop(board, origin, destination, ignorePins) ||
            this.isLegalRook(board, origin, destination, ignorePins);
    }
}