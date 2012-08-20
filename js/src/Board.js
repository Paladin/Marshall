var MarshallPGN = MarshallPGN || {};
/**
 * @classdesc   The display board. Interaction with the user starts and
 *  ends here
 *
 * @constructor
 * @param {string}  divId   The ID of the div to put the board inside
 * @param {object}  options The configuration options for the board
 *
 * @property {object}	pgn			- The game score object
 * @property {object}	opts		- Configuration options
 * @property {string}	divId		- The ID of the board's display element
 * @property {object}	game		- The Game object (parent)
 * @property {boolean}	flipped		- White or Black (true) on top
 * @property {string}	id			- GUID
 * @property {object}	visuals		- Object containing on-screen elements
 * @property {object}	displayBoard - Parent element for the board squares
 * @property {array}	pos			- array of table cells in display (a8-h1)
 * @property {object}	currentMove - Currently displayed move
 *
 * @version 0.7.1
 * @author Toomas R&#246;mer
 * @author Arlen P Walker
 * @copyright 2008 Toomas Ršmer
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
**/
MarshallPGN.Board = function (game, pgn, divId, options) {
	"use strict";
	var i;

    this.id = (new Date()).getTime();
	window[this.id] = this;

	this.game = game;
	this.pgn = pgn;
	this.divId = divId;
	this.opts = options;

	this.visuals = { "pgn": {}, "button": {}, "squares": [],
	    "currentMove": null, "moves": [] };

	for (i = 0; i < 8; i += 1) {
		this.visuals.squares[i] = [];
	}
};
/**
 * Setting up class attributes
 */
