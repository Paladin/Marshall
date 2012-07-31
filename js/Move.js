/**
 * Move
 *
 * An object aggregator, containing the move objects for both white and black
 *
 * @constructor
 * @param   {object}    - The white move object
 * @param   {object}    - The black move object
 *
 * @property {object}	white		- 
 * @property {object}	black		- 
 *
 * @version 0.7.1
 * @author Toomas Ršmer
 * @author Arlen P Walker
 * @copyright 2008 Toomas Ršmer
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
**/
function Move (white, black) {
    "use strict";

	this.white = white;
	this.black = black;
    /**
     * The string version of this object is simply the move texts
     * separated by a space.
     */
	this.toString = function() {
		return this.white + " " + this.black;
	};
};
