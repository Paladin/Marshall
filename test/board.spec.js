(function(){
	describe("Testing Display Board config parameters", function () {
		var aGame = "[Event	\"Dayton\"]" +
				"[Site	\"?\"]\n" +
				"[Date	\"1890.02.25\"]\n" +
				"[Round	\"?\"]\n" +
				"[White	\"NoName\"]\n" +
				"[Black	\"Amateur\"]\n" +
				"[Result	\"1-0\"]\n" +
				"{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 {Here it comes} 4. Qf7#";
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
            squares = myBoard.movesDiv.getElementsByClassName("light_square");
            for (i = 0; 1 < squares.length; i += 1) {
                expect(squares[i].getAttribute("data-squarename")).toBe(light_squares[i]);
            }
        });
        it(" Should not show the moves pane", function () {
            var myGame = new MarshallPGN.Game("game1", {"showMovesPane": false}),
                myBoard = myGame.board;
                expect(myBoard.movesDiv.style.display).toBe("none");
        });
        it(" Should not show the comments", function () {
            var myGame = new MarshallPGN.Game("game1", {"showComments": false}),
                myBoard = myGame.board,
                i,
                commentary;
                commentary = document.getElementsByClassName("commentary");
                for (i = 0;i < commentary.length; i += 1) {
                    expect(commentary[i].style.display).toBe("none");
                }
        });
        it(" Should show the correct download URL", function () {
            var myGame = new MarshallPGN.Game("game1", {"downloadURL": "fred.com"}),
                myBoard = myGame.board;
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
                myGame = new MarshallPGN.Game("game1",list),
                myBoard = myGame.board;
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
            var myGame = new MarshallPGN.Game("game1", {"gameTitle": "This is a Test"}),
                myBoard = myGame.board;
            expect(document.getElementById(myBoard.divId).firstChild.
                firstChild.firstChild.nodeValue).toBe("This is a Test");
        });
        it(" Should not display Diagram title", function () {
            var myGame = new MarshallPGN.Game("game1", {"showDiagramTitle": false}),
                myBoard = myGame.board;
            expect(myBoard.visuals.pgn.players.nodeValue).toBeFalsy();
        });
        it(" Should display the optional Diagram title", function () {
            var myGame = new MarshallPGN.Game("game1", {"diagramTitle": "This is a Test"}),
                myBoard = myGame.board;
            expect(myBoard.visuals.pgn.players.nodeValue).toBe("This is a Test");
        });
        it(" Should not display game info", function () {
            var myGame = new MarshallPGN.Game("game1", {"showGameInfo": false}),
                myBoard = myGame.board;
            expect(myBoard.visuals.pgn.event.parentNode.parentNode.style.display).toBe("none");
        });
	});
	describe("Working with Forsythe and display boards", function() {
		var aGame = "[Event	\"Dayton\"]" +
				"[Site	\"?\"]\n" +
				"[Date	\"1890.02.25\"]\n" +
				"[Round	\"?\"]\n" +
				"[White	\"NoName\"]\n" +
				"[Black	\"Amateur\"]\n" +
				"[Result	\"1-0\"]\n" +
				"{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 {Here it comes} 4. Qf7#";

		beforeEach(function(){
		/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */
		
			var movediv = document.getElementById("game1");
			movediv.innerHTML = aGame;
	
            var game = new MarshallPGN.Game("game1");
            this.board = game.board;
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
        it(" Should find 32 dark squares", function () {
        	expect(document.getElementsByClassName("dark_square").
        	    length).toBe(32);
        });
		it("should draw the correct position on screen", function(){
		    var forsythe =
		            "r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR",
		        flags = " b KQ - 0 4";

			this.board.drawFEN(forsythe + flags);
			expect(this.board.getForsytheFromDisplay()).
					toBe("r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR");
		});
		
		it("should work without requiring the FEN flags", function(){
		    var forsythe =
		            "r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR";

			this.board.drawFEN(forsythe);
			expect(this.board.getForsytheFromDisplay()).
					toBe("r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR");
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
	describe("Board - Outputting HTML MoveTree", function () {
        var aGame = "[Event \"Dayton\"]" + 
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
		beforeEach(function () {
		/*:DOC += <div><div id="game1"></div><div id="game1_board"></div><div id="testmoves"></div></div> */
		
			var movediv = document.getElementById("game1");
			movediv.innerHTML = aGame;
	
            var game = new MarshallPGN.Game("game1");
            this.board = game.board;
			this.board.pgn.parse(this.board.pgn.pgnOrig);
			this.div = document.getElementById("testmoves");
		    this.board.outputMoveTree(this.div);
		});
        afterEach(function () {
            var boardDiv = document.getElementById("game1_board");
            while (boardDiv.firstChild) {
                boardDiv.removeChild(boardDiv.firstChild);
            }
            while (this.div.firstChild) {
                this.div.removeChild(this.div.firstChild);
            }
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
        var aGame = "[Event \"Dayton\"]" + 
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
		beforeEach(function () {
		/*:DOC += <div><div id="game1"></div><div id="game1_board"></div><div id="testmoves"></div></div> */
		
			var movediv = document.getElementById("game1");
			movediv.innerHTML = aGame;
	
            var game = new MarshallPGN.Game("game1");
            this.board = game.board;
		});
        afterEach(function () {
            var boardDiv = document.getElementById("game1_board");
            while (boardDiv.firstChild) {
                boardDiv.removeChild(boardDiv.firstChild);
            }
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
    		window[this.board.id].displayMove(
    		    this.board.pgn.moveTree.next.next.next.next.link
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
    		window[this.board.id].displayMove(
    		    this.board.pgn.moveTree.next.next.next.next.down.link
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
    		window[this.board.id].displayMove(
    		    this.board.pgn.moveTree.next.next.next.link
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
    		window[this.board.id].displayMove(this.board.pgn.moveTree.next.
    		    next.next.next.next.next.next.next.link);
			expect(this.board.visuals.currentMove.data).toBe("4. ... Kg4");
		});
		it(" Should rewind the position back to the start", function () {
    		window[this.board.id].displayMove(this.board.pgn.moveTree.next.
    		    next.next.next.next.next.next.next.link);
    		this.board.makeMove(this.board.currentMove.goStart());
			expect(this.board.visuals.currentMove.data).toBe("...");
		});
		it(" Should fast forward the position to end of main", function () {
    		window[this.board.id].displayMove(this.board.pgn.moveTree.link);
            this.board.makeMove(this.board.currentMove.goEnd());
            expect(this.board.visuals.currentMove.data).toBe("5. Rh4#");
		});
	});
})();