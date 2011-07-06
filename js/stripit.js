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
	Strip game comments from a PGN string. If second
	parameter set false true then comments will be replaced
	by an underscore.
*/
function stripIt(val, strip) {
	var count = 0;
	var out = new Array();
	for (var i=0;i<val.length;i++) {
		var c = val.charAt(i);
		switch (c) {
			case '(':
				if (!strip) {
					out[out.length] = '_';
				}
				count++;
				break;
			case '{':
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
				break;
			case ')':
				count--;
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
