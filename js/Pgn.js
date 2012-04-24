/** Version: 0.7.1 **/
/**
 * Copyright 2008 Toomas Ršmer
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
**/
/*
	Representation of the PGN format. Different meta information
	about the actual game(s) plus the moves and result of the game.
*/
function Pgn(pgn) {
	// properties of the game eg players, ELOs etc
	this.props = new Object();
	this.requiredProps = ['Result','Black','White','Date',
								'Round','Site','Event'];
	this.requiredLength = this.requiredProps.length;
	// the moves, one move contains the black and white move
	this.moves = new Array();
	// the current move in the game
	this.currentMove = 0;
	// for outputting white and black moves separately
	this.skip = 0;

	// strip newlines
	this.pgnOrig = pgn;
	pgn = this.normalize(pgn);
	
	this.pgn = pgn;
	this.pgnRaw = pgn;
	if (this.isBroken(pgn))
		this.pgnStripped = this.stripItBroken(pgn);
	else
		this.pgnStripped = this.stripIt(pgn);
	
	this.pgn = this.extractTags(this.pgn);
	
	// strip comments
	if (this.isBroken(pgn))
		this.pgn = this.stripItBroken(this.pgn,true);
	else
		this.pgn = this.stripIt(this.pgn,true);
	
	var gameOverre = new Array(
		/1\/2-1\/2/,
		/0-1/,
		/1-0/,
		/\*/
	);

	// the moves;
	var themoves = this.pgn.split(" ");
	var tmp = new Array();
	tmp[1] = null;
	var tmpidx = 0;	//make this 1 if FEN and black to move
	if (this.props["FEN"]) {
		var fen = this.props['FEN'].split(/\/| /g);
		if (fen[8] == 'b') {
			tmpidx = 1;
			this.skip = 1;
		}
	}

	if (themoves.length>0 && themoves[themoves.length-1] == "...") {
		 themoves = themoves.slice(0, themoves.length-1);
	}

	var sizeOfTheMoves = themoves.length;
	if (themoves.length>0) {
		for (var i=0;i<gameOverre.length;i++) {
			if (themoves[themoves.length-1].match(gameOverre[i])) {
				sizeOfTheMoves = themoves.length-1;
				continue;
			}
		}
	}


	for (var i=0;i<sizeOfTheMoves;i++) {	//don't handle game end bit
		if (themoves[i]) {
			themoves[i] = themoves[i].replace(/^\s+|\s+$/g, '');
		}
		
		if (!themoves[i]) {
			continue;
		}

		if (themoves[i].indexOf("-") != -1
			 && !/[0|o]-[0|o]/i.test(themoves[i])
			 && !/[0|o]-[0|o]-[0|o]/i.test(themoves[i])
			) {
			var tmp2 = themoves[i].split("-");
			var matches = tmp2[0].match(/[0-9]*?\.?([A-Z])/);
			var newMove;
			if (matches != null) {
				 // we can just replace the - with nothing
				 newMove  = themoves[i].replace("-","");
			}
			else {
				matches = tmp2[0].match(/[0-9]+\./);
				if (matches) {
					newMove = matches[0]+tmp2[1];
				}
				else {
					newMove = tmp2[1];
				}				
			}
			themoves[i] = newMove;
		}
		var c = themoves[i].charAt(0);
		if (c >= '1' && c <= '9') {	//move number
			c = themoves[i].charAt(themoves[i].length-1);
			if (c == '.') {	//ends with . so nothing but a move
				continue;
			}
			var found = false;
			for (var j=0;j<themoves[i].length;j++) {
				c = themoves[i].charAt(j);
				if (c >= '0' && c <= '9') {
					continue;
				}
				else {
					found = true;
					var idx = j;
					// 6.0-0 goes wrong as 0 is used for castling
					if (!(themoves[i].charAt(j) >= '0' && themoves[i].charAt(j)<='9')) {
						 idx = j+1;
				}
					themoves[i] = themoves[i].substring(idx);	//strip move number
					break;
				}
			}
			if (!found) {
				continue;
			}
		}
		tmp[tmpidx] = themoves[i];
		if (tmpidx == 1) {	//black's move or last move
			var move = new Move(tmp[0], tmp[1]);
			this.moves[this.moves.length] = move;
			tmpidx = 0;
			tmp = new Array();
			tmp[1] = null;
		}
		else {
			tmpidx = 1;
		}
	}
	
	if (tmp[0] || tmp[1]) {
		var move = new Move(tmp[0], tmp[1]);
		this.moves[this.moves.length] = move;
	}
}
/**
 *	This will "normalize" the pgn file by removing line breaks, collapsing strings of
 *	spaces, and replacing the symbols for moves with the characters (!, ?, etc.)
 */
