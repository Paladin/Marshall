(function(){
    var aGame = "[Event \"None\"]" +
        "[Site \"Nowhere\"]" +
        "[Date \"2012.08.20\"]" +
        "[Round \"1\"]" +
        "[White \"U. N. Owen\"]" +
        "[Black \"Anon E. Moose\"]" +
        "[Result \"*\"]" +
        "[PlyCount \"22\"]" +
        "[ECO \"C21\"]" +
        "{A Goring Gambit line}" +
        "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. c3 dxc3 {Black is better advised" +
        " to treat this like a Two Knight's defense:} (4... Nf6 ( 4... Bc5 " +
        "5. Bc4 Nf6 6. cxd4 Bb4+ 7. Nc3 Nxe4 8. O-O) 5. e5 Ne4 6. cxd4) 5. Bc4" +
        " cxb2 6. Bxb2 Bb4+ 7. Nc3 Nf6 8. Qc2 (8. e5 Ne4 (8... Ng5) 9. Qc2)" +
        " 8... O-O 9. O-O-O a6 10. e5 d5 11. exd6 Bxd6  *";

    var puzzle = "[Event \"Dayton\"]" + 
        "[Site \"?\"]" + 
        "[Date \"1890.02.25\"]" + 
        "[Round \"?\"]" + 
        "[White \"Blumenschein, E..\"]" + 
        "[Black \"Smith, W.H..\"]" + 
        "[Result \"*\"]" + 
        "[Annotator \"Reeh,Oliver\"]" + 
        "[SetUp \"1\"]" + 
        "[FEN \"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1\"]" + 
        "[PlyCount \"9\"]" + 
        "[SourceDate \"2009.06.14\"]" + 
        "{In this position White has a beautiful focred mate in five, so answer C) is " + 
        "correct:} 1. Bxg7+ $1 Kxg7 2. Qh6+ $3 {The point - Black's king is dragged " + 
        "into a discovered double-check.} Kxh6 (2... Kh8 3. Bg6+ Kg8 4. Qh7#) 3. Nf5+ " + 
        "Kg5 4. Ne4+ Kg4 5. Rh4# {or 5.Ne3++. This brilliancy was published far more " + 
        "than 100 years ago - in May 1890 on page 155 of International Chess Magazine. " + 
        "(Source: \"A Chess Omnibus\", Edward Winter, Russel Enterprises, Inc., 2003)} *";

    var pgn = { "props": { "White": "", "Black": "" },
        "moveTree": {"text": "...", "commentary": [], "down": null,
        "next": null} };

    describe("Display Board", function () {
        describe("Building the Board", function () {
        	beforeEach(function () {
            /*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */
                var position = new MarshallPGN.VBoard(),
                    options = {"showGameInfo": true, "showMovesPane": true,
                        "showComments": true};
                this.board = new MarshallPGN.Board(position, pgn,
                    "game1_board", options);
        	});
            afterEach(function () {
                var boardDiv = document.getElementById("game1_board");
                while (boardDiv.firstChild) {
                    boardDiv.removeChild(boardDiv.firstChild);
                }
            });
            it(" Should find 32 light squares", function () {
                expect(document.getElementsByClassName("light_square").
                    length).toBe(32);
            });
            it(" Should find a8 as the first light square", function () {
                expect(document.getElementsByClassName("light_square")[0].
                    getAttribute("data-squarename")).toBe("a8");
            });
            it(" Should find h1 as the last light square", function () {
                expect(document.getElementsByClassName("light_square")[31].
                    getAttribute("data-squarename")).toBe("h1");
            });
            it(" Should find 32 dark squares", function () {
                expect(document.getElementsByClassName("dark_square").
                    length).toBe(32);
            });
            it(" Should find b8 as the first dark square", function () {
                expect(document.getElementsByClassName("dark_square")[0].
                    getAttribute("data-squarename")).toBe("b8");
            });
            it(" Should find g1 as the last dark square", function () {
                expect(document.getElementsByClassName("dark_square")[31].
                    getAttribute("data-squarename")).toBe("g1");
            });
            it(" Should find a8 in visuals", function () {
            	expect(document.getElementsByClassName("light_square")[0]).
            	    toBe(this.board.visuals.squares[0][0]);
            });
            it(" Should find g1 in visuals", function () {
            	expect(document.getElementsByClassName("dark_square")[31]).
            	    toBe(this.board.visuals.squares[7][6]);
            });
            it(" Should find a white rook on a1", function () {
            	expect(document.getElementsByClassName("light_square")[31].
                	getAttribute("data-symbol")).toBe("R");
            });
            it(" Should find a black queen on d8", function () {
            	expect(document.getElementsByClassName("dark_square")[1].
                	getAttribute("data-symbol")).toBe("q");
            });
            it(" Should flip the board successfully", function () {
                var lightSquares = document.getElementsByClassName("light_square"),
                    newNames = Array(),
                    i;
    
                for(i=0; i<32; i++){
                    newNames[31-i] = lightSquares[i].getAttribute("data-squarename");
                }
                this.board.flipBoard();
                for(i=0; i<32; i++){
                    expect(lightSquares[i].getAttribute("data-squarename")).
                        toBe(newNames[i]);
                }
            });
            it(" Should toggle the Comments", function () {
                var comments = document.getElementsByClassName("commentary"),
                    comments_length = comments.length,
                    i;
                for(i = 0; i < comments_length; i += 1) {
                    expect(comments[i].style.display).toBe("");
                }
                this.board.toggleComments();
                for(var i=0; i<comments_length; i++) {
                    expect(comments[i].style.display).toBe("none");
                }
                this.board.toggleComments();
                for(var i=0; i<comments_length; i++) {
                    expect(comments[i].style.display).toBe("inline");
                }
            });
            it(" Should toggle the move display", function () {
                var moves = document.getElementsByClassName("move_list"),
                    moves_length = moves.length
                    i;
                for(i = 0; i < moves_length; i += 1) {
                    expect(moves[i].style.display).toBe("");
                }
                this.board.toggleMoves();
                for(var i=0; i<moves_length; i++) {
                    expect(moves[i].style.display).toBe("none");
                }
                this.board.toggleMoves();
                for(var i=0; i<moves_length; i++) {
                    expect(moves[i].style.display).toBe("block");
                }
            });
        });
        describe("Config parameters", function () {
            beforeEach(function () {
            /*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */
                var movediv = document.getElementById("game1");
                movediv.innerHTML = aGame;
            });
            afterEach(function () {
                var boardDiv = document.getElementById("game1_board");
                while (boardDiv.firstChild) {
                    boardDiv.removeChild(boardDiv.firstChild);
                }
            });
            it(" Should create a game, flip the board, and start before move 3", function () {
                var myGame,
                    myBoard,
                    i,
                    squares,
                    light_squares = ["h1", "f1", "d1", "b1", "g2", "e2", "c2",
                        "a2", "h3", "f3", "d3", "b3", "g4", "e4", "c4", "a4",
                        "h5", "f5", "d5", "b5", "g6", "e6", "c6", "a6", "h7",
                        "f7", "d7", "b7", "g8", "e8", "c8", "a8"];
                myGame = new MarshallPGN.Game("game1", {"skipToMove": "3w", "flipped" : true});
                myBoard = myGame.board;
                expect(myBoard.currentMove.number).toBe(2);
                expect(myBoard.currentMove.color).toBe("black");
                squares = myBoard.movesContainer.getElementsByClassName("light_square");
                for (i = 0; 1 < squares.length; i += 1) {
                    expect(squares[i].getAttribute("data-squarename")).toBe(light_squares[i]);
                }
            });
            it(" Should not show the moves pane", function () {
                var myBoard = new MarshallPGN.Board(new MarshallPGN.VBoard(),
                        pgn, "game1_board", {"showMovesPane": false});
                    expect(myBoard.movesContainer.style.display).toBe("none");
            });
            it(" Should not show the comments", function () {
                var myBoard = new MarshallPGN.Board(new MarshallPGN.VBoard(),
                        pgn, "game1_board", {"showComments": false}),
                    i,
                    commentary;
                    commentary = document.getElementsByClassName("commentary");
                    for (i = 0;i < commentary.length; i += 1) {
                        expect(commentary[i].style.display).toBe("none");
                    }
            });
            it(" Should show the correct download URL", function () {
                var myBoard = new MarshallPGN.Board(new MarshallPGN.VBoard(),
                        pgn, "game1_board", {"downloadURL": "fred.com"});
                expect(myBoard.opts.downloadURL).toBe("fred.com");
            });
            it(" Should show the correct control button titles", function () {
                var list = {
                    "altRewind":		"Test 1",
                    "altBack":		    "Test 2",
                    "altFlip":		    "Test 3",
                    "altShowMoves":	    "Test 4",
                    "altComments":	    "Test 5",
                    "altPlayMove":	    "Test 6",
                    "altFastForward":	"Test 7",
                    "altUp":			"Test 8",
                    "altDown":		    "Test 9"
                    },
                    myBoard = new MarshallPGN.Board(new MarshallPGN.VBoard(),
                            pgn, "game1_board", list);
                expect(myBoard.visuals.button.rewind.alt).toBe(list.altRewind);
                expect(myBoard.visuals.button.rewind.title).toBe(list.altRewind);
                expect(myBoard.visuals.button.back.alt).toBe(list.altBack);
                expect(myBoard.visuals.button.back.title).toBe(list.altBack);
                expect(myBoard.visuals.button.up.alt).toBe(list.altUp);
                expect(myBoard.visuals.button.up.title).toBe(list.altUp);
                expect(myBoard.visuals.button.flip.alt).toBe(list.altFlip);
                expect(myBoard.visuals.button.flip.title).toBe(list.altFlip);
                expect(myBoard.visuals.button.toggleMoves.alt).toBe(list.altShowMoves);
                expect(myBoard.visuals.button.toggleMoves.title).toBe(list.altShowMoves);
                expect(myBoard.visuals.button.toggleComments.alt).toBe(list.altComments);
                expect(myBoard.visuals.button.toggleComments.title).toBe(list.altComments);
                expect(myBoard.visuals.button.down.alt).toBe(list.altDown);
                expect(myBoard.visuals.button.down.title).toBe(list.altDown);
                expect(myBoard.visuals.button.forward.alt).toBe(list.altPlayMove);
                expect(myBoard.visuals.button.forward.title).toBe(list.altPlayMove);
                expect(myBoard.visuals.button.fastforward.alt).toBe(list.altFastForward);
                expect(myBoard.visuals.button.fastforward.title).toBe(list.altFastForward);
            });
            it(" Should display the optional Game title", function () {
                var myBoard = new MarshallPGN.Board(new MarshallPGN.VBoard(),
                        pgn, "game1_board", {"gameTitle": "This is a Test"});
                expect(document.getElementById("game1_board").firstChild.
                    firstChild.firstChild.nodeValue).toBe("This is a Test");
            });
            it(" Should not display Diagram title", function () {
                var myBoard = new MarshallPGN.Board(new MarshallPGN.VBoard(),
                        pgn, "game1_board", {"showDiagramTitle": false});
                expect(myBoard.visuals.pgn.boardCaption.nodeValue).toBeFalsy();
            });
            it(" Should display the optional Diagram title", function () {
                var myBoard = new MarshallPGN.Board(new MarshallPGN.VBoard(),
                        pgn, "game1_board", {"showDiagramTitle": true,
                        "diagramTitle": "This is a Test"});
                expect(myBoard.visuals.pgn.boardCaption.nodeValue).
                    toBe("This is a Test");
            });
            it(" Should not display game info", function () {
                var myBoard = new MarshallPGN.Board(new MarshallPGN.VBoard(),
                        pgn, "game1_board", {"showGameInfo": false});
                expect(myBoard.visuals.pgn.event.parentNode.parentNode.style.display).toBe("none");
            });
        });
        describe("Click handlers", function () {
            beforeEach(function () {
            /*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */
            
                var movediv = document.getElementById("game1");
                movediv.innerHTML = aGame;
        
                this.game = new MarshallPGN.Game("game1");
                this.buttons = this.game.board.visuals.button;
            });
            afterEach(function () {
                var boardDiv = document.getElementById("game1_board");
                while (boardDiv.firstChild) {
                    boardDiv.removeChild(boardDiv.firstChild);
                }
            });
            it(" Should go forward and back", function () {
                this.buttons.forward.click();
                expect(this.game.board.visuals.currentMove.nodeValue).toBe("1. e4");
                this.buttons.back.click();
                expect(this.game.board.visuals.currentMove.nodeValue).toBe("...");
            });
            it(" Should fast forward and rewind", function () {
                this.buttons.fastforward.click();
                expect(this.game.board.visuals.currentMove.nodeValue).
                    toBe("11. ... Bxd6");
                this.buttons.rewind.click();
                expect(this.game.board.visuals.currentMove.nodeValue).toBe("...");
            });
            it(" Should go to a specific move", function () {
                var move4b = this.game.pgn.moveTree.next.next.next.next.next.
                    next.next.next;
                move4b.link.onclick({"currentTarget": move4b.link});
                expect(this.game.board.visuals.currentMove.nodeValue).
                    toBe("4. ... dxc3");
            });
            it(" Should go down and up through variations", function () {
                var move4b = this.game.pgn.moveTree.next.next.next.next.next.
                    next.next.next;
                move4b.link.onclick({"currentTarget": move4b.link});
                this.buttons.down.click();
                expect(this.game.board.visuals.currentMove.nodeValue).
                    toBe("4. ... Nf6");
                this.buttons.down.click();
                expect(this.game.board.visuals.currentMove.nodeValue).
                    toBe("4. ... Bc5");
                this.buttons.up.click();
                expect(this.game.board.visuals.currentMove.nodeValue).
                    toBe("4. ... Nf6");
                this.buttons.up.click();
                expect(this.game.board.visuals.currentMove.nodeValue).
                    toBe("4. ... dxc3");
            });
            it(" Should hide move list", function () {
                this.buttons.toggleMoves.click();
                expect(this.game.board.movesContainer.style.display).toBe("none");
            });
            it(" Should hide commentary", function () {
                var i,
                    comments;
                this.buttons.toggleComments.click();
                comments = this.game.board.movesContainer.
                    getElementsByClassName("commentary");
                for (i = 0; i < comments.length; i += 1) {
                    expect(comments[i].style.display).toBe("none");
                }
            });
            it(" Should flip board", function () {
                expect(this.game.board.visuals.squares[0][0].
                    getAttribute("data-squarename")).toBe("a8");
                this.buttons.flip.click();
                expect(this.game.board.visuals.squares[0][0].
                    getAttribute("data-squarename")).toBe("h1");
            });
        });
        describe("Board - Outputting HTML MoveTree", function () {
            beforeEach(function () {
            /*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */
            
                this.movediv = document.getElementById("game1");
                this.movediv.innerHTML = puzzle;
        
                var game = new MarshallPGN.Game("game1");
                this.div = document.getElementById("game1_board_moves");
            });
            afterEach(function () {
                var boardDiv = document.getElementById("game1_board");
                while (boardDiv.firstChild) {
                    boardDiv.removeChild(boardDiv.firstChild);
                }
                this.movediv.innerHTML = "";
            });
            it(" Should have 18 nodes in the move display", function () {
                expect(this.div.children[0].children.length).toBe(18);
            });
            it(" Should have 6 children in the variation display", function () {
                expect(this.div.children[0].children[8].children.length).toBe(6);
            });
            it(" Should have 8 nodes in the variation display", function () {
                expect(this.div.children[0].children[8].childNodes.length).toBe(8);
            });
            it(" Should have found and applied the NAG", function () {
                expect(this.div.children[0].children[2].textContent).toBe("Bxg7+!");
            });
        });
        describe("Making moves", function () {
            beforeEach(function () {
            /*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */
            
                this.movediv = document.getElementById("game1");
                this.movediv.innerHTML = puzzle;
        
                var game = new MarshallPGN.Game("game1");
                this.board = game.board;
            });
            afterEach(function () {
                var boardDiv = document.getElementById("game1_board");
                while (boardDiv.firstChild) {
                    boardDiv.removeChild(boardDiv.firstChild);
                }
                this.movediv.innerHTML = "";
            });
            it(" Should have only the back and variation buttons disabled", function () {
                expect(this.board.visuals.button.rewind.className).
                    toMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.back.className).
                    toMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.down.className).
                    toMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.up.className).
                    toMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.forward.className).
                    toNotMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.fastforward.className).
                    toNotMatch(/\bdisabled\b/);
            });
            it(" Should have only the up variation button disabled", function () {
                window[this.board.id].makeMove(
                    this.board.pgn.moveTree.next.next.next.next
                    );
                expect(this.board.visuals.button.rewind.className).
                    toNotMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.back.className).
                    toNotMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.down.className).
                    toNotMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.up.className).
                    toMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.forward.className).
                    toNotMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.fastforward.className).
                    toNotMatch(/\bdisabled\b/);
            });
            it(" Should have the back and down variation buttons disabled", function () {
                window[this.board.id].makeMove(
                    this.board.pgn.moveTree.next.next.next.next.down
                    );
                expect(this.board.visuals.button.rewind.className).
                    toMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.back.className).
                    toMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.down.className).
                    toMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.up.className).
                    toNotMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.forward.className).
                    toNotMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.fastforward.className).
                    toNotMatch(/\bdisabled\b/);
            });
            it(" Should make the second move for white in main line", function () {
                window[this.board.id].makeMove(
                    this.board.pgn.moveTree.next.next.next
                    );
                expect(this.board.visuals.currentMove.data).toBe("2. Qh6+!!");
                expect(this.board.visuals.button.rewind.className).
                    toNotMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.back.className).
                    toNotMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.down.className).
                    toMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.up.className).
                    toMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.forward.className).
                    toNotMatch(/\bdisabled\b/);
                expect(this.board.visuals.button.fastforward.className).
                    toNotMatch(/\bdisabled\b/);
            });
            it(" Should make the fourth move for black in main line", function () {
                window[this.board.id].makeMove(this.board.pgn.moveTree.next.
                    next.next.next.next.next.next.next);
                expect(this.board.visuals.currentMove.data).toBe("4. ... Kg4");
            });
            it(" Should rewind the position back to the start", function () {
                window[this.board.id].makeMove(this.board.pgn.moveTree.next.
                    next.next.next.next.next.next.next);
                this.board.makeMove(this.board.currentMove.goStart());
                expect(this.board.visuals.currentMove.data).toBe("...");
            });
            it(" Should fast forward the position to end of main", function () {
                window[this.board.id].makeMove(this.board.pgn.moveTree);
                this.board.makeMove(this.board.currentMove.goEnd());
                expect(this.board.visuals.currentMove.data).toBe("5. Rh4#");
            });
        });
    });
})();