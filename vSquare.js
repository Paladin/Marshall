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

function vSquare() {
	this.piece = null;
	this.color = null;
	this.type = "";
	
	this.toString = function() {
		return "vSquare -- piece = "+this.piece+" color="+this.color
					+" type="+this.type;
	};

	this.clone = function() {
		var sq = new vSquare();
		sq.piece = this.piece;
		sq.color = this.color;
		sq.type = this.type;
		return sq;
	};
};
