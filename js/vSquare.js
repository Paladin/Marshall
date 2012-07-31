/**
 * vSquare
 *
 * @constructor
 * @property {string}	piece		- 
 * @property {string}	color		- 
 * @property {string}	type		- 
 *
 * @version 0.7.1
 * @author Toomas Ršmer
 * @author Arlen P Walker
 * @copyright 2008 Toomas Ršmer
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
**/
var vSquare = function () {
    "use strict";
	this.piece = null;
	this.color = null;
	this.type = "";
	/**
	 * The text version of this object is a description of the square contents
	 */
	this.toString = function () {
		return "vSquare -- piece = " + this.piece + " color=" + this.color +
					" type=" + this.type;
	};

	this.clone = function () {
		var sq = new vSquare();
		sq.piece = this.piece;
		sq.color = this.color;
		sq.type = this.type;
		return sq;
	};
};
