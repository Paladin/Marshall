(function(){

	describe("Forsythe Notation From vBoard", function() {
		describe("using FEN setup", function() {
			var goodPGN = "[Event \"Dayton\"]" +
						"[Site \"?\"]\n" +
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
						"{In this position White has a beautiful focred mate in five, so answer C is correct:} 1. Bxg7+ $1 Kxg7 2. Qh6+ $3 {The point - Black's king is dragged into a	discovered double-check.} Kxh6 (2... Kh8 3. Bg6+ Kg8 4. Qh7#) 3. Nf5+ Kg5 4. Ne4+ Kg4 5. Rh4# {or 5.Ne3++. This brilliancy was published far more than 100 years ago - in May 1890 on page 155 of International Chess Magazine. (Source: \"A Chess Omnibus\", Edward Winter, Russel Enterprises, Inc., 2003)} *";
	
			beforeEach(function(){
				this.pgn = new Pgn( goodPGN );
				this.conv = new Converter(this.pgn);
				this.conv.convert();
			});
			
			it("should have produced forsythe notation after first move", function(){
				expect(this.conv.moves[0].position).
					toBe("r3qr1k/ppp1nbBB/1b1p4/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1");
			});
			
			it("should have produced forsythe notation of final position", function(){
				expect(this.conv.moves[this.conv.moves.length-2].position).
					toBe("r3qr2/ppp1nb1B/1b1p4/4pN2/3PNnkR/2P5/PP4PP/R5K1 w - - 0 1");
			});
		});
	
		describe("Using Normal setup", function() {
			var aGame = "[Event	\"Dayton\"]" +
					"[Site	\"?\"]\n" +
					"[Date	\"1890.02.25\"]\n" +
					"[Round	\"?\"]\n" +
					"[White	\"NoName\"]\n" +
					"[Black	\"Amateur\"]\n" +
					"[Result	\"1-0\"]\n" +
					"{The Scholar's Mate} 1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 {Here it comes} 4. Qf7#";
	
			beforeEach(function(){
				this.pgn = new Pgn( aGame );
				this.conv = new Converter(this.pgn);
				this.conv.convert();
			});
			
			it("should have produced forsythe notation after first move", function(){
				expect(this.conv.moves[0].position).
					toBe("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1");
			});
			
			it("should have produced forsythe notation of final position", function(){
				expect(this.conv.moves[this.conv.moves.length-2].position).
					toBe("r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1");
			});
		});
	});
})();