TestCase( "PgnTest", {
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
	
	trickyPGN:	'[Event "Dayton"]' + 
				'[Site "?"]' + 
				'[Date "1890.02.25"]' + 
				'[Round "?"]' + 
				'[White "Blumenschein, E.."]' + 
				'[Black "Smith, W.H.."]' + 
				'[Result "*"]' + 
				'[Annotator "Reeh,Oliver"]' + 
				'[SetUp "1"]' + 
				'[FEN "r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1"]' + 
				'[PlyCount "9"]' + 
				'[SourceDate "2009.06.14"]' + 
				'{3)c is correct} 1. Bxg7+ $1 Kxg7 2. Qh6+ $3 {The point - Black\'s king is dragged into a discovered double-check.} Kxh6 (2... Kh8 3. Bg6+ Kg8 4. Qh7#) 3. Nf5+ Kg5 4. Ne4+ Kg4 5. Rh4# {or 5.Ne3++. This brilliancy was published far more than 100 years ago - in May 1890 on page 155 of International Chess Magazine. (Source: "A Chess Omnibus", Edward Winter, Russel Enterprises, Inc., 2003)} *',

	evilPGN: 	'[Event	"Dayton"]' +
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
				'{In this position White has a beautiful focred mate in five, so answer C is correct: 1. Bxg7+ $1 Kxg7 2. Qh6+ $3 {The point - Black\'s king is dragged into a	discovered double-check.} Kxh6 (2... Kh8 3. Bg6+ Kg8 4. Qh7#) 3. Nf5+ Kg5 4. Ne4+ Kg4 5. Rh4# {or 5.Ne3++. This brilliancy was published far more than 100 years ago - in May 1890 on page 155 of International Chess Magazine. (Source: "A Chess Omnibus", Edward Winter, Russel Enterprises, Inc., 2003)} *',

	goodProps: 	{
				'Event': "Dayton",
				'Site': "?",
				'Date': "1890.02.25",
				'Round': "?",
				'White': "Blumenschein, E..",
				'Black': "Smith, W.H..",
				'Result': "*",
				'Annotator': "Reeh,Oliver",
				'SetUp': "1",
				'FEN': "r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1",
				'PlyCount': "9",
				'SourceDate': "2009.06.14"
				},
				
	goodMoves:	Array(
					{ 'white': 'Bxg7+!', 'black': 'Kxg7'},
					{ 'white': 'Qh6+!!', 'black': 'Kxh6'},
					{ 'white': 'Nf5+', 'black': 'Kg5'},
					{ 'white': 'Ne4+', 'black': 'Kg4'},
					{ 'white': 'Rh4#', 'black': null}
				),
				
	trickySt:	'[Event \"Dayton\"][Site \"?\"][Date \"1890.02.25\"][Round \"?\"][White \"Blumenschein, E..\"][Black \"Smith, W.H..\"][Result \"*\"][Annotator \"Reeh,Oliver\"][SetUp \"1\"][FEN \"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1\"][PlyCount \"9\"][SourceDate \"2009.06.14\"]________________ 1. Bxg7+ $1 Kxg7 2. Qh6+ $3 _____________________________________________________________________ Kxh6 ______________________________ 3. Nf5+ Kg5 4. Ne4+ Kg4 5. Rh4# _____________________________________________________________________________________________________________________________________________________________________________________________________________ *',
	trickySNC:	'[Event \"Dayton\"][Site \"?\"][Date \"1890.02.25\"][Round \"?\"][White \"Blumenschein, E..\"][Black \"Smith, W.H..\"][Result \"*\"][Annotator \"Reeh,Oliver\"][SetUp \"1\"][FEN \"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1\"][PlyCount \"9\"][SourceDate \"2009.06.14\"] 1. Bxg7+ $1 Kxg7 2. Qh6+ $3  Kxh6  3. Nf5+ Kg5 4. Ne4+ Kg4 5. Rh4#  *',
	
	evilSt:		'[Event \"Dayton\"][Site \"?\"]\n[Date \"1890.02.25\"]\n[Round \"?\"]\n[White \"Blumenschein, E..\"]\n[Black \"Smith, W.H..\"]\n[Result \"*\"]\n[Annotator \"Reeh,Oliver\"]\n[SetUp \"1\"]\n[FEN \"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1\"]\n[PlyCount \"9\"]\n[SourceDate \"2009.06.14\"]\n____________________________________________________________________________________________________________________________________________________________ _____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
	evilSNC:	'[Event \"Dayton\"][Site \"?\"]\n[Date \"1890.02.25\"]\n[Round \"?\"]\n[White \"Blumenschein, E..\"]\n[Black \"Smith, W.H..\"]\n[Result \"*\"]\n[Annotator \"Reeh,Oliver\"]\n[SetUp \"1\"]\n[FEN \"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1\"]\n[PlyCount \"9\"]\n[SourceDate \"2009.06.14\"]\n ',
	
	setUp: function() {},
	
	tearDown: function() {},
	
	"test with small PGN file":	function() {
		pgn = new Pgn(this.goodPGN);
		
		assertEquals( this.goodProps, pgn.props );
		assertArray( pgn.moves );
		assertEquals( 5, pgn.moves.length );
		assertEquals( 0, pgn.currentMove );
		assertEquals( 0, pgn.skip );
		assertEquals( this.goodPGN, pgn.pgnOrig );
	},
	
	"test getting the next move": function() {
		pgn = new Pgn(this.goodPGN);

		assertEquals( Array( "Bxg7+!","white"), pgn.nextMove());
	},
	
	"test getting next comment": function () {
		pgn = new Pgn(this.goodPGN);
		
		assertEquals( 
			Array('{The point - Black\'s king is dragged into a discovered double-check.}', 453),
			pgn.getComment( 'Qh6+!!' )
		);
	},
	
	"test for pgn parsing bug in tricky PGN": function() {
		pgn = new Pgn(this.goodPGN);
		
		assertFalse( pgn.isBroken( this.trickyPGN ) );
	},
	
	"test for pgn parsing in bad PGN": function() {
		pgn = new Pgn(this.goodPGN);
		
		assertTrue( pgn.isBroken( this.evilPGN ) );
	},
	
	"test for blanking comments in tricky PGN": function() {
		pgn = new Pgn(this.goodPGN);
		
		assertEquals( this.trickySt, pgn.stripIt( this.trickyPGN ) );
	},
	
	"test for stripping comments in tricky PGN": function() {
		pgn = new Pgn(this.goodPGN);
		
		assertEquals( this.trickySNC, pgn.stripIt( this.trickyPGN, true ) );
	},
	
	"test for blanking comments in bad PGN": function() {
		pgn = new Pgn(this.goodPGN);
		
		assertEquals( this.evilSt, pgn.stripItBroken( this.evilPGN ) );
	},
	
	"test for stripping comments in bad PGN": function() {
		pgn = new Pgn(this.goodPGN);
		
		assertEquals( this.evilSNC, pgn.stripItBroken( this.evilPGN, true ) );
	}
});