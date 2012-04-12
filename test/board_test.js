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
				'{The Scholar\'s Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#',

	setup: function () {
	},
	teardown: function() {},
	
	"test creation of a Board": function() {
	/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.aGame;

		var board = new Board("game1");
		board.init();

		results = document.getElementsByClassName("game_section");
		assertEquals("Should find one game section", 1, results.length );
		
		lightSquares = document.getElementsByClassName("light_square");
		assertEquals("Should find one game section", 32, lightSquares.length );

		darkSquares = document.getElementsByClassName("dark_square");
		assertEquals("Should find one game section", 32, darkSquares.length );
		
		assertEquals("Should get the right square", "a1",
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
		
		assertEquals("Should get the right square", "a1",
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
		
		assertEquals("Should get the right square", "a1",
			document.getElementsByClassName("light_square")[0].getAttribute('data-squarename'));
	},
	
	"test creation of a Board, skipping to move 3": function() {
	/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.aGame;

		var board = new Board("game1", {"skipToMove": 3});
		board.init();

		results = document.getElementsByClassName("game_section");
		assertEquals("Should find one game section", 1, results.length );
		
		lightSquares = document.getElementsByClassName("light_square");
		assertEquals("Should find one game section", 32, lightSquares.length );

		darkSquares = document.getElementsByClassName("dark_square");
		assertEquals("Should find one game section", 32, darkSquares.length );
		
		assertEquals("Should get the right square", "a1",
			document.getElementsByClassName("light_square")[0].getAttribute('data-squarename'));
	},
	
	"test flipping the board": function() {
	/*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */

		var movediv = document.getElementById("game1");
		movediv.innerHTML = this.aGame;

		var board = new Board("game1");
		board.init();
		lightSquares = document.getElementsByClassName("light_square");

		assertEquals("Should get the right square name", "a1",
						lightSquares[0].getAttribute('data-squarename'));
		lastSquare = lightSquares[31].firstChild;

		flipBoard(board);
		assertEquals("Should get the right square name", "h8",
			lightSquares[0].getAttribute('data-squarename'));
		assertEquals("First square should have last square's content", lastSquare,
						lightSquares[0].firstChild);
	}
});