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
	}
	

});