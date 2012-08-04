TestCase( "BoardTest", 
{
	theObject: null,
	theDiv: null,
	goodPGN: 	'[Event	"Dayton"]' +
				'[Site	"?"]\n' +
				'[Date	"1890.02.25"]\n' +
				'[Round	"?"]\n' +
				'[White	"Blumenschein, E.."]\n' +
				'[Black	"Smith, W.H.."]\n' +
				'[Result	"*"]\n' +
				'[Annotator	"Reeh,Oliver"]\n' +
				'[SetUp	"1"]\n' +
				'[FEN	"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1"]\n' +
				'[PlyCount	"9"]\n' +
				'[SourceDate	"2009.06.14"]\n' +
				'{In this position White has a beautiful focred mate in five, so answer C is correct:} 1. Bxg7+ $1 Kxg7 2. Qh6+ $3 {The point - Black\'s king is dragged into a	discovered double-check.} Kxh6 (2... Kh8 3. Bg6+ Kg8 4. Qh7#) 3. Nf5+ Kg5 4. Ne4+ Kg4 5. Rh4# {or 5.Ne3++. This brilliancy was published far more than 100 years ago - in May 1890 on page 155 of International Chess Magazine. (Source: "A Chess Omnibus", Edward Winter, Russel Enterprises, Inc., 2003)} *',
	
	aGame: 	'[Event	"Dayton"]' +
				'[Site	"?"]\n' +
				'[Date	"1890.02.25"]\n' +
				'[Round	"?"]\n' +
				'[White	"NoName]\n' +
				'[Black	"Amateur"]\n' +
				'[Result	"1-0"]\n' +
				'{The Scholar\'s Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 {Here it comes} 4. Qf7#',

	epGame: 	'[Event	"?"]' +
				'[Site	"?"]\n' +
				'[Date	"???.??.??"]\n' +
				'[Round	"?"]\n' +
				'[White	"NoName]\n' +
				'[Black	"Amateur"]\n' +
				'[Result	"*"]\n' +
				'1. d4 e5 2. e3 e4 3. f4 exf3 4. Nf3 Nc6 5.Bc4 d5 6. 0-0 *',

	setup: function () {
	},
	teardown: function() {},
	
	"test creation of a Board": function() {
	/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.aGame;
		
		var gameboard = document.getElementById("game1_board");
        while(gameboard.firstChild) {
            gameboard.removeChild(gameboard.firstChild);
        }

		var board = new Board("game1");
		board.init();

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

		var board = new Board("game1", {"skipToMove": 1});
		board.init();

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

		var board = new Board("game1", {"skipToMove": 2});
		board.init();

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

		var board = new Board("game1", {"skipToMove": 3, "flipped" : true});
		board.init();

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

		var board = new Board("game1");
		board.init();
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
	
	"test skipping backwards 2 moves": function() {
		/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.aGame;

		var board = new Board("game1", {"skipToMove": 6}); // Black's third move
		board.init();
		
		marked = document.getElementsByClassName("move_numbers")[2].nextElementSibling.nextElementSibling.className;
		unmarked = document.getElementsByClassName("move_numbers")[1].nextElementSibling.nextElementSibling.className;
		assertNotEquals("marked and unmarked should not be the same", marked, unmarked );

		board.skipToMove(1,1);		// 2nd 1 means "Black's move"
		
		current = document.getElementsByClassName("move_numbers")[1].nextElementSibling.nextElementSibling.className;
		assertEquals("Previous move should now be marked", marked, current );
	},
	
	"test moving to final position and back": function() {
		/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.aGame;

		var board = new Board("game1");
		board.init();

		assertEquals("There should be a black pawn on f7 after init", "black_pawn", 
			document.getElementsByClassName("light_square")[6].title);

		board.endPosition(board);
		
		assertEquals("There should be a white_queen on f7 at the start", "white_queen",
			document.getElementsByClassName("light_square")[6].title);
			
		board.startPosition(board);
		
		assertEquals("There should be a black pawn on f7 at the start", "black_pawn", 
			document.getElementsByClassName("light_square")[6].title);
		
	},
	
	"test converting game with e.p. move, then backing over it": function() {
		/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.epGame;

		var board = new Board("game1");
		board.init();
		board.skipToMove(3, 0);	// past e.p. move

		assertEquals("There should be a white knight on f3 after skipping", "white_knight", 
			document.getElementsByClassName("light_square")[22].title);

		board.makeBwMove(board, false);
		
		assertEquals("There should be a black pawn on f3 after moving backwards", "black_pawn", 
			document.getElementsByClassName("light_square")[22].title);
			
		board.makeBwMove(board, false);
		
		assertEquals("There should be nothing on f3 after moving backwards", "empty",
			document.getElementsByClassName("light_square")[22].title);
	},
	
	"test marking the last move": function() {
//
//		Indications in the code are that this method doesn't do anything at the moment
//		so I'm putting this in here as a placeholder. If jsTestDriver had the ability
//		to mark a test Incomplete, I'd put it here as well
//
//
		/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.epGame;

		var board = new Board("game1", {"skipToMove": 2});
		board.init();

		board.markLastMove();
	},
	
	"test unmarking the last move": function() {
//
//		Indications in the code are that this method doesn't do anything at the moment
//		so I'm putting this in here as a placeholder. If jsTestDriver had the ability
//		to mark a test Incomplete, I'd put it here as well
//
//
		/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.epGame;

		var board = new Board("game1", {"skipToMove": 2});
		board.init();

		board.deMarkLastMove();
	},
	
	"test toggling moves display": function() {
		/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.aGame;

		var board = new Board("game1");
		board.init();

		assertEquals("Should have started out visible", "visible",
				document.getElementsByClassName("move_list")[0].style.visibility);
		board.toggleMoves("flip");
		assertEquals("Should have flipped to hidden", "hidden",
				document.getElementsByClassName("move_list")[0].style.visibility);
		board.toggleMoves("flip");
		assertEquals("Should have returned to visible", "visible",
				document.getElementsByClassName("move_list")[0].style.visibility);
	},
	
	"test toggling comments display": function() {
		/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.aGame;

		var board = new Board("game1");
		board.init();
		
		var divId = document.getElementById("game1_board");
		
		var comments = divId.getElementsByClassName("commentary");
		var comments_length = comments.length;
		for(var i=0; i<comments_length; i++) {
			assertTrue("Should have started out visible", 
				comments[i].style.visibility == "visible" || 
				comments[i].style.visibility == "");
		}
		board.toggleComments("flip");
		for(var i=0; i<comments_length; i++) {
			assertTrue("Should have flipped to hidden",
				comments[i].style.visibility == "hidden" || 
				comments[i].style.visibility == "");
		}
		board.toggleComments("flip");
		for(var i=0; i<comments_length; i++) {
			assertTrue("Should have returned to visible",
				comments[i].style.visibility == "visible" || 
				comments[i].style.visibility == "");
		}
	},

	"test updating move display": function() {
		/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.aGame;

		var board = new Board("game1", {"skipToMove": 1});
		board.init();
		var expected = board.moveInput.data;
		board.moveInput.value = "PreTest";

		board.updateMoveInfo();
		assertEquals("Should have correct move display", expected, board.moveInput.data);
	},

	"test making a move": function() {
		/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.epGame;

		var board = new Board("game1");
		board.init();
		board.skipToMove(2, 0);
		var expected = board.moveInput.data;

		board.makeMove(false);
		assertEquals("Should not update move display", expected, board.moveInput.data);
		board.makeMove(true);
		assertNotEquals("Should update move display", expected, board.moveInput.data);
		newexpected = board.moveInput.value;
		board.makeMove();
		assertNotEquals("Default should update move display", newexpected, board.moveInput.data);
	}
});