MarshallPGN.Board.prototype = {
	flipped:        false,
	moveInput:      null,
	displayBoard:   null,
	pgn:            null,
	pos:            [],
	movesOnPane:    [],
	divId:          null,
	visuals:        {},
	id:             null,
	currentMove:    null,
	/**
	 *  Creates the board and move areas of the page, prepare for replay.
	 */
	init:       function () {
        "use strict";
        // the main frame
        var gameSection = document.getElementById(this.divId),
            topTable =
                this.createWithAttribs("section", { "class": "mainboard" }),
            btnTd = this.createWithAttribs("p", { "class": "board_controls" }),
            propsTd =
                this.createWithAttribs("section", { "class": "game_info" }),
            board,
            gameHeader = this.outputGameHeader();

        gameSection.appendChild(gameHeader);

        gameSection.appendChild(topTable);

        // movesTable
        this.movesDiv = this.createWithAttribs("div", { "class": "move_list" });
        this.movesDiv.id = this.divId + "_moves";
        gameSection.appendChild(this.movesDiv);

        board = this.drawBoard();

        topTable.appendChild(board);
        topTable.appendChild(btnTd);
        this.visuals.currentMove = this.addTextElement(topTable, "p",
            { "class": "current_move_box" });
        topTable.appendChild(propsTd);

        this.populatePieces();
        if (this.opts.flipped) {
            this.flipBoard();
        }
        this.populateProps(propsTd);
        this.outputMoveTree(this.movesDiv);

        this.createButtonBar(btnTd);

	    this.setCurrentMove(this.pgn.moveTree);
        this.updateMoveInfo(this);
        if (!this.opts.showGameInfo) { propsTd.style.display = "none"; }
        if (!this.opts.showMovesPane) { this.hideMoves(); }
        if (!this.opts.showComments) { this.hideComments(); }
        if (this.opts.skipToMove) {
            this.setCurrentMove(this.skipTo(this.opts.skipToMove));
            this.displayStart =
                new MarshallPGN.VBoard(this.currentMove.position);
            this.makeMove(this.currentMove);
        }
    },
    /**
     * Creates the board in HTML. Puts together a table of the squares, labels
     * them, and returns it.
     *
     *  SIDE EFFECT: this also stores the table cells created for the board in
     *  the pos array (class attribute) in the order they were created: with
     *  [0,0] being a8, [0,1] being b8, etc.
     *
     * @param   {string}    title   The title (default is opponents)
     * @return  {HTMLTableElement}  The game board display.
     */
    drawBoard:  function () {
        "use strict";
        var board = this.createWithAttribs("table", { "class": "gameboard" }),
            whiteC = 'light_square',
            blackC = 'dark_square',
            file = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            i,
            j,
            attributes,
            tr,
            td,
            flip;

        this.visuals.pgn.players = this.addTextElement(board,
            "caption", { "class": "players" });
        this.displayBoard = document.createElement("tbody");
        board.appendChild(this.displayBoard);

        for (i = 0; i < 8; i += 1) {
            tr = document.createElement("tr");
            flip = (i % 2) ? 1 : 0;
            for (j = 0; j < 8; j += 1) {
                attributes = {};
                attributes["class"] = !flip ? (j % 2) ? blackC : whiteC :
                        (j % 2) ? whiteC : blackC;
                attributes["data-squarename"] = file[j] + (8 - i);
                td = this.createWithAttribs("td", attributes);

                this.visuals.squares[i][j] = td;
                tr.appendChild(td);
            }
            this.displayBoard.appendChild(tr);
        }
        return board;
    },
    /**
     * Creates the row of control buttons under the board
     *
     * @param   {HTMLElement}   theContainer    Parent of the buttons
     */
    createButtonBar:    function (theContainer) {
        "use strict";
        var theBoard = this;

        this.visuals.button.rewind = this.makeButton(theContainer, "rwind",
            "altRewind", false, function () {
                theBoard.makeMove.apply(theBoard,
                    [theBoard.currentMove.goStart.apply(
                        theBoard.currentMove
                    )]);
                return false;
            });
        this.visuals.button.back = this.makeButton(theContainer, "back",
            "altBack", false, function () {
                theBoard.makeMove.apply(theBoard,
                    [theBoard.currentMove.previous]);
                return false;
            });
        this.visuals.button.up = this.makeButton(theContainer, "up",
            "altUp", true, function () {
                theBoard.makeMove.apply(theBoard,
                    [theBoard.currentMove.up || theBoard.currentMove]);
                return false;
            });
        this.visuals.button.flip = this.makeButton(theContainer, "flip",
            "altFlip", false, function () {
                theBoard.flipBoard();
                return false;
            });
        this.visuals.button.toggleMoves = this.makeButton(theContainer,
            "toggle", "altShowMoves", false, function () {
                theBoard.toggleMoves();
                return false;
            });
        this.visuals.button.toggleComments = this.makeButton(theContainer,
            "comments", "altComments", false, function () {
                theBoard.toggleComments();
                return false;
            });
        this.visuals.button.down = this.makeButton(theContainer, "down",
            "altDown", true, function () {
                theBoard.makeMove.apply(theBoard,
                    [theBoard.currentMove.down || theBoard.currentMove]);
                return false;
            });
        this.visuals.button.forward = this.makeButton(theContainer, "forward",
            "altPlayMove", false, function () {
                theBoard.makeMove.apply(theBoard, [theBoard.currentMove.next]);
                return false;
            });
        this.visuals.button.fastforward = this.makeButton(theContainer,
            "ffward", "altFastForward", false, function () {
                theBoard.makeMove.apply(theBoard,
                    [theBoard.currentMove.goEnd.apply(theBoard.currentMove)]);
                return false;
            });
    },
    /**
     *  Makes an individual button on the bar
     *
     * @param   {HTMLElement}   theContainer    The button container
     * @param   {string}        btnName         Name (used in class)
     * @param   {string}        btnTitle        Title and alt text
     * @param   {boolean}       disabled        Is it disabled?
     * @param   {function}      handler         The click handler
     * @return  {HTMLElement}   The button created
     */
    makeButton: function (btnContainer, btnName, btnTitle, disabled, handler) {
        "use strict";
        var button = this.createWithAttribs("a",
            { "class": btnName + (disabled ? ' disabled' : '') });

        button.href = "#";
        button.alt = this.opts[btnTitle];
        button.title = this.opts[btnTitle];
        button.innerHTML = "&nbsp;";
        button.onclick = handler;
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

        for (i = 0; i < 8; i += 1) {
            for (j = 0; j < 4; j += 1) {
                upper = this.visuals.squares[i][j];
                lower = this.visuals.squares[7 - i][7 - j];

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
     *  The move (e.g., "5b") to start the display with. If no letter is given
     *  it is assumed we will start before White's move of that number.
     *
     * @param   {string}    moveID  The move to skip ahead to.
     * @return  {Object}    The move to skip to.
     */
    skipTo:     function (moveID) {
        "use strict";
        var skipCode = moveID.match(/([0-9]+)([bw]?)/),
            move = this.pgn.moveTree;

        if (skipCode) {
            while (move.next && move.number !== parseInt(skipCode[1], 10)) {
                move = move.next;
            }
            if (move.previous && skipCode[2] !== "b") {
                move = move.previous;
            }
        }
        return move;
    },
    /**
     *  Sets the currentMove (obviously) but also performs various housekeeping
     *  tasks related to that.
     *
     * @param   {object}    move
     */
    setCurrentMove:     function (move) {
        "use strict";
        this.currentMove = move;
        this.setButtonState(this.visuals.button.rewind, move.previous);
        this.setButtonState(this.visuals.button.back, move.previous);
        this.setButtonState(this.visuals.button.down, move.down);
        this.setButtonState(this.visuals.button.up, move.up);
        this.setButtonState(this.visuals.button.forward, move.next);
        this.setButtonState(this.visuals.button.fastforward, move.next);
    },
    /**
     *  Toggles the enabled/disabled appearance of a button based on
     *  availability of the option.
     *
     * @param   {HTMLElement}   button
     * @param   {object}        option  Null is unavailable
     */
    setButtonState :    function (button, option) {
        "use strict";
        if (option !== null) {
            button.className = button.className.replace("disabled").trim();
        } else if (!button.className.match("disabled")) {
            button.className += " disabled";
        }
    },
    /**
     *	Displays the linked board position.
     *
     *	@param  {HTMLElement}   link    The link with the position to display
     */
    displayMove: function (link) {
        "use strict";
        this.setCurrentMove(
            this.pgn.moveTree.findByLink(this.pgn.moveTree, link)
        );

        this.drawFEN(this.currentMove.position);
        this.updateMoveInfo(this.currentMove);
        this.highlightCurrentMove(this.currentMove);
    },
    /**
     *  Toggles visibility of moves pane.
     */
    toggleMoves:    function () {
        "use strict";
        if (this.movesDiv.style.display === "block" ||
                this.movesDiv.style.display === "") {
            this.hideMoves();
        } else {
            this.showMoves();
        }
    },
    /**
     *  Hide moves pane
     */
    hideMoves:      function () {
        "use strict";
        this.movesDiv.style.display = "none";
    },
    /**
     *  Show the moves pane
     */
    showMoves:      function () {
        "use strict";
        this.movesDiv.style.display = "block";
    },
    /*
     *	Toggles the display of comments inside the move list on and off
     */
    toggleComments: function () {
        "use strict";
        this.opts.showComments = !this.opts.showComments;
        if (this.opts.showComments) {
            this.showComments();
        } else {
            this.hideComments();
        }
    },
    /**
     *  Shows the commentary
     */
    showComments:       function () {
        "use strict";
        var list = this.movesDiv.getElementsByClassName("commentary"),
            i;
        if (list) {
            for (i = 0; i < list.length; i += 1) {
                list[i].style.display = "inline";
            }
        }
    },
    /**
     *  Hides the commentary
     */
    hideComments:       function () {
        "use strict";
        var list = this.movesDiv.getElementsByClassName("commentary"),
            i;
        if (list) {
            for (i = 0; i < list.length; i += 1) {
                list[i].style.display = "none";
            }
        }
    },
    /*
     *	Updates the move line below the board display
     */
    updateMoveInfo: function (move) {
        "use strict";
        if (move && move.number) {
            this.visuals.currentMove.data = move.number + ". ";
            this.visuals.currentMove.data +=
                move.color === "black" ? "... " : "";
            this.visuals.currentMove.data += move.text;
        } else {
            this.visuals.currentMove.data = "...";
        }
    },
    /**
     *	This makes the next move in the game, and optionally updates the
     *	display.
     *
     *	@param  {boolean}   update  Should displays be updated? Default true
     */
    makeMove:   function (move, update) {
        "use strict";
        this.setCurrentMove(move || this.currentMove);
        if (update === undefined || update) {
            this.updateMoveInfo(this.currentMove);
            this.highlightCurrentMove(this.currentMove);
        }
        this.drawFEN(this.currentMove.position);
    },
    /**
     *	Highlights the current move in the display 
     *
     */
    highlightCurrentMove: function (move) {
        "use strict";
        var i;

        for (i = 0; i < this.visuals.moves.length; i += 1) {
            this.visuals.moves[i].className =
                this.visuals.moves[i].className.replace("current_move", "").
                    trim();
        }

        if (move && move.link) {
            move.link.className += " current_move";
        }
    },
    /**
     *  Updates the game description
     */
    updatePGNInfo:  function () {
        "use strict";
        var title = this.opts.showDiagramTitle ?
            (this.opts.diagramTitle || this.gameOpponents()) : null;

        this.visuals.pgn.players.nodeValue = title;

        this.visuals.pgn.event.nodeValue = this.pgn.props.Event || " ";
        this.visuals.pgn.event.nodeValue += ", ";
        this.visuals.pgn.event.nodeValue += this.pgn.props.Date || " ";
        this.visuals.pgn.timecontrol.nodeValue =
                this.pgn.props.TimeControl || " ";
    },
    /*
     * Draw the board with all the pieces in the initial
     * position
    */
    populatePieces: function () {
        "use strict";
        var r,
            f,
            p,
            square;

        for (r = 0; r < 8; r += 1) {
            for (f = 0; f < 8; f += 1) {
                square = this.visuals.squares[r][f].
                    getAttribute("data-squarename");
                p = this.game.getStartPos().whatsOn(square);
                this.visuals.squares[r][f].piece = p.piece || "empty";
                this.visuals.squares[r][f].color = p.color || "black";
                this.updateSquare(this.visuals.squares[r][f],
                    this.visuals.squares[r][f].piece,
                    this.visuals.squares[r][f].color);
            }
        }
    },
    /**
     *  Outputs the game header HTML Element
     *
     * @return  {HTMLElement}   Fully set up game header as <header>
     */
    outputGameHeader:   function () {
        "use strict";
        var header = this.createWithAttribs("header", {"class": "clearfix"}),
            title,
            code = this.createWithAttribs("p", {"class": "PGNlink"});

        title = this.addTextElement(header, "h1", {},
            this.opts.gameTitle ||this.gameOpponents()).parentNode;
        code.appendChild(document.createTextNode(" ("));
        code.appendChild(this.addPGNLink(this.pgn.pgnOrig));
        code.appendChild(document.createTextNode(")"));
        header.appendChild(code);
        return header;
    },
    /**
     *  Outputs the move tree wrapped properly in HTML
     *
     * @param   {HTMLElement}   container   The container that holds the moves
     */
    outputMoveTree:     function (container) {
        "use strict";
        var move = this.pgn.moveTree,
            moveList = document.createElement("p");

        if (!this.opts.showMovesPane) {
            container.style.visibility = "hidden";
            container.style.display = "none";
        }

        container.appendChild(moveList);

        this.outputLine(moveList, move);
    },
    /**
     *  Outputs a line, wrapped in HTML (recursive)
     *
     * @param   {HTMLElement}   container   The element to append the moves to
     * @param   {Object}        move        The beginning move of the line
     */
    outputLine:     function (container, move) {
        "use strict";
        var variation;
        while (move !== null) {
            this.outputMove(container, move);
            if (move.down !== null) {
                variation = this.enterVariation(container);
                this.outputLine(variation, move.down);
                this.exitVariation(variation);
            }
            move = move.next;
        }
    },
    /**
     *  Outputs a move, wrapped in HTML, including move number and comments,
     *  if appropriate.
     *
     * @param   {HTMLElement}   container   The container element for the move
     * @param   {object}        move        The move
     */
    outputMove:            function (container, move) {
        "use strict";
        var link,
            i = 0;

        if (move.text !== "...") {
            if (move.color === "white") {
                container.appendChild(this.addMoveNumber(move.number));
            }
            link = this.addMoveLink(move.text, move.number, move.color,
                move.position);
            container.appendChild(link);
            move.link = link;
            this.visuals.moves.push(link);
        }
        while (i < move.commentary.length) {
            this.addComment(move.commentary[i], container);
            i += 1;
        }
    },
    /**
     *  Outputs HTML to enter a variation
     *
     * @param   {HTMLElement}   container   The element to append the moves to
     */
    enterVariation:     function (container) {
        "use strict";
        var variation = this.addTextElement(container, "span",
                {"class": "variation"}, "(").parentNode;
        return variation;
    },
    /**
     *  Outputs HTML to exit a variation
     *
     * @param   {HTMLElement}   container   The element to append the moves to
     */
    exitVariation:      function (container) {
        "use strict";
        container.appendChild(document.createTextNode(")"));
    },
    /*
     * This fills in information about the game in the designated container
     *
     * @param   {HTMLElement}   container   The container displaying it
     */
    populateProps:  function (container) {
        "use strict";

        // Date 
        this.visuals.pgn.event = this.addTextElement(container, "p",
                { "class": "game_date" });

        // Time control
        this.visuals.pgn.timecontrol = this.addTextElement(container, "p",
                { "class": "time_control" });

        this.updatePGNInfo();
    },
    /**
     *  Adds a text element to the container
     *
     * @param   {HTMLElement}   container   The container for the new element
     * @param   {string}        element     The name of the element to create
     * @param   {object}        attributes  Attributes for the created element
     * @param   {string}        text        Optional text to put in element
     * @return  {HTMLElement}   The created element
     */
    addTextElement:  function (container, element, attributes, text) {
        "use strict";
        var theElement = this.createWithAttribs(element, attributes),
            child = document.createTextNode(text || "&nbsp;");

        theElement.appendChild(child);
        container.appendChild(theElement);
        return child;
    },
    /**
     *  Creates a new element and assigns the given attributes to it
     *
     * @param   {string}        element     Name of the element to be created
     * @param   {object}        attributes  Attributes for the created element
     * @return  {HTMLElement}   The created element
     */
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
     * This method will update the square passed to it with the new piece
     *
     * @param   {HTMLElement}   square  The display square to be updated
     * @param   {string}        piece   The name of the piece placed on it
     * @param   {string}        color   The color of the piece
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
     *	This adds a comment, if present to the output stream. The curly braces
     *  are removed for humman readability.
     *
     * @param   {string}    theComment  The comment to add
     * @return  {HTMLElement}   The parent element of the moves
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
     *
     * @param   {string}    pgn The PGN text string
     * @return  {HTMLElement}   The link including PGN text
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
     *
     * @return  {string}    The opponents in the game
     */
    gameOpponents:  function () {
        "use strict";
        var white,
            whiteElo,
            black,
            blackElo;

        white = this.pgn.props.White || 'Unknown';
        whiteElo = this.pgn.props.WhiteElo || null;
        black = this.pgn.props.Black || 'Unknown';
        blackElo = this.pgn.props.BlackElo || null;

        return white + (whiteElo ? " (" + whiteElo + ") - " : " - ") +
            black + (blackElo ? " (" + blackElo + ")" : "");
    },
    /**
     *	Creates move number node
     *
     * @param   {integer}   moveNumber  The number of the move
     * @return  {HTMLElement}   The element of the move number
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
     *
     * @param   {string}        moveText    The text of the move
     * @param   {string}        moveNumber  The move number
     * @param   {string}        color       The color making the move
     * @param   {string}        fen         Description of position after move
     * @return  {HTMLElement}   The link to add to the page
     */
    addMoveLink:    function (moveText, moveNumber, color, fen) {
        "use strict";
        var link = this.createWithAttribs("a", {"class": "move"}),
            theBoard = this;
        link.appendChild(document.createTextNode(moveText));
        link.href = '#';
        link.onclick = function (e) { theBoard.displayMove.
            call(theBoard, e.currentTarget);
            return false;
            };
        link.setAttribute("data-moveNumber", moveNumber);
        link.setAttribute("data-color", color);
        link.setAttribute("data-id", this.id);
        link.setAttribute("data-fen", fen);
        return link;
    },
    /**
     *	Returns the current position in Forsythe notation.
     *
     * @return  {string}    The FEN position
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
    /**
     * Given a FEN, create it on the output position.
     *
     * @param   {string}    The FEN string
     */
    drawFEN:    function (theFEN) {
        "use strict";
        var vBoard = new MarshallPGN.VBoard(theFEN),
            rank = 0,
            file = 0,
            square,
            thePiece;

        for (rank = 0; rank < 8; rank += 1) {
            for (file = 0; file < 8; file += 1) {
                square = this.visuals.squares[rank][file].
                    getAttribute("data-squarename");
                thePiece = vBoard.whatsOn(square);
                this.updateSquare(this.visuals.squares[rank][file],
                    thePiece.piece, thePiece.color);
            }
        }
    }
};
