TestCase( "PgnTest", {
	incPGN: 	'[Date	"1890.02.25"]\n' +
				'[White	"Blumenschein, E.."]\n' +
				'[Black	"Smith, W.H.."]\n' +
				'[Result	"*"]\n' +
				'[Annotator	"Reeh,Oliver"]\n' +
				'[SetUp	"1"]\n' +
				'[FEN	"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1"]\n' +
				'[PlyCount	"9"]\n' +
				'[SourceDate	"2009.06.14"]\n' +
				'{In this position White has a beautiful focred mate in five, so answer C is correct:} 1. Bxg7+ $1 Kxg7 2. Qh6+ $3 {The point - Black\'s king is dragged into a	discovered double-check.} Kxh6 (2... Kh8 3. Bg6+ Kg8 4. Qh7#) 3. Nf5+ Kg5 4. Ne4+ Kg4 5. Rh4# {or 5.Ne3++. This brilliancy was published far more than 100 years ago - in May 1890 on page 155 of International Chess Magazine. (Source: "A Chess Omnibus", Edward Winter, Russel Enterprises, Inc., 2003)} *',
	
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
				'{3)c is correct} 1. Bxg7+ $1 Kxg7 2. Qh6+ $3 {The point - Black\'s king is dragged into a discovered double-check.} Kxh6 (2... Kh8 3. Bg6+ Kg8 4. Qh7#) 3. Nf5+ Kg5 4. Ne4+ Kg4 5. Rh4# * {or 5.Ne3++. This brilliancy was published far more than 100 years ago - in May 1890 on page 155 of International Chess Magazine. (Source: "A Chess Omnibus", Edward Winter, Russel Enterprises, Inc., 2003)}',

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

    nestedPGN:  '[Event "UW Winter Open"]' +
                '[Site "Madison"]' +
                '[Date "2003.02.01"]' +
                '[Round "1"]' +
                '[White "Walker Arlen P"]' +
                '[Black "Lopez Eugene"]' +
                '[Result "1-0"]' +
                '[ECO "B23"]' +
                '[WhiteElo "0"]' +
                '[BlackElo "0"]' +
                '[Annotator "Walker Arlen P"]' +
                '[Source ""]' +
                '[Remark ""]' +
                '1.e4 g6 2.Nc3 Bg7 3.Bc4 {0.00} ( 3.d4 d6 4.f4 Nf6 5.Nf3 O-O 6.Bd3 Nc6 7.O-O e5 8.fxe5 dxe5 9.d5 Nd4 10.Nxe5 Nxe4 11.Bxe4 Bxe5 12.Bf4 Bxf4 13.Rxf4 Nf5 14.Bxf5 Bxf5 15.Qd4 {+0.24} ) ( 3.h4 h5 {+0.24} ) c5 4.f4 Nc6 5.Nf3 e6 6.f5 Nge7 7.fxe6 fxe6 8.O-O {-0.27} {-0.38} ( 8.d3 d5 9.Bb3 b5 10.exd5 exd5 11.O-O O-O {0.00} ) O-O 9.d3 h6 ( 9...d5 {Black\'s best counter in this line is always to strike out in the center with ...d5} ) 10.Be3?? ( 10.Qe1 d5 11.Bb3 {+0.18} Nd4 ( 11...b6 12.Ne2 ) 12.Nxd4 Bxd4+ 13.Kh1 Kh7 14.exd5 Bxc3 15.bxc3 exd5 16.Bd2 Nf5 17.Qf2 b5 18.Qxc5 Bb7 19.Rae1 Rc8 20.Qxb5 Bc6 21.Qb4 d4 22.cxd4 Qh4 23.Kg1 a5 24.Qb6 Bxg2 25.Rxf5 Rxf5 26.Qa7+ Kh8 27.d5 Rff8 28.Re7 Rf1+ 29.Kxg2 Rf2+ {...1-0, Szonyi K.(2115) - Daya M., Cala Galdana 1996 Ch World (juniors) (under 18) (g)} ) ( 10.Bb3 b6 11.Qe1 g5 12.Ne2 Ba6 13.Ng3 Qe8 14.Rb1 Qg6 15.Bd2 Rf7 16.Qe2 Raf8 17.Bc3 g4 18.Nd2 Nd4 19.Qe3 Bb5 20.Rxf7 Rxf7 21.Ne2 Qg5 {0-1, Kosanovic G.(2437) - Jakab A.(2308), Budapest 2001 It (cat.7)} ) Nd4 {-0.08} ( 10...d5 11.exd5 exd5 {%02\'with the idea\' ...d4} {-1.86} ) 11.Qd2 {-1.26} Kh7 {-0.14} ( 11...d5 {-1.56} 12.exd5 exd5 13.Bb3 ( 13.Nxd4 Rxf1+ {-0.90} ) Nxb3 14.axb3 d4 {And White loses.} ) 12.Rae1 {-1.86} ( 12.Bb3 d5 13.exd5 exd5 14.Bxd4 {-0.38} ) a6 {0.00} ( 12...d5 13.exd5 exd5 14.Bxd4 cxd4 {-1.90} ) 13.Nd1 d5 14.Bb3 {-0.92} ( 14.Bxd4 cxd4 15.Bb3 ) Nxb3 15.axb3 {-1.10} dxe4 {-0.36} ( 15...d4 ) 16.dxe4 {-0.32} Qxd2 {+0.40} ( 16...b6 17.b4 cxb4 18.Qxd8 Rxd8 {-0.60} ) 17.Nxd2 b6 18.Nc4 Bb7 {??} {This loses badly.} {+1.18} ( 18...Rb8 19.Rxf8 Bxf8 20.Rf1 Kg8 {+0.58} 21.Bf4 Rb7 {White\'s advantage is minimal} ) 19.Nxb6 Rxf1+ 20.Rxf1 Rf8 {This just accelerates the loss.} 21.Rxf8 Bxf8 22.Nd7 Bg7 23.Nxc5 Bc8 24.c3 Be5 25.Nf2 h5 26.Nfd3 Bc7 27.Kf2 e5 28.Bg5 Nc6 29.b4 Kg7 30.Ne1 Bb6 31.Ke2 Bxc5 32.bxc5 Kf7 {?!} ( 32...a5 {This at least makes it harder to consolidate the Q-side.} ) 33.b4 Ke6 34.Nd3 Kd7 {?} {This enables White to tie up Black\'s entire army (almost)} 35.Bf6 Ke6 36.Bh8 ( 36.Bg7 {%02\'better is\'} ) Bd7 37.Bg7 Be8 38.h4 Bd7 39.Kd2 Be8 40.c4 Bd7 41.Kc3 {The K will support the advance of the pawns.} Be8 42.b5 axb5 43.cxb5 1-0',

	complProps: 	{
				'Date': "1890.02.25",
				'White': "Blumenschein, E..",
				'Black': "Smith, W.H..",
				'Result': "*",
				'Annotator': "Reeh,Oliver",
				'SetUp': "1",
				'FEN': "r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1",
				'PlyCount': "9",
				'SourceDate': "2009.06.14",
				'Event': "?",
				'Site': "?",
				'Round': "?"
				},
				
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
				
	trickySt:	'[Event \"Dayton\"][Site \"?\"][Date \"1890.02.25\"][Round \"?\"][White \"Blumenschein, E..\"][Black \"Smith, W.H..\"][Result \"*\"][Annotator \"Reeh,Oliver\"][SetUp \"1\"][FEN \"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1\"][PlyCount \"9\"][SourceDate \"2009.06.14\"]________________ 1. Bxg7+ $1 Kxg7 2. Qh6+ $3 _____________________________________________________________________ Kxh6 ______________________________ 3. Nf5+ Kg5 4. Ne4+ Kg4 5. Rh4# * _____________________________________________________________________________________________________________________________________________________________________________________________________________',
	trickySNC:	'[Event \"Dayton\"][Site \"?\"][Date \"1890.02.25\"][Round \"?\"][White \"Blumenschein, E..\"][Black \"Smith, W.H..\"][Result \"*\"][Annotator \"Reeh,Oliver\"][SetUp \"1\"][FEN \"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1\"][PlyCount \"9\"][SourceDate \"2009.06.14\"] 1. Bxg7+ $1 Kxg7 2. Qh6+ $3  Kxh6  3. Nf5+ Kg5 4. Ne4+ Kg4 5. Rh4# * ',
	trickyIntro:	'3)c is correct',
	trickyPost:	'or 5.Ne3++. This brilliancy was published far more than 100 years ago - in May 1890 on page 155 of International Chess Magazine. (Source: "A Chess Omnibus", Edward Winter, Russel Enterprises, Inc., 2003)',

	evilSt:		'[Event \"Dayton\"][Site \"?\"]\n[Date \"1890.02.25\"]\n[Round \"?\"]\n[White \"Blumenschein, E..\"]\n[Black \"Smith, W.H..\"]\n[Result \"*\"]\n[Annotator \"Reeh,Oliver\"]\n[SetUp \"1\"]\n[FEN \"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1\"]\n[PlyCount \"9\"]\n[SourceDate \"2009.06.14\"]\n____________________________________________________________________________________________________________________________________________________________ _____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
	evilSNC:	'[Event \"Dayton\"][Site \"?\"]\n[Date \"1890.02.25\"]\n[Round \"?\"]\n[White \"Blumenschein, E..\"]\n[Black \"Smith, W.H..\"]\n[Result \"*\"]\n[Annotator \"Reeh,Oliver\"]\n[SetUp \"1\"]\n[FEN \"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1\"]\n[PlyCount \"9\"]\n[SourceDate \"2009.06.14\"]\n ',

    nestedSt:   '[Event "UW Winter Open"][Site "Madison"][Date "2003.02.01"][Round "1"][White "Walker Arlen P"][Black "Lopez Eugene"][Result "1-0"][ECO "B23"][WhiteElo "0"][BlackElo "0"][Annotator "Walker Arlen P"][Source ""][Remark ""]1.e4 g6 2.Nc3 Bg7 3.Bc4 ______ ____________________________________________________________________________________________________________________________________________________ ___________________ c5 4.f4 Nc6 5.Nf3 e6 6.f5 Nge7 7.fxe6 fxe6 8.O-O _______ _______ ___________________________________________________ O-O 9.d3 h6 _______________________________________________________________________________________________ 10.Be3?? _________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________ ____________________________________________________________________________________________________________________________________________________________________________________________________________ Nd4 _______ ___________________________________________________________ 11.Qd2 _______ Kh7 _______ ____________________________________________________________________________________________________ 12.Rae1 _______ __________________________________________ a6 ______ _____________________________________________ 13.Nd1 d5 14.Bb3 _______ _______________________ Nxb3 15.axb3 _______ dxe4 _______ ___________ 16.dxe4 _______ Qxd2 _______ ___________________________________________ 17.Nxd2 b6 18.Nc4 Bb7 ____ ___________________ _______ ______________________________________________________________________________________ 19.Nxb6 Rxf1+ 20.Rxf1 Rf8 _________________________________ 21.Rxf8 Bxf8 22.Nd7 Bg7 23.Nxc5 Bc8 24.c3 Be5 25.Nf2 h5 26.Nfd3 Bc7 27.Kf2 e5 28.Bg5 Nc6 29.b4 Kg7 30.Ne1 Bb6 31.Ke2 Bxc5 32.bxc5 Kf7 ____ ______________________________________________________________________ 33.b4 Ke6 34.Nd3 Kd7 ___ ___________________________________________________________ 35.Bf6 Ke6 36.Bh8 ___________________________ Bd7 37.Bg7 Be8 38.h4 Bd7 39.Kd2 Be8 40.c4 Bd7 41.Kc3 ______________________________________________ Be8 42.b5 axb5 43.cxb5 1-0',
    nestedSNC:  '[Event "UW Winter Open"][Site "Madison"][Date "2003.02.01"][Round "1"][White "Walker Arlen P"][Black "Lopez Eugene"][Result "1-0"][ECO "B23"][WhiteElo "0"][BlackElo "0"][Annotator "Walker Arlen P"][Source ""][Remark ""]1.e4 g6 2.Nc3 Bg7 3.Bc4    c5 4.f4 Nc6 5.Nf3 e6 6.f5 Nge7 7.fxe6 fxe6 8.O-O    O-O 9.d3 h6  10.Be3??   Nd4   11.Qd2  Kh7   12.Rae1   a6   13.Nd1 d5 14.Bb3   Nxb3 15.axb3  dxe4   16.dxe4  Qxd2   17.Nxd2 b6 18.Nc4 Bb7     19.Nxb6 Rxf1+ 20.Rxf1 Rf8  21.Rxf8 Bxf8 22.Nd7 Bg7 23.Nxc5 Bc8 24.c3 Be5 25.Nf2 h5 26.Nfd3 Bc7 27.Kf2 e5 28.Bg5 Nc6 29.b4 Kg7 30.Ne1 Bb6 31.Ke2 Bxc5 32.bxc5 Kf7   33.b4 Ke6 34.Nd3 Kd7   35.Bf6 Ke6 36.Bh8  Bd7 37.Bg7 Be8 38.h4 Bd7 39.Kd2 Be8 40.c4 Bd7 41.Kc3  Be8 42.b5 axb5 43.cxb5 1-0',

	setUp: function() {},
	
	tearDown: function() {},
	
	"test with incomplete PGN file":	function() {
		pgn = new Pgn(this.incPGN);
		
		assertEquals( this.complProps, pgn.props );
		assertArray( pgn.moves );
		assertEquals( 5, pgn.moves.length );
		assertEquals( 0, pgn.currentMove );
		assertEquals( 0, pgn.skip );
		assertEquals( this.incPGN, pgn.pgnOrig );
	},
	
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
	
	"test for stripping comments in nested PGN": function() {
		pgn = new Pgn(this.goodPGN);
		
		assertEquals( this.nestedSNC, pgn.stripIt( this.nestedPGN, true ) );
	},
	
	"test for blanking comments in nested PGN": function() {
		pgn = new Pgn(this.goodPGN);
		
		assertEquals( this.nestedSt, pgn.stripIt( this.nestedPGN ) );
	},
	
	"test for stripping comments in bad PGN": function() {
		pgn = new Pgn(this.goodPGN);
		
		assertEquals( this.evilSNC, pgn.stripItBroken( this.evilPGN, true ) );
	},
	
	"test for pulling introductory comment in tricky PGN": function() {
		pgn = new Pgn(this.trickyPGN);
		
		assertEquals( this.trickyIntro, pgn.gameIntro );
	},
	
	"test for pulling postgame comment in tricky PGN": function() {
		pgn = new Pgn(this.trickyPGN);
		
		assertEquals( this.trickyPost, pgn.postGame );
	}
});