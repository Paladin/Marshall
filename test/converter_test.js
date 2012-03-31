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
	goodGame: 	'[Event	"Dayton"]' +
				'[Site	"?"]\n' +
				'[Date	"1890.02.25"]\n' +
				'[Round	"?"]\n' +
				'[White	"NoName]\n' +
				'[Black	"Amateur"]\n' +
				'[Result	"1-0"]\n' +
				'{The Scholar\'s Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qf7#',
	

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
	}
});