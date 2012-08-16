TestCase( "BoardTest", 
{
	theObject: null,
	theDiv: null,
	goodPGN: 	"[Event	\"Dayton\"]" +
				"[Site	\"?\"]\n" +
				"[Date	\"1890.02.25\"]\n" +
				"[Round	\"?\"]\n" +
				"[White	\"Blumenschein, E..\"]\n" +
				"[Black	\"Smith, W.H..\"]\n" +
				"[Result	\"*\"]\n" +
				"[Annotator	\"Reeh,Oliver\"]\n" +
				"[SetUp	\"1\"]\n" +
				"[FEN	\"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1\"]\n" +
				"[PlyCount	\"9\"]\n" +
				"[SourceDate	\"2009.06.14\"]\n" +
				"{In this position White has a beautiful focred mate in five, so answer C is correct:} 1. Bxg7+ $1 Kxg7 2. Qh6+ $3 {The point - Black's king is dragged into a	discovered double-check.} Kxh6 (2... Kh8 3. Bg6+ Kg8 4. Qh7#) 3. Nf5+ Kg5 4. Ne4+ Kg4 5. Rh4# {or 5.Ne3++. This brilliancy was published far more than 100 years ago - in May 1890 on page 155 of International Chess Magazine. (Source: \"A Chess Omnibus\", Edward Winter, Russel Enterprises, Inc., 2003)} *",
	
	aGame: 	"[Event	\"Dayton\"]" +
				"[Site	\"?\"]\n" +
				"[Date	\"1890.02.25\"]\n" +
				"[Round	\"?\"]\n" +
				"[White	\"NoName\"]\n" +
				"[Black	\"Amateur\"]\n" +
				"[Result \"1-0\"]\n" +
				"{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 {Here it comes} 4. Qf7#",

	epGame: 	"[Event	\"?\"]" +
				"[Site	\"?\"]\n" +
				"[Date	\"???.??.??\"]\n" +
				"[Round	\"?\"]\n" +
				"[White	\"NoName\"]\n" +
				"[Black	\"Amateur\"]\n" +
				"[Result	\"*\"]\n" +
				"1. d4 e5 2. e3 e4 3. f4 exf3 4. Nf3 Nc6 5.Bc4 d5 6. 0-0 *",

	setup: function () {
	    this.game = {};
	    this.pgn = {};
	},
	teardown: function() {
		var gameboard = document.getElementById("game1_board");
        while(gameboard.firstChild) {
            gameboard.removeChild(gameboard.firstChild);
        }
	},
	
	"test creation of a Board": function() {
	/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */
		var gameboard = document.getElementById("game1_board");
        while(gameboard.firstChild) {
            gameboard.removeChild(gameboard.firstChild);
        }

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.aGame;
		
        var game = new Game("game1");
        var board = game.board;

		results = document.getElementsByClassName("game_section");
		assertEquals("Should find one game section", 1, results.length );
		
		lightSquares = document.getElementsByClassName("light_square");
		assertEquals("Should find one game section", 32, lightSquares.length );

		darkSquares = document.getElementsByClassName("dark_square");
		assertEquals("Should find one game section", 32, darkSquares.length );
		
		assertEquals("Should get the right square", "a8",
			document.getElementsByClassName("light_square")[0].getAttribute('data-squarename'));
	},
	
	"test creation of a Board, skipping to move 1": function() {
	/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.aGame;

        var game = new Game("game1");
        var board = game.board;

		results = document.getElementsByClassName("game_section");
		assertEquals("Should find one game section", 1, results.length );
		
		lightSquares = document.getElementsByClassName("light_square");
		assertEquals("Should find one game section", 32, lightSquares.length );

		darkSquares = document.getElementsByClassName("dark_square");
		assertEquals("Should find one game section", 32, darkSquares.length );
		
		assertEquals("Should get the right square", "a8",
			document.getElementsByClassName("light_square")[0].getAttribute('data-squarename'));
	},
	
	"test creation of a Board, skipping to move 2": function() {
	/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.aGame;

        var game = new Game("game1");
        var board = game.board;

		results = document.getElementsByClassName("game_section");
		assertEquals("Should find one game section", 1, results.length );
		
		lightSquares = document.getElementsByClassName("light_square");
		assertEquals("Should find one game section", 32, lightSquares.length );

		darkSquares = document.getElementsByClassName("dark_square");
		assertEquals("Should find one game section", 32, darkSquares.length );
		
		assertEquals("Should get the right square", "a8",
			document.getElementsByClassName("light_square")[0].getAttribute('data-squarename'));
	},
	
	"test creation of a Board, skipping to move 3, flipped": function() {
	/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.aGame;

        var game = new Game("game1", {"skipToMove": "3", "flipped" : true});
        var board = game.board;

		results = document.getElementsByClassName("game_section");
		assertEquals("Should find one game section", 1, results.length );
		
		lightSquares = document.getElementsByClassName("light_square");
		assertEquals("Should find one game section", 32, lightSquares.length );

		darkSquares = document.getElementsByClassName("dark_square");
		assertEquals("Should find one game section", 32, darkSquares.length );
		
		assertEquals("Should get the right square", "h1",
			document.getElementsByClassName("light_square")[0].getAttribute('data-squarename'));
	},
	
	"test flipping the board": function() {
	/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.aGame;

        var game = new Game("game1");
        var board = game.board;
		lightSquares = document.getElementsByClassName("light_square");

		var newNames = Array();
		var newSquares = Array();
		for(i=0; i<32; i++){
			newNames[31-i] = lightSquares[i].getAttribute('data-squarename');
			newSquares[31-i] = lightSquares[i].firstChild;
		}

		board.flipBoard(board);

		for(i=0; i<32; i++){
			assertEquals("Square "+i+" name is incorrect -- ", newNames[i],
				lightSquares[i].getAttribute('data-squarename'));
			assertEquals("Square "+i+" content is incorrect -- ", newSquares[i],
				lightSquares[i].firstChild);
		}
	},
	
	"test moving to final position and back": function() {
		/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.aGame;

        var game = new Game("game1");
        var board = game.board;

		assertEquals("There should be a black pawn on f7 after init", "black_pawn", 
			document.getElementsByClassName("light_square")[6].title);

		board.endPosition(board);
		
		assertEquals("There should be a white_queen on f7 at the start", "white_queen",
			document.getElementsByClassName("light_square")[6].title);
			
		board.startPosition(board);
		
		assertEquals("There should be a black pawn on f7 at the start", "black_pawn", 
			document.getElementsByClassName("light_square")[6].title);
		
	},
	
	"test toggling moves display": function() {
		/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.aGame;

        var game = new Game("game1");
        var board = game.board;

		assertEquals("Should have started out default", "",
				document.getElementsByClassName("move_list")[0].style.display);
		board.toggleMoves();
		assertEquals("Should have flipped to hidden", "none",
				document.getElementsByClassName("move_list")[0].style.display);
		board.toggleMoves();
		assertEquals("Should have returned to visible", "block",
				document.getElementsByClassName("move_list")[0].style.display);
	},
	
	"test toggling comments display": function() {
		/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.aGame;

        var game = new Game("game1");
        var board = game.board;
		
		var divId = document.getElementById("game1_board");
		
		var comments = divId.getElementsByClassName("commentary");
		var comments_length = comments.length;
		for(var i=0; i<comments_length; i++) {
			assertTrue("Should have started out visible", 
				comments[i].style.display == "inline" || 
				comments[i].style.display == "");
		}
		board.toggleComments();
		for(var i=0; i<comments_length; i++) {
			assertTrue("Should have flipped to hidden",
				comments[i].style.display == "none");
		}
		board.toggleComments();
		for(var i=0; i<comments_length; i++) {
			assertTrue("Should have returned to visible",
				comments[i].style.display == "inline");
		}
	}
});