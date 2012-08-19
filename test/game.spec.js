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
            /*:DOC += <div><div id="game1"></div><div id="game1_board"></div><div id="testmoves"></div></div> */
		
    			var movediv = document.getElementById("game1");

    			movediv.innerHTML = goodPGN;
				this.game = new MarshallPGN.Game("game1");
			});
			afterEach(function () {
                var boardDiv = document.getElementById("game1_board");
                while (boardDiv.firstChild) {
                    boardDiv.removeChild(boardDiv.firstChild);
                }
            });
			
			it("should have produced forsythe notation after first move", function(){
				expect(this.game.pgn.moveTree.next.position).
					toBe("r3qr1k/ppp1nbBB/1b1p4/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1");
			});
			
			it("should have produced forsythe notation of final position", function(){
				expect(this.game.pgn.moveTree.goEnd().position).
					toBe("r3qr2/ppp1nb1B/1b1p4/4pN2/3PNnkR/2P5/PP4PP/R5K1 w - - 0 1");
			});
		});
	});

    describe("Parsing a game", function() {
        var aGame = "[Event	\"Golden Knights\"]" +
                "[Site	\"correspondence\"]\n" +
                "[Date	\"1993.?.?\"]\n" +
                "[Round	\"15\"]\n" +
                "[White	\"Abramson\"]\n" +
                "[Black	\"Good\"]\n" +
                "[Result	\"1-0\"]\n" +
                "1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.c3 Nf6 5.e5 Ne4 6.Qe2 f5 " +
                "7.exf6 d5 8.Nbd2 d3 9.Qe3 Bc5 10.fxg7 Rg8 11.Nd4 Bxd4 " +
                "12.cxd4 Bf5 13.Bxd3 Qe7 14.Bb5 O-O-O 15.Bxc6 bxc6 " +
                "16.Nxe4 Bxe4 17. f3 $6 (17. O-O $5 Qxg7) (17. Qh3+) Qxg7 $1 *";

        beforeEach(function(){
        /*:DOC += <div><div id="game1"></div><div id="game1_board"></div></div> */
    
            var movediv = document.getElementById("game1");
			movediv.innerHTML = aGame;
            this.game = new MarshallPGN.Game("game1");
        });
        afterEach(function () {
            var boardDiv = document.getElementById("game1_board"),
                movediv = document.getElementById("game1");
            while (boardDiv.firstChild) {
                boardDiv.removeChild(boardDiv.firstChild);
            }
            while (movediv.firstChild) {
                movediv.removeChild(movediv.firstChild);
            }
        });
        
        it("should have produced forsythe notation after first move", function(){
            expect(this.game.pgn.moveTree.next.position).
                toBe("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1");
        });
        
        it("should have produced forsythe notation of final position", function(){
            expect(this.game.pgn.moveTree.goEnd().position).
                toBe("2kr2r1/p1p3qp/2p5/3p4/3P4/4QP2/PP4PP/R1B1K2R w KQkq - 0 1");
        });
        it("should have produced forsythe notation of variation", function(){
            expect(this.game.pgn.moveTree.goEnd().previous.down.position).
                toBe("2kr2r1/p1p1q1Pp/2p5/3p4/3P4/4Q3/PP3PPP/R1B2RK1 w KQkq - 0 1");
        });
        it("should have produced last move of game", function(){
            expect(this.game.pgn.moveTree.goEnd().text).
                toBe("Qxg7!");
        });
    });

    describe("Parsing a game from alternative PGN source", function() {
        var aGame = "[Event	\"Golden Knights\"]" +
                "[Site	\"correspondence\"]\n" +
                "[Date	\"1993.?.?\"]\n" +
                "[Round	\"15\"]\n" +
                "[White	\"Abramson\"]\n" +
                "[Black	\"Good\"]\n" +
                "[Result	\"1-0\"]\n" +
                "1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.c3 Nf6 5.e5 Ne4 6.Qe2 f5 " +
                "7.exf6 d5 8.Nbd2 d3 9.Qe3 Bc5 10.fxg7 Rg8 11.Nd4 Bxd4 " +
                "12.cxd4 Bf5 13.Bxd3 Qe7 14.Bb5 O-O-O 15.Bxc6 bxc6 " +
                "16.Nxe4 Bxe4 17. f3 $6 (17. O-O $5 Qxg7) (17. Qh3+) Qxg7 $1 *";

        beforeEach(function(){
        /*:DOC += <div><div id="game1_board"></div></div> */
            var movediv = document.getElementById("game1_board");
    
            movediv.setAttribute("data-pgn", aGame);
            this.game = new MarshallPGN.Game("game1_board");
        });
        afterEach(function () {
            var movediv = document.getElementById("game1_board");
            while (movediv.firstChild) {
                movediv.removeChild(movediv.firstChild);
            }
        });
        it("should have produced forsythe notation after first move", function(){
            expect(this.game.pgn.moveTree.next.position).
                toBe("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1");
        });
        
        it("should have produced forsythe notation of final position", function(){
            expect(this.game.pgn.moveTree.goEnd().position).
                toBe("2kr2r1/p1p3qp/2p5/3p4/3P4/4QP2/PP4PP/R1B1K2R w KQkq - 0 1");
        });
        it("should have produced forsythe notation of variation", function(){
            expect(this.game.pgn.moveTree.goEnd().previous.down.position).
                toBe("2kr2r1/p1p1q1Pp/2p5/3p4/3P4/4Q3/PP3PPP/R1B2RK1 w KQkq - 0 1");
        });
        it("should have produced last move of game", function(){
            expect(this.game.pgn.moveTree.goEnd().text).
                toBe("Qxg7!");
        });
    });
})();