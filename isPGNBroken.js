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

function isPGNBroken(val) {
	var pCount = 0;
	var cCount = 0;
	var lastOne = "";
	for (var i=0;i<val.length;i++) {
		var c = val.charAt(i);
		switch (c) {
			case '(':
				pCount++;
				lastOne = "p";
				break;
			case ')':
				// closing a non-existent curly brace
				if (pCount == 0)
					return false;
				// closing a curly instead of a parenthesis
				if (lastOne == "c")
					return false;
				lastOne = "";
				pCount--;
				break;
			case '{':
				cCount++;
				lastOne = "c";
				break;
			case '}':
				// closing a non-existent curly brace
				if (cCount == 0)
					return false;
				// if we're closing a parenthesis instead of a curly
				if (lastOne == "p")
					return false;
				lastOne = "";
				cCount--;
				break;
		}
	}
}
