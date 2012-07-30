/**
 * MyMove
 *
 * @constructor
 * @property {array}	actions		- 
 * @property {string}	oPiece		- 
 * @property {string}	oColor		- 
 * @property {string}	pPiece		- What the piece was (used after promotion)
 * @property {string}	enP			- Is it a capture enpassant?
 * @property {string}	moveStr		- The string representing the move
 * @property {string}	position	- FEN notation of the resulting position
 *
 * @version 0.7.1
 * @author Toomas Ršmer
 * @author Arlen P Walker
 * @copyright 2008 Toomas Ršmer
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
**/
var MyMove = function () {
	"use strict";
	this.actions = [];
	this.oPiece = null;
	this.oColor = null;
	this.pPiece = null;
	this.enP = null;
	this.moveStr = null;
	this.position = '';
	/**
	 * Add an action to the move
	 *
	 * @param array
	 */
	this.add = function (action) {
		this.actions[this.actions.length] = action;
	};
	/*
	 * When asked for a string representation of this object,
	 * return the count for the number of actions.
	 */
	this.toString = function () {
		return "MyMove -- no. actions " + this.actions.length;
	};
};