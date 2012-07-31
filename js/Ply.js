/**
 * Ply
 *
 *	This will contain the information required to completely define a move (by
 *  white or black). It contains the from/to squares, the piece being moved,
 *  the piece getting captured, the square it was on, the piece being promoted
 *  to, if the castling was long or short (k-side or q-side). If the info does
 *  not apply or is not known, it is empty. It is designed to be used in a
 *  linked list, pointing to the prev/next entries in the list.
 *
 * @constructor
 * @property {integer}	moveNumber	- 
 * @property {string}	color		- 
 * @property {string}	piece		- 
 * @property {object}	from		- 
 * @property {object}	to		- 
 * @property {string}	captured		- 
 * @property {object}	capturedOn		- 
 * @property {string}	promotedTo		- 
 * @property {string}	castled		- 
 * @property {string}	fen		- 
 * @property {object}	previous		- 
 * @property {string}	next		- 
 *
 * @version 0.7.1
 * @author Arlen P Walker
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
**/
var Ply = function (data) {
    "use strict";
    var key;

	for (key in data ) {
        if (data.hasOwnProperty(key)) {
            this[key] = data[key];
        }
	}

	if (this.color.toLowerCase() !== 'white' &&
			this.color.toLowerCase() !== 'black') {
		this.color = '';
	}
};

Ply.prototype = {
	moveNumber:	null,
	color:	'',
	piece:	'',
	from:	{ file: '', rank: 0 },
	to:	{ file: '', rank: 0 },
	captured:	'',
	capturedOn:	{ file: '', rank: 0 },
	promotedTo:	'',
	castled:	'',
	fen:		'',
	previous:	null,
	next:		null,
	toString:	function (format, numbered) {
        "use strict";
        var move = '';

        move = move + (numbered ? this.moveNumber + '. ' : '');
        move = move + (numbered && (this.color === 'black') ? '... ' : '');
        move = move + this.piece;
        move = move + (format !== 'short' ?
                this.from.file + this.from.rank : '');
        move = move + ((format !== 'short' && this.captured === '') ?
                '-' : '');
        move = move + ((format !== 'short' && this.captured !== '') ?
                'x' + this.captured : '');
        move = move + this.to.file + this.to.rank;

        return move;
    }
};