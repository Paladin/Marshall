TestCase( "ConverterTest", 
{
	goodPGN: 	"[Event	\"Dayton\"]" +
				"[Site	\"?\"]\n" +
				"[Date	\"1890.02.25\"]\n" +
				"[Round	\"?\"]\n" +
				"[White	\"Blumenschein, E..\"]\n" +
				"[Black	\"Smith, W.H..\"]\n" +
				"[Result	\"*\"]\n" +
				"[Annotator	\"Reeh,Oliver\"]\n" +
				"[SetUp	\"1\"]\n" +
				"[FEN	\"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 13\"]\n" +
				"[PlyCount	\"9\"]\n" +
				"[SourceDate	\"2009.06.14\"]\n" +
				"{In this position White has a beautiful focred mate in five, so answer C is correct:} 1. Bxg7+ $1 Kxg7 2. Qh6+ $3 {The point - Black's king is dragged into a	discovered double-check.} Kxh6 (2... Kh8 3. Bg6+ Kg8 4. Qh7#) 3. Nf5+ Kg5 4. Ne4+ Kg4 5. Rh4# {or 5.Ne3++. This brilliancy was published far more than 100 years ago - in May 1890 on page 155 of International Chess Magazine. (Source: \"A Chess Omnibus\", Edward Winter, Russel Enterprises, Inc., 2003)} *",

	fenStart:	[
					[
						{"piece":"rook","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"queen","color":"black","type":""},
						{"piece":"rook","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"king","color":"black","type":""}
					],
					[
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"knight","color":"black","type":""},
						{"piece":"bishop","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"bishop","color":"white","type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":"bishop","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"bishop","color":"white","type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"queen","color":"white","type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"knight","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"knight","color":"white","type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"rook","color":"white","type":""}
					],
					[
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"knight","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""}
					],
					[
						{"piece":"rook","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"king","color":"white","type":""},
						{"piece":null,"color":null,"type":""}
					]
				],
	
	fenStartF:	[
					[
						{"piece":null,"color":null,"type":""},
						{"piece":"king","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"rook","color":"white","type":""}
					],
					[
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"knight","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""}
					],
					[
						{"piece":"rook","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":"knight","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"knight","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":"queen","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":"bishop","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"bishop","color":"black","type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":"bishop","color":"white","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"bishop","color":"black","type":""},
						{"piece":"knight","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""}
					],
					[
						{"piece":"king","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"rook","color":"black","type":""},
						{"piece":"queen","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"rook","color":"black","type":""}
					]
				],
	dummyTags: 	"[Event	\"Dayton\"]" +
				"[Site	\"?\"]\n" +
				"[Date	\"1890.02.25\"]\n" +
				"[Round	\"?\"]\n" +
				"[White	\"NoName\"]\n" +
				"[Black	\"Amateur\"]\n" +
				"[Result	\"1-0\"]\n",

	gameStartF:	[
					[
						{"piece":"rook","color":"white","type":""},
						{"piece":"knight","color":"white","type":""},
						{"piece":"bishop","color":"white","type":""},
						{"piece":"king","color":"white","type":""},
						{"piece":"queen","color":"white","type":""},
						{"piece":"bishop","color":"white","type":""},
						{"piece":"knight","color":"white","type":""},
						{"piece":"rook","color":"white","type":""}
					],
					[
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""}
					],
					[
						{"piece":"rook","color":"black","type":""},
						{"piece":"knight","color":"black","type":""},
						{"piece":"bishop","color":"black","type":""},
						{"piece":"king","color":"black","type":""},
						{"piece":"queen","color":"black","type":""},
						{"piece":"bishop","color":"black","type":""},
						{"piece":"knight","color":"black","type":""},
						{"piece":"rook","color":"black","type":""}
					]
				],	

	gameStart:	[
					[
						{"piece":"rook","color":"black","type":""},
						{"piece":"knight","color":"black","type":""},
						{"piece":"bishop","color":"black","type":""},
						{"piece":"queen","color":"black","type":""},
						{"piece":"king","color":"black","type":""},
						{"piece":"bishop","color":"black","type":""},
						{"piece":"knight","color":"black","type":""},
						{"piece":"rook","color":"black","type":""}
					],
					[
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""}
					],
					[
						{"piece":"rook","color":"white","type":""},
						{"piece":"knight","color":"white","type":""},
						{"piece":"bishop","color":"white","type":""},
						{"piece":"queen","color":"white","type":""},
						{"piece":"king","color":"white","type":""},
						{"piece":"bishop","color":"white","type":""},
						{"piece":"knight","color":"white","type":""},
						{"piece":"rook","color":"white","type":""}
					]
				],
	
	gameEnd:	[
					[
						{"piece":"rook","color":"black","type":""},
						{"piece":null,"color":null,"type":null},
						{"piece":"bishop","color":"black","type":""},
						{"piece":"queen","color":"black","type":""},
						{"piece":"king","color":"black","type":""},
						{"piece":"bishop","color":"black","type":""},
						{"piece":null,"color":null,"type":null},
						{"piece":"rook","color":"black","type":""}
					],
					[
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":null,"color":null,"type":null},
						{"piece":"queen","color":"white","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"knight","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"knight","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":null}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"bishop","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":null,"color":null,"type":null},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""}
					],
					[
						{"piece":"rook","color":"white","type":""},
						{"piece":"knight","color":"white","type":""},
						{"piece":"bishop","color":"white","type":""},
						{"piece":null,"color":null,"type":null},
						{"piece":"king","color":"white","type":""},
						{"piece":null,"color":null,"type":null},
						{"piece":"knight","color":"white","type":""},
						{"piece":"rook","color":"white","type":""}
					]
				],
	
	gameEndF:	[
					[
						{"piece":"rook","color":"white","type":""},
						{"piece":"knight","color":"white","type":""},
						{"piece":null,"color":null,"type":null},
						{"piece":"king","color":"white","type":""},
						{"piece":null,"color":null,"type":null},
						{"piece":"bishop","color":"white","type":""},
						{"piece":"knight","color":"white","type":""},
						{"piece":"rook","color":"white","type":""}
					],
					[
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":null,"color":null,"type":null},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":"pawn","color":"white","type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"pawn","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"bishop","color":"white","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":null,"color":null,"type":null},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"knight","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":"knight","color":"black","type":""},
						{"piece":null,"color":null,"type":""},
						{"piece":null,"color":null,"type":""}
					],
					[
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"queen","color":"white","type":""},
						{"piece":null,"color":null,"type":null},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""},
						{"piece":"pawn","color":"black","type":""}
					],
					[
						{"piece":"rook","color":"black","type":""},
						{"piece":null,"color":null,"type":null},
						{"piece":"bishop","color":"black","type":""},
						{"piece":"king","color":"black","type":""},
						{"piece":"queen","color":"black","type":""},
						{"piece":"bishop","color":"black","type":""},
						{"piece":null,"color":null,"type":null},
						{"piece":"rook","color":"black","type":""}
					]
				],

	shortGame:	"[Event	\"?\"]" +
				"[Site	\"?\"]\n" +
				"[Date	\"????.??.??\"]\n" +
				"[Round	\"?\"]\n" +
				"[White	\"NoName\"]\n" +
				"[Black	\"Amateur\"]\n" +
				"[Result	\"*\"]\n" +
				"1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. Nf3 c6 6. e3 Qa5 7. Nd2 Bb4 8. Be2 0-0 *",

	setup: function() {},
	teardown: function() {},
	
	"test FEN position converter creation": function() {
		pgn = new Pgn( this.goodPGN );
		conv = new Converter(pgn);
		
		assertEquals( pgn, conv.pgn );
		assertEquals( "vSquare -- piece = knight color=white type=", conv.vBoard[4][7].toString() );
		assertEquals( "vSquare -- piece = knight color=white type=", conv.initialBoard[4][7].toString() );
		assertTrue( conv.whiteToMove );
		assertEquals( 13, conv.startMoveNum );
	},
	
	"test starting position converter creation": function() {
		pgn = new Pgn( this.dummyTags +
		    "{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#" );
		conv = new Converter(pgn);
		
		assertEquals( pgn, conv.pgn );
		assertEquals( "vSquare -- piece = rook color=black type=", conv.vBoard[0][7].toString(),  conv.vBoard[0][7].toString());
		assertEquals( "vSquare -- piece = rook color=white type=", conv.initialBoard[7][7].toString() );
		assertTrue( conv.whiteToMove );
		assertEquals( 1, conv.startMoveNum );
	},
	
	"test converting short game with castling": function() {
		pgn = new Pgn( this.dummyTags + "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. Nf3 c6 6. e3 Qa5 7. Nd2 Bb4 8. Be2 0-0 *" );
		conv = new Converter(pgn);
		conv.convert();
		
		expectedJSON = JSON.stringify(this.gameStart);
		assertEquals( "Didn't get the starting position", expectedJSON , JSON.stringify(conv.getStartPos(false)));
	},
	
	"test getting the current move number": function() {
		expected = 0;

		pgn = new Pgn( this.dummyTags + "{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#" );
		conv = new Converter(pgn);
		conv.convert();
		move = conv.getCurMoveNo();

		assertEquals( expected, move );
	},
	
	"test getting the previous move": function() {
		expected = null;
		expectedJSON = "null";

		pgn = new Pgn( this.dummyTags + "{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#" );
		conv = new Converter(pgn);
		conv.convert();
		move = conv.prevMove();

		assertEquals( expected, move );
		assertEquals( expectedJSON, JSON.stringify(move) );
	},
	
	"test resetting to end": function() {
		expected = null;
		expectedJSON = "null";
		expectedNumber = 8;

		pgn = new Pgn( this.dummyTags + "{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#" );
		conv = new Converter(pgn);
		conv.convert();
		conv.resetToEnd();
		move = conv.getCurMove();
		moveNumber = conv.getCurMoveNo();

		assertEquals( expected, move );
		assertEquals( expectedJSON, JSON.stringify(move) );
		assertEquals( expectedNumber, moveNumber );
	},
	
	"test getting starting position": function() {
		expected = null;
		expectedJSON = JSON.stringify(this.gameStart);

		pgn = new Pgn( this.dummyTags + "{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#" );
		conv = new Converter(pgn);
		conv.convert();
		position = conv.getStartPos(false);

		assertEquals( expectedJSON, JSON.stringify(position) );
	},
	
	"test getting starting position flipped": function() {
		expected = null;
		expectedJSON = JSON.stringify(this.gameStartF);

		pgn = new Pgn( this.dummyTags + "{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#" );
		conv = new Converter(pgn);
		conv.convert();
		position = conv.getStartPos(true);

		assertEquals( expectedJSON, JSON.stringify(position) );
	},
	
	"test getting FEN starting position": function() {
		expectedJSON = JSON.stringify(this.fenStart);

		pgn = new Pgn( this.goodPGN );
		conv = new Converter(pgn);
		conv.convert();
		position = conv.getStartPos(false);

		assertEquals( "FEN start incorrect", expectedJSON, JSON.stringify(position) );
	},
	
	"test getting FEN starting position flipped": function() {
		expectedJSON = JSON.stringify(this.fenStartF);

		pgn = new Pgn( this.goodPGN );
		conv = new Converter(pgn);
		conv.convert();
		position = conv.getStartPos(true);

		assertEquals( "Flipped FEN start incorrect", expectedJSON, JSON.stringify(position) );
	},
	
	"test getting ending position": function() {
		expected = null;
		expectedJSON = JSON.stringify(this.gameEnd);
		expectedNumber = 0;

		pgn = new Pgn( this.dummyTags + "{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#" );
		conv = new Converter(pgn);
		conv.convert();
		position = conv.getEndPos(false);
		endMoveNumber = conv.getCurMoveNo();

		assertEquals( expectedJSON, JSON.stringify(position) );
		assertEquals( expectedNumber, endMoveNumber );
	},
	
	"test getting ending position flipped": function() {
		expected = null;
		expectedJSON = JSON.stringify(this.gameEndF);
		expectedNumber = 0;

		pgn = new Pgn( this.dummyTags + "{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#" );
		conv = new Converter(pgn);
		conv.convert();
		position = conv.getEndPos(true);
		endMoveNumber = conv.getCurMoveNo();

		assertEquals("position", expectedJSON, JSON.stringify(position) );
		assertEquals( "move number", expectedNumber, endMoveNumber );
	},
	
	"test finding the piece on a square": function() {
		a1 = [7,0];
		h4 = [4,7];

		pgn = new Pgn( this.goodPGN );
		conv = new Converter(pgn);
		conv.convert();

		assertEquals( "Couldn't find piece", 1, conv.findPieceIdx(conv.wRooks, a1)); 
		assertEquals( "Couldn't find piece", 0, conv.findPieceIdx(conv.wRooks, h4)); 
	},
	
	"test finding the pawn to move to a square": function() {
		a7 = [1,0];
		a6 = [2,0,[-1,-1],-1];
		a5 = [3,0,[-1,-1],-1];

		pgn = new Pgn( this.goodPGN );
		conv = new Converter(pgn);
		conv.convert();

		assertEquals( "Couldn't find pawn", a7, conv.findFromPawn(conv.vBoard, "a5", a5, "black"));
		assertEquals( "Couldn't find pawn", a7, conv.findFromPawn(conv.vBoard, "a6", a6, "black"));
	},
	
	"test finding the Bishop to move to a square": function() {
		h7 = [1,7];
		f5 = [3,5,[-1,-1],-1];

		pgn = new Pgn( this.goodPGN );
		conv = new Converter(pgn);
		conv.convert();

		assertEquals( "Couldn't find bishop", h7, conv.findFromBish(conv, "Bf5", f5, "white"));
	},
	
	"test finding any piece to move to a square": function() {
		h7 = [7,1]; /* Don't like this, smells like an error */
		f5 = [3,5,[1,7],-1];

		pgn = new Pgn( this.goodPGN );
		conv = new Converter(pgn);
		conv.convert();

		assertEquals( "Couldn't find right piece", h7, conv.findFromAny("h7-f5", f5));
	},
	
	"test finding the King to move to a square": function() {
		g4 = [4,6];
		g1 = [7,6];

		pgn = new Pgn( this.goodPGN );
		conv = new Converter(pgn);
		conv.convert();

		assertEquals( "Couldn't find king", g4, conv.findFromKing(conv, "black"));
		assertEquals( "Couldn't find king", g1, conv.findFromKing(conv, "white"));
	},
	
	"test finding a queen to move to a square": function() {
		d8 = [0,4];
		d7 = [1,4,[-1,-1],-1];
		d7Full = [1,4,[4,0],-1];

		pgn = new Pgn( this.goodPGN );
		conv = new Converter(pgn);
		conv.convert();

		assertEquals( "Couldn't find queen", d8, conv.findFromQueen(conv, conv.vBoard, "Qd7", d7, "black"));
		assertEquals( "Couldn't find queen", d8, conv.findFromQueen(conv, conv.vBoard, "Qd8d7", d7Full, "black"));
	},
	
	"test finding a rook to move to a square": function() {
		a8 = [0,0];
		f8 = [0,5];
		b8 = [0,1,[-1,-1],-1];
		g8 = [0,6,[-1,-1],-1];
		b8Full = [0,1,[0,0],-1];
		g8Full = [0,6,[5,0],-1];

		pgn = new Pgn( this.goodPGN );
		conv = new Converter(pgn);
		conv.convert();

		assertEquals( "Couldn't find rook", a8, conv.findFromRook(conv, conv.vBoard, "Rb8", b8, "black"));
		assertEquals( "Couldn't find rook", a8, conv.findFromRook(conv, conv.vBoard, "Ra8b8", b8Full, "black"));
	},
	
	"test finding a knight to move to a square": function() {
		e7 = [1,4];
		f4 = [4,5];
		c8 = [0,2,[-1,-1],-1];
		h5 = [3,7,[-1,-1],-1];
		c8Full = [0,2,[4,1],-1];
		h5Full = [3,7,[5,4],-1];

		pgn = new Pgn( this.goodPGN );
		conv = new Converter(pgn);
		conv.convert();
		conv.resetToStart();

		assertEquals( "Couldn't find knight e7", e7, conv.findFromKnight(conv, "Nc8", c8, "black"));
		assertEquals( "Couldn't find knight e7 full", e7, conv.findFromKnight(conv, "Nc8", c8Full, "black"));
		assertEquals( "Couldn't find knight f4", f4, conv.findFromKnight(conv, "Nh5", h5, "black"));
		assertEquals( "Couldn't find knight f4 full", f4, conv.findFromKnight(conv, "Nf4h5", h5Full, "black"));
	},
	
	"test finding destination coordinates of a SAN move": function() {
		f7 = [1,5,[-1,-1],null];
		noOrigin = [-1,-1];
		e8Origin = [4,0];
		eOrigin = [4,-1];
		x8Origin = [-1,0];
		f6 = [2,5,[-1,-1],null];
		g8Origin = [6,0];
		gOrigin = [6,-1];
		
		pgn = new Pgn( this.dummyTags + "{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#" );
		conv = new Converter(pgn);
		conv.convert();
		conv.resetToEnd();
		
		result = conv.getSquare("Kxf7");
		assertArray( "Didn't return an array", result);
		assertEquals( "Returned wrong rank", f7[0], result[0]);
		assertEquals( "Returned wrong file", f7[1], result[1]);
		assertEquals( "Returned wrong origin", noOrigin, result[2]);
		assertNaN( "Returned wrong misc", result[3]);
		
		result = conv.getSquare("Ke8xf7");
		assertArray( "Didn't return an array", result);
		assertEquals( "Returned wrong rank", f7[0], result[0]);
		assertEquals( "Returned wrong file", f7[1], result[1]);
		assertEquals( "Returned wrong origin", e8Origin, result[2]);
		assertNaN( "Returned wrong misc", result[3]);
		
		result = conv.getSquare("Kexf7");
		assertArray( "Didn't return an array", result);
		assertEquals( "Returned wrong rank", f7[0], result[0]);
		assertEquals( "Returned wrong file", f7[1], result[1]);
		assertEquals( "Returned wrong origin", eOrigin, result[2]);
		assertEquals( "Returned wrong misc", 4, result[3]);
		
		result = conv.getSquare("K8xf7");
		assertArray( "Didn't return an array", result);
		assertEquals( "Returned wrong rank", f7[0], result[0]);
		assertEquals( "Returned wrong file", f7[1], result[1]);
		assertEquals( "Returned wrong origin", x8Origin, result[2]);
		assertNaN( "Returned wrong misc", result[3]);
		
		result = conv.getSquare("Ngf6");
		assertArray( "Didn't return an array", result);
		assertEquals( "Returned wrong rank", f6[0], result[0]);
		assertEquals( "Returned wrong file", f6[1], result[1]);
		assertEquals( "Returned wrong origin", gOrigin, result[2]);
		assertEquals( "Returned wrong misc", -1, result[3]);
		
		result = conv.getSquare("Ng8f6");
		assertArray( "Didn't return an array", result);
		assertEquals( "Returned wrong rank", f6[0], result[0]);
		assertEquals( "Returned wrong file", f6[1], result[1]);
		assertEquals( "Returned wrong origin", g8Origin, result[2]);
		assertEquals( "Returned wrong misc", -1, result[3]);
		
		result = conv.getSquare("N8f6");
		assertArray( "Didn't return an array", result);
		assertEquals( "Returned wrong rank", f6[0], result[0]);
		assertEquals( "Returned wrong file", f6[1], result[1]);
		assertEquals( "Returned wrong origin", x8Origin, result[2]);
		assertEquals( "Returned wrong misc", -1, result[3]);
	},
	
	/*	this test is incorrect, it's there to prevent regression.
	*	But this function needs attention
	*/
	"test capturing en passant": function() {
	    e3 = [6,4];

		pgn = new Pgn( this.dummyTags + "{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#" );
		conv = new Converter(pgn);
		conv.convert();
		conv.resetToStart();

		assertEquals( "Couldn't do en passant", e3, conv.getEnPassante(conv, 6, 5, 5, 4));
	},
	
	"test getting opponent's color": function() {

		pgn = new Pgn( this.dummyTags + "{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#" );
		conv = new Converter(pgn);
		conv.convert();

		assertEquals( "Should be white", "white", conv.getOppColor("black"));
		assertEquals( "Should be black", "black", conv.getOppColor("white"));
		assertEquals( "default is white", "white", conv.getOppColor("turquoise"));
	},

	"test moving piece": function() {
		var from = new vSquare();
		from.piece = "knight";
		from.color = "white";
		from.type = -1;
		var to = new vSquare();
		to.piece = "bishop";
		to.color = "black";
		to.type = null;

		pgn = new Pgn( this.dummyTags + "{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#" );
		conv = new Converter(pgn);
		conv.convert();
		result = conv.movePiece(conv, from, to, "");

		assertEquals( "Incorrect piece moved", "knight", to.piece);
		assertEquals( "Incorrect color moved", "white", to.color);
		assertEquals( "Incorrect type moved", -1, to.type);
	},

	"test promoting pawn": function() {
		var pawnFrom = new vSquare();
		pawnFrom.piece = "pawn";
		pawnFrom.color = "white";
		pawnFrom.type = -1;
		var to = new vSquare();
		to.piece = "bishop";
		to.color = "black";
		to.type = null;

		pgn = new Pgn( this.dummyTags + "{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#" );
		conv = new Converter(pgn);
		conv.convert();
		conv.movePiece(conv, pawnFrom, to, "Q");

		assertEquals( "Incorrect piece promoted - Q", "queen", to.piece);
		assertEquals( "Incorrect color moved", "white", to.color);
		assertEquals( "Incorrect type moved", -1, to.type);
		conv.movePiece(conv, pawnFrom, to, "R");
		assertEquals( "Incorrect piece promoted - R", "rook", to.piece);
		conv.movePiece(conv, pawnFrom, to, "N");
		assertEquals( "Incorrect piece promoted - N", "knight", to.piece);
		conv.movePiece(conv, pawnFrom, to, "B");
		assertEquals( "Incorrect piece promoted - B", "bishop", to.piece);
	},
	
	"test finding if black king is in check": function() {

		pgn = new Pgn( this.dummyTags + "{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#" );
		conv = new Converter(pgn);
		conv.convert();

		assertTrue( "Couldn't see the check", conv.isKingChecked(conv, "black", conv.vBoard));
	},
	
	"test finding if white king is in check from rook": function() {

		pgn = new Pgn( this.dummyTags + "[FEN	\"r6K/8/8/8/8/8/8/7k w - - 0 13\"]\n" );
		conv = new Converter(pgn);
		conv.convert();

		assertTrue( "Couldn't see the check", conv.isKingChecked(conv, "white", conv.vBoard));
	},
	
	"test finding if white king is in check from rook (right)": function() {

		pgn = new Pgn( this.dummyTags + "[FEN	\"K6r/8/8/8/8/8/8/7k w - - 0 13\"]" );
		conv = new Converter(pgn);
		conv.convert();

		assertTrue( "Couldn't see the check", conv.isKingChecked(conv, "white", conv.vBoard));
	},
	
	"test finding if black king is in check from rook (up)": function() {

		pgn = new Pgn( this.dummyTags + "[FEN	\"K6R/8/8/8/8/8/8/7k b - - 0 13\"]" );
		conv = new Converter(pgn);
		conv.convert();

		assertTrue( "Couldn't see the check", conv.isKingChecked(conv, "black", conv.vBoard));
	},
	
	"test finding if black king is in check from rook (down)": function() {

		pgn = new Pgn( this.dummyTags + "[FEN	\"K6k/8/8/8/8/8/8/7R b - - 0 13\"]" );
		conv = new Converter(pgn);
		conv.convert();

		assertTrue( "Couldn't see the check", conv.isKingChecked(conv, "black", conv.vBoard));
	},
	
	"test finding if black king is in check from bishop (ul)": function() {

		pgn = new Pgn( this.dummyTags + "[FEN	\"B6K/8/8/8/8/8/8/7k b - - 0 13\"]" );
		conv = new Converter(pgn);
		conv.convert();

		assertTrue( "Couldn't see the check", conv.isKingChecked(conv, "black", conv.vBoard));
	},
	
	"test finding if white king is in check from bishop (ur)": function() {

		pgn = new Pgn( this.dummyTags + "[FEN	\"k6b/8/8/8/8/8/8/K7 w - - 0 13\"]" );
		conv = new Converter(pgn);
		conv.convert();

		assertTrue( "Couldn't see the check", conv.isKingChecked(conv, "white", conv.vBoard));
	},
	
	"test finding if white king is in check from queen (dl)": function() {

		pgn = new Pgn( this.dummyTags + "[FEN	\"k6K/8/8/8/8/8/8/q7 w - - 0 13\"]" );
		conv = new Converter(pgn);
		conv.convert();

		assertTrue( "Couldn't see the check", conv.isKingChecked(conv, "white", conv.vBoard));
	},
	
	"test finding if white king is in check from queen (dr)": function() {

		pgn = new Pgn( this.dummyTags + "[FEN	\"K6k/8/8/8/8/8/8/7q w - - 0 13\"]" );
		conv = new Converter(pgn);
		conv.convert();

		assertTrue( "Couldn't see the check", conv.isKingChecked(conv, "white", conv.vBoard));
	}
});