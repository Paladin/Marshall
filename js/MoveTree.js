/**
 * MoveTree
 *
 * The basis for the moves in the system. It's a doubly-linked list with
 *  provisions for being doubly-linked into a second list. Each node contains
 * the information necessary to make moves or transition between variations.
 * It gets built and added to until everything is present.
 *
 * @constructor
 * @param   {array}     - An array of properties to initialize
 *
 * @property {object}	white		- 
 * @property {object}	black		- 
 *
 * @version 0.7.1
 * @author Arlen P Walker
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
**/
var MoveTree = function (properties) {
    for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            this[property] = properties[property];
        }
    }
    this.commentary = [];
}
MoveTree.prototype = {
    previous:   null,
    next:       null,
    up:         null,
    down:       null,
    text:       null,
    commentary: null,
    number:     null,
    piece:      null,
    result:     null,
    color:      null,
    getNextMove:    function () {
        return this || this.next;
    },
    isEnd:          function () {
        return this.next === null;
    },
    isEmpty:        function () {
        return !(this.number || this.text || this.result);
    },
    goStart:         function () {
        var move = this;

        while (move.previous !== null) {
            move = move.previous;
        }
        return move;
    },
    goEnd:         function () {
        var move = this;

        while (move.next !== null) {
            move = move.next;
        }
        return move;
    },
    goTop:          function () {
        var move = this;

        while (move.up !== null) {
            move = move.up;
        }
        return move;
    },
    goBottom:       function () {
        var move = this;

        while (move.down !== null) {
            move = move.down;
        }
        return move;
    },
    list:           function () {
        var move = this,
            text = move;

        while (move.next !== null) {
            move = move.next;
            text += " " + move;
        }
        return text;
    },
    toString:       function () {
        return (this.number ? this.number + ". " : "") + this.text;
    }
}