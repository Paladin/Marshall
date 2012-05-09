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
function BoardImages(options) {
	this.set = "default";
	this.pref = "";
	this.suf = 'gif';
	if (options['set']) {
		this.set = options['set'];
	}
	if (options['imagePrefix']) {
		this.pref = options['imagePrefix'];
	}
	if (options['imageSuffix']) {
		this.suf = options['imageSuffix'];
	}
	this.imageNames = {
		"default": {
			"white" : {"rook":"wRook."+this.suf
								 ,"bishop":"wBishop."+this.suf
								 ,"knight":"wKnight."+this.suf
								 ,"queen":"wQueen."+this.suf
								 ,"king":"wKing."+this.suf
								 ,"pawn":"wPawn."+this.suf
						}
				
			,"black" : {"rook":"bRook."+this.suf
								 ,"bishop":"bBishop."+this.suf
								 ,"knight":"bKnight."+this.suf
								 ,"queen":"bQueen."+this.suf
								 ,"king":"bKing."+this.suf
								 ,"pawn":"bPawn."+this.suf
						}

			,"btns" : {"ffward":"buttons/ffward."+this.suf
									,"rwind":"buttons/rwind."+this.suf
									,"forward":"buttons/forward."+this.suf
									,"back":"buttons/back."+this.suf
									,"toggle":"buttons/toggle."+this.suf
									,"comments":"buttons/comments."+this.suf
									,"flip":"buttons/flip."+this.suf
									,"up":"buttons/up."+this.suf
									,"down":"buttons/down."+this.suf
						}
					}
	}
}

BoardImages.prototype.preload = function() {
		var set = this.set;
		var pref = this.pref;
		if (arguments.length>0)
			set = arguments[0];
		if (arguments.length>1)
			pref = arguments[1];
		var img;
		var img_count = 0;
		for (var i in this.imageNames[set]) {
			for (var j in this.imageNames[set][i]) {
				img = new Image();
				img.src = this.imageNames[set][i][j];
				img_count++;
			}
		}
		return img_count;
	}
