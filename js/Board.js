/**
 * The board on which the action takes place
 *
 * @constructor
 * @param {string} The ID of the div to put the board inside
 * @param {object} The configuration options for the board
 *
 * @property {array}	file		- Array of the names of the chessboard files
 * @property {object}	pgn			- The game object
 * @property {string}	divId		- The ID of the board's display element
 * @property {object}	conv		- The Converter object
 * @property {array}	movesOnPane	- The array of displayed moves
 * @property {boolean}	flipped		- White or Black (true) on top
 * @property {string}	id			- GUID
 * @property {string}	moveInput	- text in moveInput window
 * @property {string}	lastBold	- 
 * @property {integer}	lastBoldIdx	- 
 * @property {object}	lastSquare	- 
 * @property {object}	visuals		- 
 * @property {object}	displayBoard- 
 * @property {object}	opts		- 
 * @property {array}	imageNames	- 
 * @property {array}	pos			- array of table cells in display (a8-h1)
 *
 * @version 0.7.1
 * @author Toomas Ršmer
 * @author Arlen P Walker
 * @copyright 2008 Toomas Ršmer
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
**/
var Board = function (divId, options) {
	"use strict";
	var optionNames,
		i,
        givenOptions = options || {};

	if (this.isYahoo(document.getElementById(divId).firstChild.nodeValue)) {
		this.pgn = new Yahoo(document.getElementById(divId).
		        firstChild.nodeValue);
	} else {
		this.pgn = new Pgn(document.getElementById(divId).firstChild.nodeValue);
	}
	//Instance attributes
	this.divId = divId;
	this.visuals = { "pgn": {} };
    this.pos = [];
    this.id = (new Date()).getTime();
	this.movesOnPane = [];

	this.conv = new Converter(this.pgn);
	this.conv.convert();

	window[this.id] = this;

	this.opts = this.setDefaultOptions();
	optionNames = Object.keys(this.opts);

	// if keys in options define new values then
	// set the this.opts for that key with the 
	// custom value
	for (i = 0; i < optionNames.length; i += 1) {
		if (givenOptions[optionNames[i]] !== undefined) {
			this.opts[optionNames[i]] = givenOptions[optionNames[i]];
		}
	}

	// end of static
	for (i = 0; i < 8; i += 1) {
		this.pos[i] = [];
	}
};
/**
 * Setting up class attributes
 */
