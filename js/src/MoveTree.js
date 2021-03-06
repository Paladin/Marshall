var MarshallPGN = MarshallPGN || {};
/**
 * MoveTree
 *
 * The basis for the moves in the system. It's a doubly-linked list with
 *  provisions for being doubly-linked into a second list. Each node contains
 * the information necessary to make moves or transition between variations.
 * It gets built and added to until everything is present.
 *
 * @constructor
 * @param   {array} properties  An array of properties to initialize
 *
 * @property {object}       previous        The previous move in the tree
 * @property {object}       next            The next move in the tree
 * @property {object}       up              The base move of the variation
 * @property {object}       down            The start of the next variation
 * @property {string}       text            The move text
 * @property {array}        commentary      Comments to the position
 * @property {integer}      number          The move number
 * @property {object}       piece           The piece being moved
 * @property {object}       result          If game ends on this move
 * @property {string}       color           Color of the move
 * @property {string}       destination     Square moved to
 * @property {string}       origin          Square moved from
 * @property {HTMLElement}  link            Link added to DOM
 * @property {integer}      levelsToParent  Levels beneath parent variation
 *
 * @version 1.0.0
 * @author Arlen P Walker
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
**/
MarshallPGN.MoveTree = function (properties) {
    "use strict";
    var property;

    for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            this[property] = properties[property];
        }
    }
    this.commentary = [];
};
MarshallPGN.MoveTree.prototype = {
    previous:       null,
    next:           null,
    up:             null,
    down:           null,
    text:           null,
    commentary:     null,
    number:         null,
    piece:          null,
    result:         null,
    color:          null,
    destination:    null,
    origin:         null,
    levelsToParent: null,
    link:           null,
    /**
     * Gets the next move in the current line. If none, returns itself.
     *
     * @return  {Object}    the next move
     */
    getNextMove:    function () {
        "use strict";
        return this.next || this;
    },
    /**
     * Gets the previous move in the current line. If none, returns itself.
     *
     * @return  {Object}    the previous move
     */
    getPreviousMove:    function () {
        "use strict";
        return this.previous || this;
    },
    /**
     * Tests for the end of the line
     *
     * @return  {boolean}    Are we at the end of the line?
     */
    isEnd:          function () {
        "use strict";
        return this.next === null;
    },
    /**
     * Tests for an empty move (defined as no number, text, or result).
     *
     * @return  {boolean}    Is it empty?
     */
    isEmpty:        function () {
        "use strict";
        return !(this.number || this.text || this.result);
    },
    /**
     * Goes to first move of the current line
     *
     * @return  {Object}    the first move
     */
    goStart:         function () {
        "use strict";
        var move = this;

        while (move.previous !== null) {
            move = move.previous;
        }
        return move;
    },
    /**
     * Goes to the end of the current line
     *
     * @return  {Object}    The last move
     */
    goEnd:         function () {
        "use strict";
        var move = this;

        while (move.next !== null) {
            move = move.next;
        }
        return move;
    },
    /**
     * Goes to the top of the variation stack
     *
     * @return  {Object}    the move from the highest variation
     */
    goTop:          function () {
        "use strict";
        var move = this;

        while (move.up !== null) {
            move = move.up;
        }
        return move;
    },
    /**
     * Goes to the bottom of the variation stack
     *
     * @return  {Object}    The move from the lowest variation
     */
    goBottom:       function () {
        "use strict";
        var move = this;

        while (move.down !== null) {
            move = move.down;
        }
        return move;
    },
    /**
     * A text list of the current line
     *
     * @return  {string}    text of the moves in the line
     */
    list:           function () {
        "use strict";
        var move = this,
            text;

        text = this.number ? this.number + ". " : "";
        text += (this.color === "black" ? "... " : "") + this.text;

        while (move.next !== null) {
            move = move.next;
            text += " " + move;
        }
        return text;
    },
    /**
     * Adds an empty move after the current one. This will destroy an existing
     * link.
     *
     * @return  {Object}    The newly created move
     */
    addNext:        function (properties) {
        "use strict";
        var move = new MarshallPGN.MoveTree(properties);
        this.next = move;
        move.previous = this;
        return move;
    },
    /**
     * Adds a new variation at the bottom of the variation stack
     *
     * @return  {Object}    the newly created move
     */
    addVariation:        function (properties) {
        "use strict";
        var move = new MarshallPGN.MoveTree(properties),
            addedTo = this.goBottom();
        addedTo.down = move;
        move.up = addedTo;
        return move;
    },
    /**
     * Finds a move from the link on the page.
     *
     * @return  {Object}    Or null if move not found.
     */
    findByLink:     function (move, link) {
        "use strict";
        var variation,
            subsearch;
        while (move !== null) {
            if (move.link === link) { return move; }
            if (move.down !== null) {
                variation = move.down;
                subsearch = this.findByLink(variation, link);
                if (subsearch) { return subsearch; }
            }
            move = move.next;
        }
        return null;
    },
    /**
     * Converts the move into a string
     *
     * @return  {string}    string description of move
     */
    toString:       function () {
        "use strict";
        return ((this.color === "white") && this.number ? this.number +
            ". " : "") + this.text;
    }
};
