var MarshallPGN = MarshallPGN || {};
/**
 * @classdesc   This is the controller for the game. It sets up the board,
 * pulls in the data, and starts everything off.
 *
 * @constructor
 * @param   {object} pgn The pgn data
 *
 * @property {object}	pgn				- The pgn data object
 * @property {array}	vBoard			- Virtual Board
 * @property {array}	initialBoard	- Staring board
 * @property {boolean}	whiteToMove		- boolean flag
 * @property {integer}	startMoveNum	- starting move number
 *
 * @version 1.0.0
 * @author Toomas Ršmer
 * @author Arlen P Walker
 * @copyright 2008 Toomas Ršmer
 * @copyright 2012 Arlen P Walker (some portions)
 * @license http://www.apache.org/licenses/LICENSE-2.0
 **/
MarshallPGN.Game = function (sourceDiv, options) {
	"use strict";
	var property,
	    toEmpty,
        givenOptions = options || {};

    this.sourceDiv = document.getElementById(sourceDiv);
	this.pgn = new MarshallPGN.Pgn(this.sourceDiv.getAttribute("data-pgn") ||
	    this.sourceDiv.firstChild.nodeValue);
	this.vBoard = new MarshallPGN.VBoard(this.pgn.props.FEN);
	this.initialBoard = new MarshallPGN.VBoard(this.pgn.props.FEN);
	this.convert();

	this.opts = this.setDefaultOptions();
	for (property in givenOptions) {
	    if (givenOptions.hasOwnProperty(property) &&
	            this.opts.hasOwnProperty(property)) {
	        this.opts[property] = givenOptions[property];
	    }
	}
	if (this.opts.reload) {
	    toEmpty = document.getElementById(sourceDiv +
	        (this.sourceDiv.hasAttribute("data-pgn") ? "" : "_board"));
	    while (toEmpty.firstChild) {
	        toEmpty.removeChild(toEmpty.firstChild);
	    }
	}

    this.board = new MarshallPGN.Board(this.initialBoard, this.pgn,
        sourceDiv + (this.sourceDiv.hasAttribute("data-pgn") ? "" : "_board"),
        this.opts);
};
MarshallPGN.Game.prototype = {
    sourceDiv:          null,
    pgn:                null,
	whiteToMove:		true,
	startMoveNum:		1,
	displayStart:       null,
    /**
     *	This sets up the default option list
     *
     * @return  {object}    All of the options, set to default values
     */
    setDefaultOptions:  function () {
        "use strict";
        var options = {
                flipped:		false,
                showMovesPane:	true,
                showComments:	true,
                gameTitle:      null,
                diagramTitle:   null,
                showDiagramTitle:   true,
                showGameInfo:   true,
                reload:         false,
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
	 * Adds enough information to the existing move tree so that it can
	 * be used to walk through a game forwards or back.
	 **/
    convert:	function () {
        "use strict";
        var move = this.pgn.moveTree.next;

        this.pgn.moveTree.position = this.vBoard.getFEN();
        this.convertLine(this.vBoard, move);
    },
    /**
     *  Sets a line up to be replayed. This is called recursively whenever a
     *  new variation is encountered.
     *
     * @param   {Object}    board   The Virtual Board with current position
     * @param   {Object}    move    The move object that starts the variation
     */
    convertLine:        function (board, move) {
        "use strict";
        var variation;
        while (move !== null) {
            this.convertMove(board, move);
            if (move.down !== null) {
                if (move.previous) {
                    variation = new MarshallPGN.VBoard(move.previous.position);
                } else {
                    if (move.up) {
                        variation = new MarshallPGN.VBoard(move.goTop().
                            previous.position);
                    }
                }
                this.convertLine(variation, move.down);
            }
            move = move.next;
        }
    },
    /**
     *  Analyzes and completes the information necessary to recreate a position
     *
     * @param   {Object}    board   The Virtual Board with the current position
     * @param   {Object}    move    The move object from the move tree
     */
    convertMove:	function (board, move) {
        "use strict";
        var from,
            parsed,
            thePiece,
            theMove,
            theSource,
            isCapture = false,
            theDestination,
            promotedTo,
            theNotes,
            newPiece;

        parsed = move.text.match(
            new RegExp("O-O-O|O-O|0-0|0-0-0|([NBRQK]?)" +   // Piece (castling)
                "([a-h]?[1-8]?)" +                          // from or to
                "(x)?" +                                    // Capture made
                "([a-h][1-8])?" +                           // to if not before
                "=?([NBRQ]?)" +                             // Promoted to
                "([+#!?]*)"                                 // Move Annotations
                )
        );
        theMove = parsed[0];
        thePiece = parsed[1];
        if (parsed[4]) {
            theSource = parsed[2];
            theDestination = parsed[4];
        } else {
            theSource = "";
            theDestination = parsed[2];
        }
        isCapture = parsed[3] === "x" ? true : false;
        promotedTo = parsed[5] || "";
        theNotes = parsed[6];

        switch (theMove) {
        case "O-O":
        case "0-0":
            board.place(move.color === "black" ? "k" : "K",
                move.color === "black" ? "g8" : "g1");
            board.clear(move.color === "black" ? "e8" : "e1");
            thePiece = "R";
            from = move.color === "black" ? "h8" : "h1";
            theDestination = move.color === "black" ? "f8" : "f1";
            break;
        case "O-O-O":
        case "0-0-0":
            board.place(move.color === "black" ? "k" : "K",
                move.color === "black" ? "c8" : "c1");
            board.clear(move.color === "black" ? "e8" : "e1");
            thePiece = "R";
            from = move.color === "black" ? "a8" : "a1";
            theDestination = move.color === "black" ? "d8" : "d1";
            break;
        default:
            switch (thePiece) {
            case "N":
            case "B":
            case "Q":
            case "R":
                from = board.findFromPiece(thePiece, theDestination,
                    theSource, move.color);
                break;
            case "K":
                from =
                    board.whereIs(move.color === "white" ? "K" : "k")[0];
                break;
            case "":
                if (theSource.length === 2 && theDestination.length === 2) {
                    from = theSource;
                } else {
                    from = board.findFromPawn(theDestination, theSource,
                        move.color, isCapture);
                }
                break;
            default:
                throw ("Can't figure out which piece to move '" +
                    move.text + "'");
            }
        }
        promotedTo =
            move.color === "black" ? promotedTo.toLowerCase() : promotedTo;
        newPiece =
            promotedTo === "" ? board.whatsOn(from).symbol : promotedTo;
        board.place(newPiece, theDestination);
        board.clear(from);

        move.position = board.getFEN();
    }
};
