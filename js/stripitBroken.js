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

function stripItBroken(val, strip) {
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
