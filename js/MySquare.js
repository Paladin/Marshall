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

function MySquare(x, y, piece, color) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.piece = piece;

	this.toString = function() {
		return "MySquare -- x = "+this.x+" y="+this.y
							+" color="+this.color
							+ " piece="+this.piece;
	};

	this.clone = function() {
		var sq = new MySquare(this.x, this.y,
		this.piece, this.color);
		return sq;
	};
};