Pgn.prototype.normalize = function(pgn) {
	pgn = pgn.replace(/\n/g," ");
	
	// replace dollar signs
	//"!", "?", "!!", "!?", "?!", and "??"
	pgn = pgn.replace(/\ \$1[0-9]*/g, "!");
	pgn = pgn.replace(/\ \$2[0-9]*/g, "?");
	pgn = pgn.replace(/\ \$3[0-9]*/g, "!!");
	pgn = pgn.replace(/\ \$4[0-9]*/g, "??");
	pgn = pgn.replace(/\ \$5[0-9]*/g, "!?");
	pgn = pgn.replace(/\ \$6[0-9]*/g, "?!");
	pgn = pgn.replace(/\ \$[0-9]+/g, "");
	

	// make double spaces to single spaces
	return pgn.replace(/\s+/g,' ');
}
/**
 *	This function takes a pgn game string and extracts all the tags into the class
 *	variable props as key/value pairs. it returns the pgn string, minus the tags.
 */
Pgn.prototype.extractTags = function (pgn) {
	var matches;
	var reprop = /\[([^\]]*)\]/gi;
	if (matches = pgn.match(reprop)) {
		// extract information from each matched property
		for(var i = 0;i < matches.length; i++) {
			// lose the brackets
			tmpMatches = matches[i].substring(1, matches[i].length-1);
			// split by the first space
			var key = tmpMatches.substring(0, tmpMatches.indexOf(" "));
			var value = tmpMatches.substring(tmpMatches.indexOf(" ")+1);
			if (value.charAt(0) == '"')
				value = value.substr(1);
			if (value.charAt(value.length-1) == '"')
				value = value.substr(0, value.length-1);

			this.props[key] = value;
			pgn = pgn.replace(matches[i], "");
		}
	}
	length = this.requiredLength;
	while(length--) {
		if(!this.props[this.requiredProps[length]])
			this.props[this.requiredProps[length]] = "?";
	}

	return pgn.replace(/\[[^\]]*\]/g,'').replace(/^\s+|\s+$/g, '');
}

Pgn.prototype.nextMove = function() {
		var rtrn = null;
		try{
			if (this.skip) {
				this.skip = 0;
				rtrn = new Array(this.moves[this.currentMove].black,
													'black');
				this.currentMove++;
			}
			else {
				this.skip = 1;
				rtrn = new Array(this.moves[this.currentMove].white,
											'white');
			}

			if (rtrn[0] == null || rtrn[0].length == 0)
				rtrn = null;
			return rtrn;
		}
		catch (e) {
			return null;
		}
	};

Pgn.prototype.getComment = function(move, idx) {
		var i = this.pgnStripped.indexOf(move,idx);
		if (i == -1) {
			//throw("getComment error, could not find move '"
			//				+move+"'"+", with index '"+idx+"'");
			return [null,idx];
		}

		for (var j=i+move.length;j<this.pgnStripped.length;j++) {
			var c = this.pgnStripped.charAt(j);
			switch (c) {
				case ' ':
					break;
				case '_':	//found comment
					for (var k=j;k<this.pgnStripped.length;k++) {
						var c2 = this.pgnStripped.charAt(k);
						switch (c2) {
							case '_':	//found comment
								break;
							default:	//no comment
								// we might have many comments separated with spaces
								// as we strip all double spaces to single ones we
								// can just check for the next char being '_'
								if (this.pgnStripped.length>k+1 
									 	&& this.pgnStripped.charAt(k+1) == '_') {
									continue;
								}
								return [this.pgnRaw.substring(j,k),k];
						}
					}
					break;
				default:	//no comment
					return [null,idx];
			}
		}
		return [null,idx];
	};
	
