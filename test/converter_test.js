TestCase( "ConverterTest", 
{
	goodPGN: 	'[Event	"Dayton"]' +
				'[Site	"?"]\n' +
				'[Date	"1890.02.25"]\n' +
				'[Round	"?"]\n' +
				'[White	"Blumenschein, E.."]\n' +
				'[Black	"Smith, W.H.."]\n' +
				'[Result	"*"]\n' +
				'[Annotator	"Reeh,Oliver"]\n' +
				'[SetUp	"1"]\n' +
				'[FEN	"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 13"]\n' +
				'[PlyCount	"9"]\n' +
				'[SourceDate	"2009.06.14"]\n' +
				'{In this position White has a beautiful focred mate in five, so answer C is correct:} 1. Bxg7+ $1 Kxg7 2. Qh6+ $3 {The point - Black\'s king is dragged into a	discovered double-check.} Kxh6 (2... Kh8 3. Bg6+ Kg8 4. Qh7#) 3. Nf5+ Kg5 4. Ne4+ Kg4 5. Rh4# {or 5.Ne3++. This brilliancy was published far more than 100 years ago - in May 1890 on page 155 of International Chess Magazine. (Source: "A Chess Omnibus", Edward Winter, Russel Enterprises, Inc., 2003)} *',

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

	goodGame: 	'[Event	"Dayton"]' +
				'[Site	"?"]\n' +
				'[Date	"1890.02.25"]\n' +
				'[Round	"?"]\n' +
				'[White	"NoName]\n' +
				'[Black	"Amateur"]\n' +
				'[Result	"1-0"]\n' +
				'{The Scholar\'s Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#',
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
		pgn = new Pgn( this.goodGame );
		conv = new Converter(pgn);
		
		assertEquals( pgn, conv.pgn );
		assertEquals( "vSquare -- piece = rook color=black type=", conv.vBoard[0][7].toString(),  conv.vBoard[0][7].toString());
		assertEquals( "vSquare -- piece = rook color=white type=", conv.initialBoard[7][7].toString() );
		assertTrue( conv.whiteToMove );
		assertEquals( 1, conv.startMoveNum );
	},
	
	"test converting the first move": function() {
		moves = "MyMove -- no. actions 2";
		from_e2 = "MySquare -- x = 6 y=4 color=null piece=null";
		pawn_to_e4 = "MySquare -- x = 4 y=4 color=white piece=pawn";

		pgn = new Pgn( this.goodGame );
		conv = new Converter(pgn);
		move = conv.convertMove();
		
		assertEquals( from_e2, move.actions[0] );
		assertEquals( pawn_to_e4, move.actions[1] );
		assertEquals( moves, move );
	},
	
	"test converting moves": function() {
		moves = "MyMove -- no. actions 2,MyMove -- no. actions 2,"+
				"MyMove -- no. actions 2,MyMove -- no. actions 2,"+
				"MyMove -- no. actions 2,MyMove -- no. actions 2,MyMove -- no. actions 2";
		from_e2 = "MySquare -- x = 6 y=4 color=null piece=null";
		pawn_to_e4 = "MySquare -- x = 4 y=4 color=white piece=pawn";

		pgn = new Pgn( this.goodGame );
		conv = new Converter(pgn);
		conv.convert();
		
		assertEquals( from_e2, conv.moves[0].actions[0] );
		assertEquals( pawn_to_e4, conv.moves[0].actions[1] );
		assertEquals( moves, conv.moves );
		assertEquals( 7, conv.moves.length );
	},
	
	"test getting the current move": function() {
		expected = "MyMove -- no. actions 2";
		expectedJSON = '{"actions":[{"x":6,"y":4,"color":null,"piece":null},{"x":4,"y":4,"color":"white","piece":"pawn"}],"oPiece":null,"oColor":null,"pPiece":null,"enP":null,"moveStr":"e4"}';

		pgn = new Pgn( this.goodGame );
		conv = new Converter(pgn);
		conv.convert();
		move = conv.getCurMove();

		assertEquals( expected, move );
		assertEquals( expectedJSON, JSON.stringify(move) );
	},
	
	"test getting the current move number": function() {
		expected = 0;

		pgn = new Pgn( this.goodGame );
		conv = new Converter(pgn);
		conv.convert();
		move = conv.getCurMoveNo();

		assertEquals( expected, move );
	},
	
	"test getting the next move": function() {
		expected = "MyMove -- no. actions 2";
		expectedJSON = '{"actions":[{"x":6,"y":4,"color":null,"piece":null},{"x":4,"y":4,"color":"white","piece":"pawn"}],"oPiece":null,"oColor":null,"pPiece":null,"enP":null,"moveStr":"e4"}';

		pgn = new Pgn( this.goodGame );
		conv = new Converter(pgn);
		conv.convert();
		move = conv.nextMove();

		assertEquals( expected, move );
		assertEquals( expectedJSON, JSON.stringify(move) );
	},
	
	"test getting the previous move": function() {
		expected = null;
		expectedJSON = 'null';

		pgn = new Pgn( this.goodGame );
		conv = new Converter(pgn);
		conv.convert();
		move = conv.prevMove();

		assertEquals( expected, move );
		assertEquals( expectedJSON, JSON.stringify(move) );
	},
	
	"test resetting to end": function() {
		expected = null;
		expectedJSON = 'null';
		expectedNumber = 7;

		pgn = new Pgn( this.goodGame );
		conv = new Converter(pgn);
		conv.convert();
		conv.resetToEnd();
		move = conv.getCurMove();
		moveNumber = conv.getCurMoveNo();

		assertEquals( expected, move );
		assertEquals( expectedJSON, JSON.stringify(move) );
		assertEquals( expectedNumber, moveNumber );
	},
	
	"test getting previous move decrements move index": function() {
		expected = "MyMove -- no. actions 2";
		expectedJSON = '{"actions":[{"x":3,"y":7,"color":null,"piece":null},{"x":1,"y":5,"color":"white","piece":"queen"}],"oPiece":"pawn","oColor":"black","pPiece":null,"enP":null,"moveStr":"Qf7#"}';
		expectedNumber = 6;

		pgn = new Pgn( this.goodGame );
		conv = new Converter(pgn);
		conv.convert();
		conv.resetToEnd();
		move = conv.prevMove();
		moveNumber = conv.getCurMoveNo();

		assertEquals( expected, move );
		assertEquals( expectedJSON, JSON.stringify(move) );
		assertEquals( expectedNumber, moveNumber );
	},
	
	"test resetting to start": function() {
		expected = "MyMove -- no. actions 2";
		expectedJSON = '{"actions":[{"x":6,"y":4,"color":null,"piece":null},{"x":4,"y":4,"color":"white","piece":"pawn"}],"oPiece":null,"oColor":null,"pPiece":null,"enP":null,"moveStr":"e4"}';
		expectedNumber = 0;

		pgn = new Pgn( this.goodGame );
		conv = new Converter(pgn);
		conv.convert();
		move = conv.getCurMove();
		moveNumber = conv.getCurMoveNo();

		assertEquals( expected, move );
		assertEquals( expectedJSON, JSON.stringify(move) );
		assertEquals( expectedNumber, moveNumber );
	},
	
	"test getting starting position": function() {
		expected = null;
		expectedJSON = JSON.stringify(this.gameStart);

		pgn = new Pgn( this.goodGame );
		conv = new Converter(pgn);
		conv.convert();
		position = conv.getStartPos(false);

		assertEquals( expectedJSON, JSON.stringify(position) );
	},
	
	"test getting starting position flipped": function() {
		expected = null;
		expectedJSON = JSON.stringify(this.gameStartF);

		pgn = new Pgn( this.goodGame );
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

		pgn = new Pgn( this.goodGame );
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

		pgn = new Pgn( this.goodGame );
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

		assertEquals( "Couldn't find pawn", a7, conv.findFromPawn(conv.vBoard, 'a5', a5, "black"));
		assertEquals( "Couldn't find pawn", a7, conv.findFromPawn(conv.vBoard, 'a6', a6, "black"));
	},
	
	"test finding the Bishop to move to a square": function() {
		h7 = [1,7];
		f5 = [3,5,[-1,-1],-1];

		pgn = new Pgn( this.goodPGN );
		conv = new Converter(pgn);
		conv.convert();

		assertEquals( "Couldn't find bishop", h7, conv.findFromBish(conv, 'Bf5', f5, "white"));
	},
	
	"test finding any piece to move to a square": function() {
		h7 = [7,1]; /* Don't like this, smells like an error */
		f5 = [3,5,[1,7],-1];

		pgn = new Pgn( this.goodPGN );
		conv = new Converter(pgn);
		conv.convert();

		assertEquals( "Couldn't find right piece", h7, conv.findFromAny('h7-f5', f5));
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

		assertEquals( "Couldn't find queen", d8, conv.findFromQueen(conv, conv.vBoard, 'Qd7', d7, "black"));
		assertEquals( "Couldn't find queen", d8, conv.findFromQueen(conv, conv.vBoard, 'Qd8d7', d7Full, "black"));
	}
});