Board.prototype = {
	file:       ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
	flipped:    false,
	moveInput:  null,
	lastBold:   null,
	lastBoldIdx:    null,
	lastSquare: null,
	displayBoard:   null,
	pgn:        null,
	pos:        [],
	movesOnPane:    [],
	divId:          null,
	visuals:        {},
	id:             null,
    isYahoo:    function (pgn) {
        "use strict";
		pgn = pgn.replace(/^\s+|\s+$/g, '');
		return pgn.charAt(0) === ';';
	},
	init:       function () {
        "use strict";
        // the main frame
        var boardFrame = document.getElementById(this.divId + "_board"),
            gameSection =
                this.createWithAttribs("section", { "class": "game_section" }),
            topTable =
                this.createWithAttribs("table", { "class": "mainboard" }),
            topTableTb = document.createElement("tbody"),
            boardTd = document.createElement("td"),
            btnTdNext =
                this.createWithAttribs("td", { "class": "current_move_cell" }),
            btnTd = this.createWithAttribs("td", { "class": "board_controls" }),
            propsTd =
                this.createWithAttribs("td", { "class": "game_info" }),
            board,
            tmp2,
            color2;

        gameSection.appendChild(topTable);
        topTable.appendChild(topTableTb);

        // movesTable
        this.movesDiv = this.createWithAttribs("div", { "class": "move_list" });
        this.movesDiv.id = this.divId + "_board_moves";
        gameSection.appendChild(this.movesDiv);

        topTableTb.appendChild(document.createElement("tr")).
                appendChild(boardTd);
        topTableTb.appendChild(document.createElement("tr")).
                appendChild(btnTd);
        topTableTb.appendChild(document.createElement("tr")).
                appendChild(btnTdNext);
        topTableTb.appendChild(document.createElement("tr")).
                appendChild(propsTd);

        board = this.drawBoard();

        boardFrame.appendChild(gameSection);
        boardTd.appendChild(board);

        this.populatePieces();
        if (this.opts.flipped) {
            this.flipBoard();
        }
        this.populateProps(propsTd);
        this.populateMoves(this.movesDiv);

        this.createButtonBar(btnTd);

        // current move
        // it is initialized in updateMoveInfo
        this.moveInput = this.addTextElement(btnTdNext, "p",
            { "class": "current_move_box" });
        // end of current move

        this.updateMoveInfo(this);
        this.toggleMoves(this.opts.showMovesPane);	//picks up pane overflow
        if (this.opts.skipToMove) {
            try {
                tmp2 = parseInt(this.opts.skipToMove, 10);
                if (tmp2 > 2) {
                    color2 = tmp2 % 2 === 0 ? 1 : 0;
                    tmp2 = Math.round(tmp2 / 2);
                    this.skipToMove(tmp2 - 1, color2);
                } else if (tmp2 === 1) {
                    this.skipToMove(0, 0);
                } else if (tmp2 === 2) {
                    this.skipToMove(0, 1);
                }
            } catch (e) {}
        }
    },
    /**
     *	This sets up the default option list
     */
    setDefaultOptions:  function () {
        "use strict";
        var options = {
                flipped:		false,
                showMovesPane:	true,
                showComments:	true,
                markLastMove:	true,
                altRewind:		"Rewind to the beginning",
                altBack:		"One move back",
                altFlip:		"Flip the board",
                altShowMoves:	"Show moves pane",
                altComments:	"Show comments",
                altPlayMove:	"Play one move",
                altFastForward:	"Fast-forward to the end",
                altUp:			"Go up one variation",
                altDown:		"Go down into variation",
                downloadURL:	"http://www.chesspastebin.com/asPgn.php?PGN=",
                skipToMove:		null
            };
        return options;
    },
    /**
     * Creates the board in HTML. Puts together a table of the squares, labels
     * them, and returns it.
     *
     *  SIDE EFFECT: this also stores the table cells created for the board in
     *  the pos array (class attribute) in the order they were created: with
     *  [0,0] being a8, [0,1] being b8, etc.
     *
     * @return  {HTMLTableElement}  The game board display.
     */
    drawBoard:  function () {
        "use strict";
        var board = this.createWithAttribs("table", { "class": "gameboard" }),
            whiteC = 'light_square',
            blackC = 'dark_square',
            i,
            j,
            attributes,
            tr,
            td,
            flip;

        this.displayBoard = document.createElement("tbody");
        board.appendChild(this.displayBoard);

        for (i = 0; i < 8; i += 1) {
            tr = document.createElement("tr");
            flip = (i % 2) ? 1 : 0;
            for (j = 0; j < 8; j += 1) {
                attributes = {};
                attributes["class"] = !flip ? (j % 2) ? blackC : whiteC :
                        (j % 2) ? whiteC : blackC;
                attributes["data-squarename"] = this.file[j] + (8 - i);
                td = this.createWithAttribs("td", attributes);

                this.pos[i][j] = td;
                tr.appendChild(td);
            }
            this.displayBoard.appendChild(tr);
        }
        return board;
    },
    createButtonBar:    function (theContainer) {
        "use strict";
        var theBoard = this,
            theButton;

        theButton = this.makeButton(theContainer, "rwind", "altRewind");
        theButton.onclick = function () {
            theBoard.startPosition();
            return false;
        };
        theButton = this.makeButton(theContainer, "back", "altBack");
        theButton.onclick = function () {
            theBoard.makeBwMove();
            return false;
        };
        theButton = this.makeButton(theContainer, "up", "altUp", true);
        theButton.onclick = function () {
            return false;
        };
        theButton = this.makeButton(theContainer, "flip", "altFlip");
        theButton.onclick = function () {
            theBoard.flipBoard();
            return false;
        };
        theButton = this.makeButton(theContainer, "toggle", "altShowMoves");
        theButton.onclick = function () {
            theBoard.toggleMoves("flip");
            return false;
        };
        theButton = this.makeButton(theContainer, "comments", "altComments");
        theButton.onclick = function () {
            theBoard.toggleComments("flip");
            return false;
        };
        theButton = this.makeButton(theContainer, "down", "altDown", true);
        theButton.onclick = function () {
            return false;
        };
        theButton = this.makeButton(theContainer, "forward", "altPlayMove");
        theButton.onclick = function () {
            theBoard.makeMove();
            return false;
        };
        theButton = this.makeButton(theContainer, "ffward", "altFastForward");
        theButton.onclick = function () {
            theBoard.endPosition();
            return false;
        };
    },
    makeButton: function (btnContainer, btnName, btnTitle, disabled) {
        "use strict";
        var button = this.createWithAttribs("a",
            { "class": btnName + (disabled ? ' disabled' : '') });

        button.href = "#";
        button.alt = this.opts[btnTitle];
        button.title = this.opts[btnTitle];
        button.innerHTML = "&nbsp;";
        btnContainer.appendChild(button);

        return button;
    },
    /**
     *	Flips the board to display it from the other side's POV.
     */
    flipBoard:  function () {
        "use strict";
        var upper,
            lower,
            hold = [],
            i,
            j;

        this.deMarkLastMove(true);
        this.flipped = !this.flipped;
        for (i = 0; i < 8; i += 1) {
            for (j = 0; j < 4; j += 1) {
                upper = this.pos[i][j];
                lower = this.pos[7 - i][7 - j];

                hold.squarename = upper.getAttribute('data-squarename');
                hold.symbol = upper.getAttribute('data-symbol');
                hold.title = upper.title;

                upper.setAttribute('data-squarename',
                        lower.getAttribute('data-squarename'));
                upper.setAttribute('data-symbol',
                        lower.getAttribute('data-symbol'));
                upper.title = lower.title;

                lower.setAttribute('data-squarename', hold.squarename);
                lower.setAttribute('data-symbol', hold.symbol);
                lower.title = hold.title;
            }
        }
    },
    /**
     *	Rolls the board position to a specific ply (half-move).
     *
     *	moveNumber		The move number in the game to set the position to
     *	color			Which ply? 0=white, 1=black
     *
     *	NOTE: the +1 in the ply calculation is because the computer is
     *          0-based while the move list, like all human lists, is 1-based.
     *
     *	TODO: This whole thing appears off by one. give it "41" and it skips
     *          to move 42. Needs to be re-examined after testing is complete.
     */
    skipToMove: function (moveNumber, color) {
        "use strict";
        var ply = moveNumber * 2 + color;

        this.conv.setCurMoveNo(ply);
        this.makeMove(true);
        this.updateMoveInfo();
        this.updateMovePane();
        this.deMarkLastMove();
        this.markLastMove();
    },
    /**
     *	Jumps the board all the way to the final position of the game
     */
    endPosition:    function () {
        "use strict";
        var vBoard = this.conv.getEndPos(this.flipped);

        this.deMarkLastMove();
        this.syncBoard(vBoard);
        this.conv.resetToEnd();
        this.updateMoveInfo();
        this.updateMovePane();
        this.markLastMove();
    },
    /**
     *	Jumps the board all the way to the starting position of the game
     */
    startPosition:  function () {
        "use strict";
        var vBoard = this.conv.getStartPos(this.flipped);

        this.deMarkLastMove(true);
        this.syncBoard(vBoard);
        this.conv.resetToStart();
        this.updateMoveInfo();
        this.updateMovePane();
    },
    /**
     *	Backs up by one move.
     */
    makeBwMove: function (update) {
        "use strict";
        var move = this.conv.prevMove();

        if (move === null) {
            return;
        }

        if (update === undefined || update) {
            this.deMarkLastMove(true);
            this.markLastMove();
            this.updateMoveInfo();
            this.updateMovePane();
        }
        this.drawFEN(this.conv.getPrevPosition());
    },
    markLastMove:   function () {
        "use strict";
        var move,
            piece;
        if (!this.opts.markLastMove) {
            return;
        }
        try {
            move = this.conv.moves[this.conv.iteIndex - 1].actions[1];
            piece = this.pos[move.x][move.y];
            if (this.flipped) {
                piece = this.pos[7 - move.x][7 - move.y];
            }
            // on konq the bg contains "initial initial initial "
            // i guess xtra information. Anyways setting the
            // background to a color containing the "initial"
            // parts fails. Go figure
            this.lastSquare = piece;
        } catch (e) {}
    },
    deMarkLastMove: function (update) {
        "use strict";
        var move = this.conv.moves[this.conv.iteIndex - 2],
            piece;

        if (arguments.length && update) {
            move = this.conv.moves[this.conv.iteIndex - 1];
        }

        if (this.conv.iteIndex + 1 === this.conv.moves.length) {
            move = this.conv.getCurMove();
        }

        if (move) {
            move = move.actions[1];

            piece = this.pos[move.x][move.y];
            if (this.flipped) {
                piece = this.pos[7 - move.x][7 - move.y];
            }
        }
        if (this.lastSquare && this.lastSquare.lastBg) {
            this.lastSquare = null;
        }
    },
    /*
        Shows moves pane, depending the 'flag'.
    */
    toggleMoves:    function (flag) {
        "use strict";
        if (flag === "flip") {
            flag = this.movesDiv.style.visibility === "hidden";
        }
        if (flag) {
            this.movesDiv.style.display = "block";
            this.movesDiv.style.visibility = "visible";
        } else {
            this.movesDiv.style.display = "none";
            this.movesDiv.style.visibility = "hidden";
        }
    },
    /*
     *	Toggles the display of comments inside the move list on and off
     */
    toggleComments: function (flag) {
        "use strict";
        var list = this.movesDiv.getElementsByTagName("span"),
            i;

        if (flag === "flip") {
            flag = !this.opts.showComments;
        }
        if (flag) {
            this.opts.showComments = true;
        } else {
            this.opts.showComments = false;
        }
        if (list) {
            for (i = 0; i < list.length; i += 1) {
                if (flag) {
                    list[i].style.display = "inline";
                } else {
                    list[i].style.display = "none";
                }
            }
        }
    },
    /*
     *	Updates the form input box below the board display
     *
     *	TODO: Revise this code into something more browser-friendly.
     *			A simple classed p element or perhaps a cite
     *	TODO: Also check the first line. Something smells about that
     */
    updateMoveInfo: function () {
        "use strict";
        var idx = this.conv.getCurMoveNo() - 1,
            move = this.conv.moves[idx],
            str;

        if (move && move.moveStr) {
            str = Math.floor((idx === 0 ? 1 : idx) / 2 + 1) +
                    ". " + move.moveStr;
            this.moveInput.data = str;
        } else {
            this.moveInput.data = "...";
        }
    },
    /**
     *	This makes the next move in the game, and optionally updates the
     *	display.
     *
     *	@param  {boolean}   should displays be updated. Default true
     */
    makeMove:   function (update) {
        "use strict";
        var move = this.conv.nextMove();

        if (move === null) {
            return;
        }
        if (update === undefined || update) {
            this.deMarkLastMove();
            this.markLastMove();

            this.updateMoveInfo();
            this.updateMovePane();
        }
        this.drawFEN(move.position);
    },
    /**
     *	This makes the currently shown move Bold. (And yes, it uses the b
     *  element because the move is neither emphasized nor strong when read,
     *  it's simply a different indicator, in keeping with the HTML5 spec.
     *
     */
    updateMovePane: function () {
        "use strict";
        // highlight the move in the move's pane
        var idx = this.conv.getCurMoveNo();
        this.deMakeBold(this.lastBold);
        this.lastBold = null;
        this.lastBoldIdx = null;
        if (this.movesOnPane[idx - 1]) {
            this.makeBold(this.movesOnPane[idx - 1]);
            this.lastBold = this.movesOnPane[idx - 1];
            this.lastBoldIdx = idx - 1;
        }
    },
    /**
     *	This highlights the current move by giving it the "current_move" class
     *
     *	el		The current move element
     */
    makeBold:   function (el) {
        "use strict";
        el.className += " current_move";
    },
    /**
     *	This removes the current_move class
     *
     *	el		The no longer current move element
     */
    deMakeBold: function (el) {
        "use strict";
        if (el === null) { return; }

        el.className = el.className.replace(/\bcurrent_move\b/, "").trim();
    },
    drawEnPassante: function (move) {
        "use strict";
        var x = move.enP === null ? null : move.enP.x,
            y = move.enP === null ? null : move.enP.y,
            sq = move.enP === null ? null : this.pos[x][y];

        if (move.enP === null) {
            return;
        }
        if (this.flipped) {
            x = 7 - x;
            y = 7 - y;
        }

        sq.color = "black";
        sq.piece = "empty";

        this.updateSquare(sq, sq.piece, sq.color);
    },
    /**
     * performs the desired action on the square. If piece is null, the square
     * be empty.
     *
     * @param   {Object}    A MySquare Object, describing the result.
     */
    drawSquare: function (square) {
        "use strict";
        var x = square.x,
            y = square.y,
            sq = this.pos[x][y];

        if (this.flipped) { sq = this.pos[7 - x][7 - y]; }

        sq.color = square.color || "black";
        sq.piece = square.piece || "empty";

        this.updateSquare(sq, sq.piece, sq.color);
    },
    updatePGNInfo:  function () {
        "use strict";
        this.visuals.pgn.players.nodeValue = this.gameOpponents();

        this.visuals.pgn.elos.nodeValue = this.conv.pgn.props.WhiteElo || " ";
        this.visuals.pgn.elos.nodeValue += " - ";
        this.visuals.pgn.elos.nodeValue += this.conv.pgn.props.BlackElo || " ";

        this.visuals.pgn.event.nodeValue = this.conv.pgn.props.Event || " ";
        this.visuals.pgn.event.nodeValue += ", ";
        this.visuals.pgn.event.nodeValue += this.conv.pgn.props.Date || " ";
        this.visuals.pgn.timecontrol.nodeValue =
                this.conv.pgn.props.TimeControl || " ";
    },
    /*
     * Draw the board with all the pieces in the initial
     * position
    */
    populatePieces: function () {
        "use strict";
        var r,
            f,
            p;

        for (r = 0; r < 8; r += 1) {
            for (f = 0; f < 8; f += 1) {
                p = this.conv.initialBoard[r][f];
                this.pos[r][f].piece = p.piece || "empty";
                this.pos[r][f].color = p.color || "black";
                this.updateSquare(this.pos[r][f], this.pos[r][f].piece,
                    this.pos[r][f].color);
            }
        }
    },
    /*
     *	This creates the text and elements in the move list
     */
    populateMoves:  function (cont) {
        "use strict";
        var tmp2 = this.conv.pgn.moves,
            movesHeader = document.createElement('header'),
            h = document.createElement("h1"),
            link,
            lastMoveIdx = 0,
            comment,
            moveList = document.createElement("p"),
            i,
            txt;

        if (!this.opts.showMovesPane) {
            cont.style.visibility = "hidden";
            cont.style.display = "none";
        }

        h.appendChild(document.createTextNode(this.gameOpponents()));
        h.appendChild(document.createTextNode(" ("));
        h.appendChild(this.addPGNLink(this.pgn.pgnOrig));
        h.appendChild(document.createTextNode(")"));
        movesHeader.appendChild(h);
        cont.appendChild(movesHeader);
        cont.appendChild(moveList);
        this.addComment(this.pgn.gameIntro, moveList);

        for (i = 0; i < tmp2.length; i += 1) {
            if (tmp2[i].white !== null) {
                moveList.appendChild(this.addMoveNumber((i +
                        this.conv.startMoveNum)));
                link = this.addMoveLink(tmp2[i].white, i, 0);
                moveList.appendChild(link);
                comment = this.conv.pgn.getComment(tmp2[i].white, lastMoveIdx);
                this.addComment(comment[0], moveList);
                this.movesOnPane[this.movesOnPane.length] = link;
            }

            if (tmp2[i].black !== null) {
                moveList.appendChild(document.createTextNode(" "));
                link = this.addMoveLink(tmp2[i].black, i, 1);
                moveList.appendChild(link);
                comment = this.conv.pgn.getComment(tmp2[i].black, lastMoveIdx);
                this.addComment(comment[0], moveList);
                this.movesOnPane[this.movesOnPane.length] = link;
            }
        }
        if (this.conv.pgn.props.Result !== undefined) {
            txt = document.createTextNode("  " + this.conv.pgn.props.Result);
            tmp2 = this.createWithAttribs("span", { "class": "result" });
            tmp2.appendChild(txt);
            moveList.appendChild(tmp2);
            this.movesOnPane[this.movesOnPane.length] = tmp2;
        }
        this.addComment(this.pgn.postGame, moveList);
    },
    /*
     * This fills in information about the game in the designated container
     */
    populateProps:  function (container) {
        "use strict";

        // white - black;
        this.visuals.pgn.players = this.addTextElement(container, "p",
                { "class": "players" });

        // ELO
        this.visuals.pgn.elos = this.addTextElement(container, "p",
                { "class": "elo" });

        // Date 
        this.visuals.pgn.event = this.addTextElement(container, "p",
                { "class": "game_date" });

        // Time control
        this.visuals.pgn.timecontrol = this.addTextElement(container, "p",
                { "class": "time_control" });

        this.updatePGNInfo();
    },
    addTextElement:  function (container, element, attributes) {
        "use strict";
        var theElement = this.createWithAttribs(element, attributes),
            child = document.createTextNode("&nbsp;");

        theElement.appendChild(child);
        container.appendChild(theElement);
        return child;
    },
    createWithAttribs:   function (element, attributes) {
        "use strict";
        var theElement = document.createElement(element),
            attribute;

        for (attribute in attributes) {
            if (attributes.hasOwnProperty(attribute)) {
                theElement.setAttribute(attribute, attributes[attribute]);
            }
        }
        return theElement;
    },
    /**
     * This method will update the img element passed to it with the new piece
     */
    updateSquare:  function (square, piece, color) {
        "use strict";
        var thePiece;

        if (piece && piece !== "empty") {
            square.title = color + "_" + piece;
        } else {
            square.title = "empty";
        }
        if (color === 'black') {
            thePiece = piece.toLowerCase();
        } else {
            thePiece = piece.toUpperCase();
        }
        if (piece === 'knight') {
            square.setAttribute("data-symbol", thePiece.charAt(1));
        } else if (piece === "empty") {
            square.setAttribute("data-symbol", " ");
        } else {
            square.setAttribute("data-symbol", thePiece.charAt(0));
        }
        return;
    },
    /**
     * This synchronizes the display board with the virtual board when you jump
     *  to a position without moving to it.
     */
    syncBoard:  function (result) {
        "use strict";
        var i,
            j;

        for (i = 0; i < 8; i += 1) {
            for (j = 0; j < 8; j += 1) {
                this.syncSquare(result[i][j], this.pos[i][j]);
            }
        }
    },
    /**
     * This copies the contents of one square to another. It removes any
     * piece image (or anything else) attached to the destination square,
     * and attaches the piece image from the source square.
     */
    syncSquare: function (from, to) {
        "use strict";
        to.piece = from.piece || "empty";
        to.color = from.color || "black";

        this.updateSquare(to, to.piece, to.color);
    },
    /**
     *	This adds a comment, if present to the output stream. The curly braces
     *  are removed for humman readability.
     */
    addComment: function (theComment, moveList) {
        "use strict";
        var commentElement =
            this.createWithAttribs("span", { "class": "commentary" });
        if (theComment === null) {
            return;
        }

        theComment = theComment.replace(/[\{\}]/g, ' ');
        if (!this.opts.showComments) {
            commentElement.style.display = "none";
        }
        commentElement.appendChild(document.createTextNode(theComment));
        moveList.appendChild(commentElement);
    },
    /**
     *	Creates a download link for the original pgn data file
     */
    addPGNLink: function (pgn) {
        "use strict";
        var pgnLink = document.createElement("a");

        pgnLink.href = this.opts.downloadURL + encodeURIComponent(pgn);
        pgnLink.appendChild(document.createTextNode("PGN"));

        return pgnLink;
    },
    /**
     *	Lists opponents
     */
    gameOpponents:  function () {
        "use strict";
        var white,
            black;

        white = this.conv.pgn.props.White || 'Unknown';
        black = this.conv.pgn.props.Black || 'Unknown';

        return white + ' - ' + black;
    },
    /**
     *	Creates move number node
     */
    addMoveNumber:  function (moveNumber) {
        "use strict";
        var theElement =
            this.createWithAttribs("span", { "class": "move_numbers" });

        theElement.appendChild(document.createTextNode(
            " " + moveNumber + ". "
        ));
        return theElement;
    },
    /**
     *	Adds move link text
     */
    addMoveLink:    function (moveText, moveNumber, color) {
        "use strict";
        var link = this.createWithAttribs("a", {"class": "move"}),
            theBoard = this;
        link.appendChild(document.createTextNode(moveText));
        link.href = '#';
        link.onclick = theBoard.clickMove;
        link.setAttribute("data-moveNumber", moveNumber);
        link.setAttribute("data-color", color);
        link.setAttribute("data-id", this.id);
        return link;
    },
    /**
     *	Returns the current position in Forsythe notation.
     */
    getForsytheFromDisplay: function () {
        "use strict";
        var position = "/",
            empty,
            rank,
            files,
            file,
            piece,
            ranks = this.displayBoard.childNodes;	// all child nodes are tr's

        function addEmpties() {
            if (empty > 0) {
                position = position + empty;
                empty = 0;
            }
        }
        for (rank = 0; rank < 8; rank += 1) {
            empty = 0;
            files = ranks[rank].childNodes;		// all child nodes are td's
            for (file = 0; file < 8; file += 1) {
                piece = files[file].getAttribute('data-symbol');
                if (piece !== " ") {
                    addEmpties();
                    position = position + piece;
                } else {
                    empty += 1;
                }
            }
            addEmpties();
            position = position + "/";
        }

        return position.slice(1, -1);	// Remove the first and last slash
    },
    clickMove:  function (e) {
        "use strict";
        var moveNumber =
                parseInt(e.currentTarget.getAttribute("data-moveNumber"), 10),
            color = parseInt(e.currentTarget.getAttribute("data-color"), 10),
            myId = parseInt(e.currentTarget.getAttribute("data-id"), 10);
        e.preventDefault();
        window[myId].skipToMove(moveNumber, color);
        return false;
    },
    /**
     * Given a FEN, create it on the output position.
     *
     * @param   {string}    The FEN string
     */
    drawFEN:    function (theFEN) {
        "use strict";
        var vBoard = new VBoard(theFEN),
            rank = 0,
            file = 0,
            square,
            thePiece;

        for (rank = 0; rank < 8; rank += 1) {
            for (file = 0; file < 8; file += 1) {
                square = this.pos[rank][file].getAttribute("data-squarename");
                thePiece = vBoard.whatsOn(square);
                this.updateSquare(this.pos[rank][file], thePiece.piece,
                    thePiece.color);
            }
        }
    }
};

