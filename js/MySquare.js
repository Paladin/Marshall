/**
 *
 * @constructor
 * @property {integer}	x		- chessboard rank
 * @property {integer}	y		- chessboard file
 * @property {string}	piece	- What piece is on the square
 * @property {string}	color	- Black or White
 *
 * @version 0.7.1
 * @author Toomas Ršmer
 * @author Arlen P Walker
 * @copyright 2008 Toomas Ršmer
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
**/
var MySquare = function (x, y, piece, color) {
	"use strict";
	this.x = x;
	this.y = y;
	this.color = color;
	this.piece = piece;
    /**
     * String version of this class identifies all the properties
     **/
	this.toString = function () {
		return "MySquare -- x = " + this.x + " y=" + this.y
							+ " color=" + this.color
							+ " piece=" + this.piece;
	};
    /**
     * clone creates an identical square to this one.
     */
	this.clone = function () {
		var sq = new MySquare(this.x, this.y,
		        this.piece, this.color);
		return sq;
	};
};