Pgn.prototype.isBroken = function (val) {
		var pCount = 0;
		var cCount = 0;
		var lastOne = "";
		var inComment = false;
		for (var i=0;i<val.length;i++) {
			var c = val.charAt(i);
			if(inComment) {
				switch (c) {
					case '}':
						inComment = false;
						// closing a non-existent curly brace
						if (cCount == 0)
							return true;
						// if we're closing a parenthesis instead of a curly
						if (lastOne == "p")
							return true;
						lastOne = "";
						cCount--;
						break;
					case '{':
						// Cannot nest comments
						return true;
				}
			} else {
				switch (c) {
					case '(':
						pCount++;
						lastOne = "p";
						break;
					case ')':
						// closing a non-existent curly brace
						if (pCount == 0)
							return true;
						// closing a curly instead of a parenthesis
						if (lastOne == "c")
							return true;
						lastOne = "";
						pCount--;
						break;
					case '{':
						inComment = true;
						cCount++;
						lastOne = "c";
						break;
				}
			}
		}
		return false;
	};

Pgn.prototype.stripItBroken = function (val, strip) {
	var count = 0;
	var out = new Array();
	/*
		At one point chesspastebin.com started getting cames
		with invalid PGNs, mostly in the form
		{ comment comment ( something between starting brackets}.
		As you can see, the ( is not closed. 
		isOpen and isCurlyO are just for that to take normal
		guesses in that kind of situations.
	*/
	var isOpen = false;
	var isCurlyO = false;
	var curlyOpenedFst = false;
	for (var i=0;i<val.length;i++) {
		var c = val.charAt(i);
		switch (c) {
			case '(':
				if (!strip) {
					out[out.length] = '_';
				}
				count++;
				if (isOpen) {
					 	count--;
				}
				isOpen = true;
				break;
			case '{':
				isCurlyO = true;
				if (!strip) {
					out[out.length] = '_';
				}
				count++;
				if (!isOpen)
					 curlyOpenedFst=true;
				break;
			case '}':
				if (isOpen && isCurlyO && curlyOpenedFst) {
					// lets close the open (
					count--;
					isOpen = false;
				}
				isCurlyO = false;
				curlyOpenedFst = false;
				count--;
				if (!strip) {
					out[out.length] = '_';
				}
				break;
			case ')':
				if (isOpen) {
					 count--;
					 if (!strip) {
						 out[out.length] = '_';
					 }
					 isOpen = false;
				}
				break;
			case '\t':
				out[out.length] = ' ';
				break;
			default:
				if (count > 0) {
					if (!strip) {
						out[out.length] = '_';
					}
				}
				else {
					out[out.length] = c;
				}
		}
	}
	return out.join("");
};

/*
	Strip game comments from a PGN string. If second
	parameter set false true then comments will be replaced
	by an underscore.
*/
Pgn.prototype.stripIt = function (val, strip) {
	var count = 0;
	var out = new Array();
	var inComment = false;
	for (var i=0;i<val.length;i++) {
		var c = val.charAt(i);
		switch (c) {
			case '(':
				if (!strip) {
					out[out.length] = '_';
				}
				if(!inComment) {
					count++;
				}
				break;
			case '{':
				inComment = true;
				if (!strip) {
					out[out.length] = '_';
				}
				count++;
				break;
			case '}':
				count--;
				if (!strip) {
					out[out.length] = '_';
				}
				inComment = false;
				break;
			case ')':
				if(!inComment) {
					count--;
				}
				if (!strip) {
					out[out.length] = '_';
				}
				break;
			case '\t':
				out[out.length] = ' ';
				break;
			default:
				if (count > 0) {
					if (!strip) {
						out[out.length] = '_';
					}
				}
				else {
					out[out.length] = c;
				}
		}
	}
	return out.join("");
};
