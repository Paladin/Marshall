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

function Board(divId, options) {
	var file = new Array( 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' );
	var pgn = null;
	if (isYahoo(document.getElementById(divId).firstChild.nodeValue))
		pgn = new Yahoo(document.getElementById(divId).firstChild.nodeValue);
	else
		pgn = new Pgn(document.getElementById(divId).firstChild.nodeValue);

	this.conv = new Converter(pgn);
	this.conv.convert();
	this.movesOnPane = new Array();

	this.flipped = false;
	this.id = (new Date()).getTime();
	window[this.id] = this;
	if (!options)
		options={};
	this.moveInput = null;
	this.lastBold = null;
	this.lastBoldIdx = null;
	this.lastSquare = null;
	this.visuals = {"pgn":{}};

	this.opts = [];
	this.opts['imagePrefix'] = "img/default/";
	this.opts['buttonPrefix'] = "img/default/buttons/";
	this.opts['imageSuffix'] = 'gif';

	this.opts['blackSqColor'] = "#4b4b4b";
	this.opts['whiteSqColor'] = "#ffffff";
	this.opts['flipped'] = false;
	this.opts['showMovesPane'] = true;
	
	this.opts['showComments'] = true;
	this.opts['markLastMove'] = true;
	
	this.opts['altRewind'] = "Rewind to the beginning";
	this.opts['altBack'] = "One move back";
	this.opts['altFlip'] = "Flip the board";
	this.opts['altShowMoves'] = "Show moves pane";
	this.opts['altComments'] = "Show comments";
	this.opts['altPlayMove'] = "Play one move";
	this.opts['altFastForward'] = "Fast-forward to the end";
	this.opts['downloadURL'] = "http://www.chesspastebin.com/asPgn.php?PGN=";
	this.opts['skipToMove'] = null;

	var optionNames = ['flipped', 'blackSqColor', 'whiteSqColor',
									'imagePrefix', 'showMovesPane',
									'imageSuffix', 'comments',
									'markLastMove','altRewind',
									'altBack','altFlip','altShowMoves',
									'altComments','altPlayMove',
									'altFastForward',
									'skipToMove', 'downloadURL',
									'buttonPrefix'];

	// if keys in options define new values then
	// set the this.opts for that key with the 
	// custom value
	for (var i=0;i<optionNames.length;i++) {
		if (options && typeof(options[optionNames[i]]) != 'undefined') {
			this.opts[optionNames[i]] = options[optionNames[i]];
		}
	}

if (options && typeof(options['buttonPrefix']) == 'undefined')
  this.opts['buttonPrefix'] = this.opts['imagePrefix']+"buttons/";
	
	var brdI = new BoardImages(this.opts);
	var imageNames = brdI.imageNames['default'];
	brdI = null;
	// end of static
	this.pos = new Array();

	for(var i = 0;i<8;i++)
		this.pos[i] = new Array();

	this.init = function() {
		// the main frame
		var boardFrame = document.getElementById(divId+"_board");

		var gameSection = document.createElement("section");
		gameSection.className = "game_section";

		// toplevel table;
		var topTable = document.createElement("table");
		topTable.className = "mainboard"
		gameSection.appendChild(topTable);
		var topTableTb = document.createElement("tbody");
		topTable.appendChild(topTableTb);
		
		var boardTd = document.createElement("td");
		var btnTdNext = document.createElement("td");
		btnTdNext.className = "current_move_cell"
		var btnTd = document.createElement("td");
		btnTd.className = "board_controls"
		var propsTd = document.createElement("td");
		propsTd.className = "game_info"
		
		// movesTable
		var movesDiv = document.createElement("div");
		movesDiv.className = "move_list";
		this.movesDiv = movesDiv;
		movesDiv.id = divId+"_board_moves";
		gameSection.appendChild(movesDiv);
		
		var tmp = document.createElement("tr");
		tmp.appendChild(boardTd);
		topTableTb.appendChild(tmp);

		topTableTb.appendChild(document.createElement("tr")).appendChild(btnTd);
		topTableTb.appendChild(document.createElement("tr")).appendChild(btnTdNext);
		topTableTb.appendChild(document.createElement("tr")).appendChild(propsTd);


		var board = document.createElement("table");
		board.className = "gameboard"
		var boardTb = document.createElement("tbody");
		board.appendChild(boardTb);

		boardFrame.appendChild(gameSection);
		boardTd.appendChild(board);
		
		var whiteC = 'light_square';
		var blackC = 'dark_square';

		// white pieces
		for(var i = 0; i < 8; i++) {
			var tr = document.createElement("tr");
			var flip = (i % 2)?1:0;
			for(var j = 0; j < 8; j++) {
				var td = document.createElement("td");

				td.className = !flip?(j%2)?blackC:whiteC:!(j%2)?blackC:whiteC;
				td.setAttribute( 'data-squarename', file[j]+(8-i) );

				this.pos[i][j] = td;
				tr.appendChild(td);
			}
			boardTb.appendChild(tr);
		}
		this.populatePieces();
		if (this.opts['flipped'])
			this.flipBoard();
		this.populateProps(propsTd);
		this.populateMoves(movesDiv, pgn.pgnOrig);

		// in java i could do Board.this in anon function;
		var tmp = this;

		// rwnd;
		var hrefS = document.createElement("a");
		hrefS.href = "javascript:void(0)";
		var href = hrefS.cloneNode(false);
		var input = this.getImg("rwind","btns");
		input.alt = this.opts['altRewind'];
		input.title = this.opts['altRewind'];;
		href.appendChild(input);
		
		theBoard = this;
		input.onclick = function() {
			theBoard.startPosition();
		};
		btnTd.appendChild(href);

		// back
		input = this.getImg("back","btns");
		input.alt = this.opts['altBack'];
		input.title = this.opts['altBack'];
		href = hrefS.cloneNode(false);
		href.appendChild(input);
		
		input.onclick = function() {
			makeBwMove(tmp);
		};

		btnTd.appendChild(href);
		
		// flip the board
		input = this.getImg("flip","btns");
		input.alt = this.opts['altFlip'];
		input.title = this.opts['altFlip'];
		href = hrefS.cloneNode(false);
		href.appendChild(input);
		
		input.onclick = function() {
			tmp.flipBoard();
		};

		btnTd.appendChild(href);

		// current move
		// it is initialized in updateMoveInfo
		var input = document.createElement("input");
		input.className = "current_move_box";
		this.moveInput = input;
		btnTdNext.appendChild(input);
		// end of current move

		// hide
		input = this.getImg("toggle","btns");
		input.alt = this.opts['altShowMoves'];
		input.title = this.opts['altShowMoves'];
		href = hrefS.cloneNode(false);
		href.appendChild(input);

		input.onclick = function() {
			toggleMoves(tmp, "flip");
		};

		btnTd.appendChild(href);

		// comments
		input = this.getImg("comments","btns");
		input.alt = this.opts['altComments'];
		input.title = this.opts['altComments'];
		href = hrefS.cloneNode(false);
		href.appendChild(input);

		input.onclick = function() {
			toggleComments(tmp, "flip");
		};

		btnTd.appendChild(href);

		// next btn
		input = this.getImg("forward","btns");
		input.alt = this.opts['altPlayMove'];
		input.title = this.opts['altPlayMove'];
		href = hrefS.cloneNode(false);
		href.appendChild(input);

		input.onclick = function() {
			makeMove(tmp);
		};

		btnTd.appendChild(href);

		// ffwd
		input = this.getImg("ffward","btns");
		input.alt = this.opts['altFastForward'];
		input.title = this.opts['altFastForward'];
		href = hrefS.cloneNode(false);
		href.appendChild(input);

		input.onclick = function() {
				tmp.endPosition(tmp);
		};
		btnTd.appendChild(href);
		updateMoveInfo(this);
		this.toggleMoves(this.opts['showMovesPane']);	//force the moves pane overflow to get picked up
		if (this.opts['skipToMove']) { 
			try {
				var tmp2 = parseInt(this.opts['skipToMove']);
				if (tmp2>2) {
					var color2 = tmp2%2==0?1:0;
					tmp2 = Math.round(tmp2/2);
					this.skipToMove(tmp2-1,color2);
				}
				else if (tmp2 == 1) {
					 this.skipToMove(0,0);
				}
				else if (tmp2 == 2) {
					 this.skipToMove(0,1);
				}
			}catch(e){}
		}
 	};
/**
 *	Flips the board to display it from the other side's POV.
 */
	this.flipBoard = function() {
		this.deMarkLastMove(true);
		var upper, lower, holdSquareContent;
		this.flipped = !this.flipped;
		for (var i = 0;i<8;i++) {
			for (var j = 0;j<4;j++){
				upper = this.pos[i][j];
				lower = this.pos[7-i][7-j];

				try {
					 holdSquareName = upper.getAttribute('data-squarename');
					 holdSquareContent = upper.removeChild(upper.firstChild);
				}
				catch (e) {holdSquareContent=null;}

				try{
					 upper.setAttribute('data-squarename', lower.getAttribute('data-squarename'));
					 upper.appendChild(lower.removeChild(lower.firstChild));
				}
				catch (e) {}
				
				lower.setAttribute('data-squarename', holdSquareName);
				if (holdSquareContent)
					lower.appendChild(holdSquareContent);
			}
		}
	};
/**
 *	Rolls the board position to a specific ply (half-move).
 *
 *	moveNumber		The move number in the game to set the position to
 *	color			Which ply? 0=white, 1=black
 *
 *	NOTE: the +1 in the ply calculation is because the computer is zero-based while
 *			the move list, like all human lists, is one-based.
 */
	this.skipToMove = function(moveNumber, color) {
		var ply = moveNumber*2+color+1;
		if (this.conv.getCurMoveNo()<ply) {
			var i = 0;
			while(this.conv.getCurMoveNo()<ply && i < 400) {
				makeMove(this, true);
				i++;
			}
			updateMoveInfo(this);
			updateMovePane(this);
			this.deMarkLastMove();
			this.markLastMove();
		}
		else if (this.conv.getCurMoveNo()>ply) {
			var i = 0;
			while(this.conv.getCurMoveNo()>ply && i < 200) {
				makeBwMove(this, true);
				i++;
			};
			updateMoveInfo(this);
			updateMovePane(this);
			this.deMarkLastMove();
			this.markLastMove();
		}
	}
/**
 *	Jumps the board all the way to the final position of the game
 */
	this.endPosition = function() {
		this.deMarkLastMove();
		var vBoard = this.conv.getEndPos(this.flipped);
		this.syncBoard(vBoard);;
		this.conv.resetToEnd();
		updateMoveInfo(this);
		updateMovePane(this, true);
		this.markLastMove();
	};
/**
 *	Jumps the board all the way to the starting position of the game
 */
	this.startPosition = function() {
		this.deMarkLastMove(true);
		var vBoard = this.conv.getStartPos(this.flipped);
		this.syncBoard(vBoard);
		this.conv.resetToStart();
		updateMoveInfo(this);
		updateMovePane(this);
	};

				makeBwMove = function(board, noUpdate) {
					var move = board.conv.prevMove();
					if (move == null)
						 return;
					
					if (!noUpdate) {
						board.deMarkLastMove(true);
						board.markLastMove();
						updateMoveInfo(board);
						updateMovePane(board, true);
					}

					for(var i=move.actions.length;i > 1;i-=2) {
						var frst = move.actions[i-1].clone();
						var snd = move.actions[i-2].clone();
						var tmpM = new MySquare();
						tmpM.piece = frst.piece;
						tmpM.color = frst.color;
						frst.piece = snd.piece;
						frst.color = snd.color;
						snd.piece = tmpM.piece;
						snd.color = tmpM.color;

						frst.piece = move.oPiece;
						frst.color = move.oColor;

						if (move.pPiece)
							 snd.piece = move.pPiece;

						board.drawSquare(frst);
						board.drawSquare(snd);
					}
					if (move.enP) {
						 var x = move.enP.x, y = move.enP.y;
						 if (board.flipped) {
							 x=7-x;
							 y=7-y;
						}
						var sq = board.pos[x][y];
						sq.appendChild(board.getImg(move.enP.piece, move.enP.color));
					}
				};

				this.markLastMove = function() {
					if (!this.opts['markLastMove'])
						return;
					try {
						var move = this.conv.moves[this.conv.iteIndex-1].actions[1];;
						var piece = this.pos[move.x][move.y];
						if (this.flipped) {
							piece = this.pos[7-move.x][7-move.y];
						}
						// on konq the bg contains "initial initial initial "
						// i guess xtra information. Anyways setting the
						// background to a color containing the "initial"
						// parts fails. Go figure
						this.lastSquare = piece;
					}
					catch (e) {}
				};

				this.deMarkLastMove = function() {
					var move = this.conv.moves[this.conv.iteIndex-2];
					if (arguments.length && arguments[0]) {
						move = this.conv.moves[this.conv.iteIndex-1];
					}
					
					if (this.conv.iteIndex+1 == this.conv.moves.length)
						 move = this.conv.getCurMove();

					if (move) {
						move = move.actions[1];
						
						var piece = this.pos[move.x][move.y];
						if (this.flipped)
							piece = this.pos[7-move.x][7-move.y];
					}
					if (this.lastSquare && this.lastSquare.lastBg) {
						this.lastSquare = null;
					}
				};

				/*
					Toggle moves pane, actually not toggle but
					showing it depending the 'flag'.
				*/
				this.toggleMoves = function(flag) {
					if (flag == "flip")
						flag = this.movesDiv.style.visibility=="hidden";
					if (flag) {
						this.movesDiv.style.display = "block";
						this.movesDiv.style.visibility = "visible";
					}
					else {
						this.movesDiv.style.display = "none";
						this.movesDiv.style.visibility = "hidden";
					}
				};

				this.toggleComments = function(flag) {
					if (flag == "flip")
						flag = !this.opts['showComments'];
					if (flag) {
						this.opts['showComments'] = true;
					}
					else {
						this.opts['showComments'] = false;
					}
					var list = this.movesDiv.getElementsByTagName("span");
					if (list) {
						for (var i=0;i<list.length;i++) {
							if (flag) {
								list[i].style.display = "inline";
							}
							else {
								list[i].style.display = "none";
							}
						}
					}
				};

				/*
					Non-member toggle function. The onClick that I'm
					setting must not be a member function. I'm just
					using it to proxy.
				*/
				toggleMoves = function(board, flag) {
					board.toggleMoves(flag);
				};

				toggleComments = function(board, flag) {
					board.toggleComments(flag);
				};

				updateMoveInfo = function(board) {
					var idx = board.conv.getCurMoveNo()-1;
//						if (board.conv.getCurMoveNo() == board.conv.moves.length-1)
//							idx = board.conv.getCurMoveNo();
					var move = board.conv.moves[idx];
					if (move && move.moveStr) {
						 var str = Math.floor((idx==0?1:idx)/2+1)+". "+move.moveStr;
						 board.moveInput.value = str;
					}
					else
						 board.moveInput.value = "...";
				};

				makeMove = function(board, noUpdate) {
					var move = board.conv.nextMove();
					if (move == null)
						 return;
					
					if (!noUpdate) {
						 board.deMarkLastMove();
						 board.markLastMove();

						 updateMoveInfo(board);
						 updateMovePane(board);
					}
					
					for(var i=0;i < move.actions.length;i++) {
						board.drawSquare(move.actions[i]);
					}
					
					board.drawEnPassante(move);
				};

				updateMovePane = function(board, bw) {
					// highlight the move in the move's pane
					var idx = board.conv.getCurMoveNo();
					board.movesOnPane[this.lastBoldIdx] = deMakeBold(this.lastBold);
//						if (bw)
//							 idx+=1;
					this.lastBold = null;
					this.lastBoldIdx = null;
					if (board.movesOnPane[idx-1]) {
						board.movesOnPane[idx-1] = makeBold(board.movesOnPane[idx-1]);
						this.lastBold = board.movesOnPane[idx-1];
						this.lastBoldIdx = idx-1;
					}
				};

				makeBold = function(el) {
					var b = document.createElement("b");
					b.appendChild(el.cloneNode(true));
					el.parentNode.replaceChild(b, el);
					return b;
				};

				deMakeBold = function(el) {
					if (!el)
						 return;
					var rtrn = el.firstChild.cloneNode(true);
					el.parentNode.replaceChild(rtrn, el);
					return rtrn;
				};

				this.drawEnPassante = function(move) {
					if (!move.enP)
						 return;
					var x = move.enP.x, y = move.enP.y;
					if (this.flipped) {
						x = 7-x;
						y = 7-y;
					}
					var sq = this.pos[x][y];
					
					sq.color = null;
					sq.piece = null;

					sq.removeChild(sq.firstChild);
				};

				this.drawSquare = function(square) {
					var x = square.x, y = square.y;
					if (this.flipped) {
						x=7-x;
						y=7-y;
					}
					var sq = this.pos[x][y];

					sq.color = square.color;
					sq.piece = square.piece;

					if (sq.firstChild)
						sq.removeChild(sq.firstChild);

					if (sq.piece) {
						sq.appendChild(this.getImg(sq.piece,sq.color));
					}
				};

				this.updatePGNInfo = function() {
					this.visuals['pgn']['players'].nodeValue = ' ';
					this.visuals['pgn']['elos'].nodeValue = ' ';
					this.visuals['pgn']['event'].nodeValue = ' ';
					this.visuals['pgn']['timecontrol'].nodeValue = ' ';
					if (this.conv.pgn.props['White']) {
						this.visuals['pgn']['players'].nodeValue = this.conv.pgn.props['White'];
					}
					if (this.conv.pgn.props['White'] || this.conv.pgn.props['Black'])
						this.visuals['pgn']['players'].nodeValue += " - ";
					
					if (this.conv.pgn.props['Black']) {
						this.visuals['pgn']['players'].nodeValue += this.conv.pgn.props['Black'];
					}
					
					if (this.conv.pgn.props['WhiteElo']) {
						this.visuals['pgn']['elos'].nodeValue = 
								this.conv.pgn.props['WhiteElo'];
					}
					if (this.conv.pgn.props['WhiteElo'] || this.conv.pgn.props['BlackElo'])
						this.visuals['pgn']['elos'].nodeValue += " - ";
					if (this.conv.pgn.props['BlackElo']) {
						this.visuals['pgn']['elos'].nodeValue += 
								this.conv.pgn.props['BlackElo'];
					}
					if (this.conv.pgn.props['Event']) {
						this.visuals['pgn']['event'].nodeValue =
								this.conv.pgn.props['Event'];
					}
					if (this.conv.pgn.props['Date']) {
						this.visuals['pgn']['event'].nodeValue +=
								", "+this.conv.pgn.props['Date'];
					}
					if (this.conv.pgn.props['TimeControl']) {
						this.visuals['pgn']['timecontrol'].nodeValue =
								this.conv.pgn.props['TimeControl'];
					}
				};

				this.updateSettings = function() {
					var blacks = this.opts['blackSqColor'];
					var whites = this.opts['whiteSqColor'];
					
					for(var i=0;i<8;i++){
						var flip = (i%2)?true:false;
						for(var j=0;j<8;j++){
							var color = flip?(j%2)?whites:blacks:!(j%2)?whites:blacks;
						}
					}
				};

				/*
				 * Draw the board with all the pieces in the initial
				 * position
				*/
				this.populatePieces = function() {
				for (var r=0;r<8;r++) {
					for (var f=0;f<8;f++) {
						var p = this.conv.initialBoard[r][f];
						if (p.piece) {
							var img = this.getImg(p.piece,p.color);
							this.pos[r][f].appendChild(img);
							this.pos[r][f].piece = p.piece;
							this.pos[r][f].color = p.color;
						}
					}
				}
			};

			this.populateMoves = function(cont, pgn) {
				if (!this.opts['showMovesPane']) {
					 cont.style.visibility="hidden";
					 cont.style.display="none";
				}
				var tmp2=this.conv.pgn.moves;
				var movesHeader = document.createElement('header');
				var h = document.createElement("h1");
				var tmpA = document.createElement("a");

				tmpA.href = this.opts['downloadURL']+escape(pgn);
				tmpA.appendChild(document.createTextNode("PGN"));

				var txt = document.createTextNode("");
				if (this.conv.pgn.props['White']) {
					var txt = document.createTextNode(this.conv.pgn.props['White']
									+" - "+this.conv.pgn.props['Black']);
					h.appendChild(txt);
				}
				else {
					var txt = document.createTextNode("Unknown - Unknown");
					h.appendChild(txt);
				}
				h.appendChild(document.createTextNode(" ("));
				h.appendChild(tmpA);
				h.appendChild(document.createTextNode(")"));
				movesHeader.appendChild(h)
				cont.appendChild(movesHeader);
				moveList = document.createElement("p");
				cont.appendChild(moveList);
				
				var link, tmp, tmp3;
				var lastMoveIdx = 0;
				var comment;

				for (var i = 0;i < tmp2.length;i++) {
					if (tmp2[i].white != null) {
						link = document.createElement("a");
						tmp = document.createTextNode(tmp2[i].white);
						tmp3 = document.createElement("span");
						tmp3.className = 'move_numbers';

						tmp3.appendChild(document.createTextNode(" "+(i+this.conv.startMoveNum)+". "));
						moveList.appendChild(tmp3);
						
						link.className = "move";
						link.href = 'javascript:void(window['+this.id+']'
												+'.skipToMove('+i+','+0+'))';
						link.appendChild(tmp);
						moveList.appendChild(link);

						comment = this.conv.pgn.getComment(tmp2[i].white,lastMoveIdx);
						if (comment[0]) {
							var tmp4 = document.createElement("span");
							tmp4.className = "commentary";
							if (!this.opts['showComments']) {
								tmp4.style.display = "none";
							}
							tmp4.appendChild(document.createTextNode(comment[0]));
							moveList.appendChild(tmp4);
							lastMoveIdx = comment[1];
						}

						this.movesOnPane[this.movesOnPane.length] = link;
					}

					if (tmp2[i].black != null) {
						moveList.appendChild(document.createTextNode(" "));
						tmp = document.createTextNode(tmp2[i].black);
						link = document.createElement("a");
						link.className = "move";
						link.appendChild(tmp);
						link.href = 'javascript:void(window['+this.id+']'
											+'.skipToMove('+i+','+1+'))';
						moveList.appendChild(link);
						comment = this.conv.pgn.getComment(tmp2[i].black,lastMoveIdx);
						if (comment[0]) {
							var tmp4 = document.createElement("span");
							tmp4.className = "commentary";
							if (!this.opts['showComments']) {
								tmp4.style.display = "none";
							}
							tmp4.appendChild(document.createTextNode(comment[0]));
							moveList.appendChild(tmp4);
							lastMoveIdx = comment[1];
						}
						this.movesOnPane[this.movesOnPane.length] = link;
					}
				}
				if(!(typeof(this.conv.pgn.props['Result']) == 'undefined')) {
					txt = document.createTextNode("  "+this.conv.pgn.props['Result']);
					tmp2 = document.createElement("span");
					tmp2.className = "result";
					tmp2.appendChild(txt);
					moveList.appendChild(tmp2);
					this.movesOnPane[this.movesOnPane.length] = tmp2;
				}
			};

			this.populateProps = function(container) {

				// white - black;
				var player_line = document.createElement('p');
				player_line.className = 'players';
				container.appendChild(player_line);

 				var txt = document.createTextNode('&nbsp;');
 				this.visuals['pgn']['players'] = txt;
 				player_line.appendChild(txt);
				
				// ELO
				var elo_line = document.createElement('p');
				elo_line.className = 'elo';
				container.appendChild(elo_line);

 				txt = document.createTextNode('&nbsp;');
 				this.visuals['pgn']['elos'] = txt;
 				elo_line.appendChild(txt);

				// Date 
				var date_line = document.createElement('p');
				date_line.className = 'game_date';
				container.appendChild(date_line);

 				txt = document.createTextNode('&nbsp;');
 				this.visuals['pgn']['event'] = txt;
 				date_line.appendChild(txt);

				// Time control
				var time_line = document.createElement('p');
				time_line.className = 'time_control';
				container.appendChild(time_line);

 				txt = document.createTextNode('&nbsp;');
 				this.visuals['pgn']['timecontrol'] = txt;
 				time_line.appendChild(txt);

				this.updatePGNInfo();
			};

			this.getImg = function(piece, color) {
				var btns = {"ffward":true,"rwind":true,"forward":true,
							"back":true,"toggle":true,"comments":true,"flip":true};
				
				var prefix = this.opts['imagePrefix'];
				if (btns[piece]) {
					prefix = this.opts['buttonPrefix'];
					imageNames[color][piece] = imageNames[color][piece].replace("buttons\/","");
				}
				
				var src = prefix + imageNames[color][piece];
				var img = document.createElement("img");
				
				if ( /\.png$/.test( img.src.toLowerCase()) &&
						navigator.userAgent.toLowerCase().indexOf("msie") != -1) {
					// set filter
					img.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src='" + 
								src + "',sizingMethod='image')";	
				}
				else {
					img.src = src;
				}

				img.alt = color + "_" + piece;
				return img;
			};

			this.syncBoard = function(result) {
				for(var i=0;i<8;i++) {
					for(var j=0;j<8;j++) {
						this.syncSquare(result[i][j]
												,this.pos[i][j]);
					}
				}
			};

			this.syncSquare = function(from, to) {
				to.piece = from.piece;
				to.color = from.color;

				if (to.firstChild)
					 to.removeChild(to.firstChild);
				if (to.piece) {
					to.appendChild(this.getImg(to.piece, to.color));
				}
			};
		};
