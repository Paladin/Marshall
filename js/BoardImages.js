/**
 * The images used on the chess board
 *
 * @constructor
 * @param {array} options The configuration options
 *
 * @property {string}	set		    - Name of the set of piece images
 * @property {string}	pref
 * @property {string}	suf		    - The image suffix to use
 * @property {array}	imageNames	- 2D array of image file names
 *
 * @version 0.7.1
 * @author Toomas Ršmer
 * @author Arlen P Walker
 * @copyright 2008 Toomas Ršmer
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
 **/
function BoardImages(options) {
    "use strict";
	this.set = options.set || "default";
	this.pref = options.imagePrefix || "";
	this.suf = options.imageSuffix || "gif";

	this.imageNames = {
		"default": {
			"white" : {
			    "rook": "wRook." + this.suf,
				"bishop": "wBishop." + this.suf,
				"knight": "wKnight." + this.suf,
				"queen": "wQueen." + this.suf,
				"king": "wKing." + this.suf,
				"pawn": "wPawn." + this.suf
			},

			"black" : {
			    "rook": "bRook." + this.suf,
				"bishop": "bBishop." + this.suf,
				"knight": "bKnight." + this.suf,
				"queen": "bQueen." + this.suf,
				"king": "bKing." + this.suf,
				"pawn": "bPawn." + this.suf
			},

			"btns" : {
			    "ffward": "buttons/ffward." + this.suf,
				"rwind":    "buttons/rwind." + this.suf,
				"forward":  "buttons/forward." + this.suf,
				"back": "buttons/back." + this.suf,
				"toggle":   "buttons/toggle." + this.suf,
				"comments": "buttons/comments." + this.suf,
				"flip": "buttons/flip." + this.suf,
				"up":   "buttons/up." + this.suf,
				"down": "buttons/down." + this.suf
			}
		}
	};
}

BoardImages.prototype.preload = function (theSet) {
    "use strict";
    var set = arguments.length > 0 ? theSet : this.set,
        i,
        j,
        img,
        img_count = 0;

    for (i in this.imageNames[set]) {
        if (this.imageNames[set].hasOwnProperty(i)) {
            for (j in this.imageNames[set][i]) {
                if (this.imageNames[set][i].hasOwnProperty(j)) {
                    img = new Image();
                    img.src = this.imageNames[set][i][j];
                    img_count += 1;
                }
            }
        }
    }
    return img_count;
};