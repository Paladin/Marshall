/** Version: 0.7.1 **/
/**
 * Copyright 2008 Toomas R�mer
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
	
function MyMove() {
	this.actions = new Array();
	this.oPiece = null;
	this.oColor = null;
	// in case of promotion have to remember the prev
	// piece
	this.pPiece = null;
	//
	this.enP = null;
	//
	this.moveStr = null;
	this.position = '';

	this.add = function(action) {
		this.actions[this.actions.length] = action;
	};

	this.toString = function() {
		return "MyMove -- no. actions "+this.actions.length;
	};
};
