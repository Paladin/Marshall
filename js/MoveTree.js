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
 * @version 0.7.1
 * @author Arlen P Walker
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
**/
var MoveTree = function (properties) {
    "use strict";
    var property;

    for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            this[property] = properties[property];
        }
    }
    this.commentary = [];
};
MoveTree.prototype = {
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
    getNextMove:    function () {
        "use strict";
        return this.next || this;
    },
    getPreviousMove:    function () {
        "use strict";
        return this.previous || this;
    },
    isEnd:          function () {
        "use strict";
        return this.next === null;
    },
    isEmpty:        function () {
        "use strict";
        return !(this.number || this.text || this.result);
    },
    goStart:         function () {
        "use strict";
        var move = this;

        while (move.previous !== null) {
            move = move.previous;
        }
        return move;
    },
    goEnd:         function () {
        "use strict";
        var move = this;

        while (move.next !== null) {
            move = move.next;
        }
        return move;
    },
    goTop:          function () {
        "use strict";
        var move = this;

        while (move.up !== null) {
            move = move.up;
        }
        return move;
    },
    goBottom:       function () {
        "use strict";
        var move = this;

        while (move.down !== null) {
            move = move.down;
        }
        return move;
    },
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
    addNext:        function (properties) {
        "use strict";
        var move = new MoveTree(properties);
        this.next = move;
        move.previous = this;
        return move;
    },
    addVariation:        function (properties) {
        "use strict";
        var move = new MoveTree(properties),
            addedTo = this.goBottom();
        addedTo.down = move;
        move.up = addedTo;
        return move;
    },
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
    toString:       function () {
        "use strict";
        return ((this.color === "white") && this.number ? this.number +
            ". " : "") + this.text;
    }
};