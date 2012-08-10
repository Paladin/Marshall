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
	
	"test finding any piece to move to a square": function() {
		h7 = [7,1]; /* Don't like this, smells like an error */
		f5 = [3,5,[1,7],-1];

		pgn = new Pgn( this.goodPGN );
		conv = new Converter(pgn);
		conv.convert();

		assertEquals( "Couldn't find right piece", h7, conv.findFromAny("h7-f5", f5));
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
		pgn = new Pgn( this.dummyTags + "{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#" );
		conv = new Converter(pgn);
		conv.convert();
		conv.resetToStart();

		assertEquals( "Couldn't do en passant", "d4", conv.getEnPassante(conv.vBoard, "e4", "d3"));
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
		result = conv.movePiece(from, to, "");

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
		conv.movePiece(pawnFrom, to, "Q");

		assertEquals( "Incorrect piece promoted - Q", "queen", to.piece);
		assertEquals( "Incorrect color moved", "white", to.color);
		assertEquals( "Incorrect type moved", -1, to.type);
		conv.movePiece(pawnFrom, to, "R");
		assertEquals( "Incorrect piece promoted - R", "rook", to.piece);
		conv.movePiece(pawnFrom, to, "N");
		assertEquals( "Incorrect piece promoted - N", "knight", to.piece);
		conv.movePiece(pawnFrom, to, "B");
		assertEquals( "Incorrect piece promoted - B", "bishop", to.piece);
	}	
});