var MarshallPGN = MarshallPGN || {};
/**
 * @classdesc   The display board. Interaction with the user starts and
 *  ends here
 *
 * @constructor
 * @param {string}  sourceID    The ID of the div to put the board inside
 * @param {object}  options     The configuration options for the board
 *
 * @property {object}	pgn			- The game score object
 * @property {object}	opts		- Configuration options
 * @property {object}	game		- The Game object (parent)
 * @property {boolean}	flipped		- White or Black (true) on top
 * @property {string}	id			- GUID
 * @property {object}	visuals		- Object containing on-screen elements
 * @property {object}	displayBoard - Parent element for the board squares
 * @property {array}	pos			- array of table cells in display (a8-h1)
 * @property {object}	currentMove - Currently displayed move
 *
 * @version 1.0.0
 * @author Toomas R&#246;mer
 * @author Arlen P Walker
 * @copyright 2008 Toomas R&#246;mer
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
**/
MarshallPGN.Board = function (initialPosition, pgn, sourceID, options) {
	"use strict";
	var i,
        gameSection = document.getElementById(sourceID);

    this.id = (new Date()).getTime();
	window[this.id] = this;

	this.initialPosition = initialPosition;
	this.pgn = pgn;
	this.sourceID = sourceID;
	this.opts = options;

	this.visuals = { "pgn": {}, "button": {}, "squares": [],
	    "currentMove": null, "moves": [], "gameInfo": null };

	for (i = 0; i < 8; i += 1) {
		this.visuals.squares[i] = [];
	}

    this.movesContainer = this.createWithAttribs("div",
        { "class": "move_list", "id": this.sourceID + "_moves"});
    gameSection.appendChild(this.outputGameHeader());
    gameSection.appendChild(this.createMainboard());
    gameSection.appendChild(this.movesContainer);

    this.outputMoveTree(this.movesContainer);

    this.setCurrentMove(this.pgn.moveTree);
    this.updateMoveInfo(this);
    if (!this.opts.showGameInfo) {
        this.visuals.gameInfo.style.display = "none";
    }
    if (!this.opts.showMovesPane) { this.hideMoves(); }
    if (!this.opts.showComments) { this.hideComments(); }
    if (this.opts.skipToMove) {
        this.setCurrentMove(this.skipTo(this.opts.skipToMove));
        this.displayStart =
            new MarshallPGN.VBoard(this.currentMove.position);
        this.makeMove(this.currentMove);
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
	visuals:        {},
	id:             null,
	currentMove:    null,
    /**
     *  Creates the main panel of the player
     *
     * @return  {HTMLElement}   The panel's container
     */
    createMainboard:    function () {
        "use strict";
        var gameSummary =
                this.createWithAttribs("section", { "class": "mainboard" });

        gameSummary.appendChild(this.drawBoard(this.initialPosition));
        if (this.opts.flipped) { this.flipBoard(); }

        gameSummary.appendChild(this.createButtonBar());
        this.visuals.currentMove = this.addTextElement(gameSummary, "p",
            { "class": "current_move_box" });
        gameSummary.appendChild(this.createGameInfo());

        return gameSummary;
    },
    /**
     * Creates the board in HTML. Puts together a table of the squares, labels
     * them, and returns it.
     *
     *  SIDE EFFECT: this also stores the table cells created for the board in
     *  the this.visuals.squares array (class attribute) in the order they were
     *  created: with [0,0] being a8, [0,1] being b8, etc.
     *
     * @param   {string}    title   The title (default is opponents)
     * @return  {HTMLTableElement}  The game board display.
     */
    drawBoard:  function (position) {
        "use strict";
        var board = this.createWithAttribs("table", { "class": "gameboard" }),
            whiteC = 'light_square',
            blackC = 'dark_square',
            file = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            r,
            f,
            attributes,
            tr,
            td,
            piece,
            flip;

        this.visuals.pgn.boardCaption = this.addTextElement(board,
            "caption", { "class": "players" });
        this.displayBoard = document.createElement("tbody");
        board.appendChild(this.displayBoard);

        for (r = 0; r < 8; r += 1) {
            tr = document.createElement("tr");
            flip = (r % 2) ? 1 : 0;
            for (f = 0; f < 8; f += 1) {
                attributes = {};
                attributes["class"] = !flip ? (f % 2) ? blackC : whiteC :
                        (f % 2) ? whiteC : blackC;
                attributes["data-squarename"] = file[f] + (8 - r);
                td = this.createWithAttribs("td", attributes);

                this.visuals.squares[r][f] = td;
                tr.appendChild(td);

                piece = position.whatsOn(attributes["data-squarename"]);
                this.updateSquare(this.visuals.squares[r][f],
                    piece.piece || "empty", piece.color || null);
            }
            this.displayBoard.appendChild(tr);
        }
        return board;
    },
    /**
     * Creates the row of control buttons under the board
     *
     * @return  {HTMLElement}   Parent of the buttons
     */
    createButtonBar:    function () {
        "use strict";
        var buttonBar =
                this.createWithAttribs("p", { "class": "board_controls" }),
            theBoard = this;

        this.visuals.button.rewind = this.makeButton(buttonBar, "rwind",
            "altRewind", false, function (e) {
                theBoard.makeMove.apply(theBoard,
                    [theBoard.currentMove.goStart.apply(
                        theBoard.currentMove
                    )]);
                e.preventDefault();
                return false;
            });
        this.visuals.button.back = this.makeButton(buttonBar, "back",
            "altBack", false, function (e) {
                theBoard.makeMove.apply(theBoard,
                    [theBoard.currentMove.previous]);
                e.preventDefault();
                return false;
            });
        this.visuals.button.up = this.makeButton(buttonBar, "up",
            "altUp", true, function (e) {
                theBoard.makeMove.apply(theBoard,
                    [theBoard.currentMove.up || theBoard.currentMove]);
                e.preventDefault();
                return false;
            });
        this.visuals.button.flip = this.makeButton(buttonBar, "flip",
            "altFlip", false, function (e) {
                theBoard.flipBoard();
                e.preventDefault();
                return false;
            });
        this.visuals.button.toggleMoves = this.makeButton(buttonBar,
            "toggle", "altShowMoves", false, function (e) {
                theBoard.toggleMoves();
                e.preventDefault();
                return false;
            });
        this.visuals.button.toggleComments = this.makeButton(buttonBar,
            "comments", "altComments", false, function (e) {
                theBoard.toggleComments();
                e.preventDefault();
                return false;
            });
        this.visuals.button.down = this.makeButton(buttonBar, "down",
            "altDown", true, function (e) {
                theBoard.makeMove.apply(theBoard,
                    [theBoard.currentMove.down || theBoard.currentMove]);
                e.preventDefault();
                return false;
            });
        this.visuals.button.forward = this.makeButton(buttonBar, "forward",
            "altPlayMove", false, function (e) {
                theBoard.makeMove.apply(theBoard, [theBoard.currentMove.next]);
                e.preventDefault();
                return false;
            });
        this.visuals.button.fastforward = this.makeButton(buttonBar,
            "ffward", "altFastForward", false, function (e) {
                theBoard.makeMove.apply(theBoard,
                    [theBoard.currentMove.goEnd.apply(theBoard.currentMove)]);
                e.preventDefault();
                return false;
            });
        return buttonBar;
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
        var button = this.createWithAttribs("button",
            { "class": btnName, "type": "Button"});

        if (disabled) { button.setAttribute("disabled", "disabled"); }
        button.alt = this.opts[btnTitle];
        button.title = this.opts[btnTitle];
        this.addClickListener(button, handler);
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
            button.removeAttribute("disabled");
        } else {
            button.setAttribute("disabled", "disabled");
        }
    },
    /**
     *  Toggles visibility of moves pane.
     */
    toggleMoves:    function () {
        "use strict";
        if (this.movesContainer.style.display === "block" ||
                this.movesContainer.style.display === "") {
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
        this.movesContainer.style.display = "none";
    },
    /**
     *  Show the moves pane
     */
    showMoves:      function () {
        "use strict";
        this.movesContainer.style.display = "block";
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
        var list = this.movesContainer.getElementsByClassName("commentary"),
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
        var list = this.movesContainer.getElementsByClassName("commentary"),
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
     *	@param  {object}   move  The move to make on the board
     */
    makeMove:   function (move) {
        "use strict";
        this.setCurrentMove(move || this.currentMove);
        this.updateMoveInfo(this.currentMove);
        this.highlightCurrentMove(this.currentMove);
        this.drawFEN(this.currentMove.position);
    },
    /**
     *	Highlights the current move in the display. Also, if the current move
     *  is out of the visible scrolling area, it scrolls to it.
     *
     * @param   {Object}    The move that is current
     */
    highlightCurrentMove: function (move) {
        "use strict";
        var i,
            scrollPosition,
            scrollWindow,
            boxHeight = move.link ? move.link.scrollHeight : 0;

        for (i = 0; i < this.visuals.moves.length; i += 1) {
            this.visuals.moves[i].className =
                this.visuals.moves[i].className.replace("current_move", "").
                    trim();
        }

        if (move && move.link) {
            move.link.className += " current_move";
        }
        
        if (move.link) {
            scrollPosition = move.link.offsetTop -
                this.movesContainer.offsetTop;
        } else {
            scrollPosition = 0;
        }
        scrollWindow = this.movesContainer.scrollTop +
            this.movesContainer.offsetHeight;
        if ( scrollPosition + boxHeight > scrollWindow ||
                scrollPosition - boxHeight < this.movesContainer.scrollTop ) {
            this.movesContainer.scrollTop = scrollPosition;
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
            this.opts.gameTitle || this.gameOpponents()).parentNode;
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
     * @return  {HTMLElement}   The container displaying it
     */
    createGameInfo:  function () {
        "use strict";
        this.visuals.gameInfo =
                this.createWithAttribs("section", { "class": "game_info" });

        this.visuals.pgn.event = this.addTextElement(this.visuals.gameInfo,
                "p", { "class": "game_date" });
        this.visuals.pgn.event.nodeValue = this.pgn.props.Event || " ";
        this.visuals.pgn.event.nodeValue += ", ";
        this.visuals.pgn.event.nodeValue += this.pgn.props.Date || " ";

        this.visuals.pgn.timecontrol =
            this.addTextElement(this.visuals.gameInfo, "p",
                { "class": "time_control" }, this.pgn.props.TimeControl || " ");

        this.visuals.pgn.boardCaption.nodeValue = this.opts.showDiagramTitle ?
                    (this.opts.diagramTitle || this.gameOpponents()) : "";

        return this.visuals.gameInfo;
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
        var link = this.createWithAttribs("button",
                {"class": "move", "type": "button"}),
            theBoard = this;
        link.appendChild(document.createTextNode(moveText));
        this.addClickListener(link, function (e) {
            theBoard.makeMove.call(theBoard,
                theBoard.pgn.moveTree.findByLink.call(theBoard.pgn.moveTree,
                    theBoard.pgn.moveTree, e.currentTarget));
            e.preventDefault();
            return false;
        });
        link.setAttribute("data-moveNumber", moveNumber);
        link.setAttribute("data-color", color);
        link.setAttribute("data-id", this.id);
        link.setAttribute("data-fen", fen);
        return link;
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
    },
    addClickListener: function (element, handler) {
        "use strict";
        if (element.addEventListener) {
            element.addEventListener("click", handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("onclick", handler);
        } else {
            element.onclick = handler;
        }
    }
};
