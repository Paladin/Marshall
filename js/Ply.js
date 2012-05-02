/**
 *	This will contain the information required to completely define a move (by white
 *	or black). It contains the from/to squares, the piece being moved, the piece getting
 *	captured, the square it was on, the piece being promoted to, if the castling was
 *	long or short (k-side or q-side). If the info does not apply or is not known, it is
 *	empty.
 *
 *	Copyright 2012 By Arlen P Walker
 *	Licensed under apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */
function Ply(data) {
	for( var key in data ){
		this[key] = data[key];
	}
}

Ply.prototype = {
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
	toString:	function( format ) {
					if( format === 'short' ){
						var move = this.piece + this.to.file + this.to.rank;
					} else {
						var move = this.piece + this.from.file + this.from.rank;
						move = this.captured === '' ? move + '-' : move + 'x' + this.captured;
						move = move + this.to.file + this.to.rank;
					}
					return move;
				}
};