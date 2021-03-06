(function (){

	describe("Virtual Board", function () {
	    var blackPawn = { piece : 'pawn', color : 'black', symbol: "p" },
	    	blackKnight = { piece : 'knight', color : 'black', symbol: "n" },
	    	blackBishop = { piece : 'bishop', color : 'black', symbol: "b" },
	    	blackRook = { piece : 'rook', color : 'black', symbol: "r" },
	    	blackKing = { piece : 'king', color : 'black', symbol: "k" },
	    	blackQueen = { piece : 'queen', color : 'black', symbol: "q" },
	    	whitePawn = { piece : 'pawn', color : 'white', symbol: "P" },
	    	whiteKnight = { piece : 'knight', color : 'white', symbol: "N" },
	    	whiteBishop = { piece : 'bishop', color : 'white', symbol: "B" },
	    	whiteRook = { piece : 'rook', color : 'white', symbol: "R" },
	    	whiteKing = { piece : 'king', color : 'white', symbol: "K" },
	    	whiteQueen = { piece : 'queen', color : 'white', symbol: "Q" },
	    	empty = { piece : 'empty', color : null};

		describe("Working with squares", function () {
			beforeEach(function () {
			    this.vBoard = new MarshallPGN.VBoard();
			});

			it('should be able to translate standard algebraic f2', function () {
				expect(this.vBoard.algebraic2Index('f2')).toBe(26);
			});
			it('should be able to translate standard algebraic h9', function () {
				expect(this.vBoard.algebraic2Index('h9')).toBe(0);
			});
			it("should be able to translate index 35 to e3", function () {
			    expect(this.vBoard.index2Algebraic(35)).toBe("e3");
			});
			it("should not be able to translate index 93", function () {
			    expect(this.vBoard.index2Algebraic(93)).toBe("");
			});
		    it("should have a black knight on g8", function () {
		        expect(this.vBoard.whatsOn("g8")).toEqual(blackKnight);
		    });
		    it("should have a white pawn on c2", function () {
		        expect(this.vBoard.whatsOn("c2")).toEqual(whitePawn);
		    });
            it("should set a white Queen on d5", function () {
                this.vBoard.place("Q", "d5");
                expect(this.vBoard.whatsOn("d5")).toEqual(whiteQueen);
            });
            it("should set a black Bishop on b6", function () {
                this.vBoard.place("b", "b6");
                expect(this.vBoard.whatsOn("b6")).toEqual(blackBishop);
            });
            it("should find Black knights on g8 and b8", function () {
                expect(this.vBoard.whereIs("n")).toEqual(["b8", "g8"]);
            });
            it("should find White Queen on d1", function () {
                expect(this.vBoard.whereIs("Q")).toEqual(["d1"]);
            });
            it("should find square d3 is open", function () {
                expect(this.vBoard.isOccupied("d3")).toBe(false);
            });
            it("should find square d2 is occupied", function () {
                expect(this.vBoard.isOccupied("d2")).toBe(true);
            });
            it("should find square a2 is occupied by White", function () {
                expect(this.vBoard.isOccupiedBy("a2")).toBe("white");
            });
            it("should find square a8 is occupied by Black", function () {
                expect(this.vBoard.isOccupiedBy("a8")).toBe("black");
            });
            it("should find square d4 is not occupied", function () {
                expect(this.vBoard.isOccupiedBy("d4")).toBe("");
            });
            it("should find the square d3 exists", function () {
                expect(this.vBoard.exists("d3")).toBe(true);
            });
            it("should find the square 56 exists", function () {
                expect(this.vBoard.exists(56)).toBe(true);
            });
            it("should find the square h9 doesn't exist", function () {
                expect(this.vBoard.exists("h9")).toBe(false);
            });
            it("should find the square 98 doesn't exist", function () {
                expect(this.vBoard.exists(98)).toBe(false);
            });
            it(" Should be able to clear square a8", function () {
            	expect(this.vBoard.isOccupied("a8")).toBe(true);
            	this.vBoard.clear("a8");
            	expect(this.vBoard.isOccupied("a8")).toBe(false);
            });
            it(" Should not find this a possible ep target", function () {
            	expect(this.vBoard.possibleEPTarget("e4")).
            	    toBe(false);
            });
            it(" Should find this a possible ep target", function () {
            	expect(this.vBoard.possibleEPTarget("e6")).
            	    toBe(true);
            });
            it(" Should ensure a number is an index", function () {
            	expect(this.vBoard.ensureIndex(11)).toBe(11);
            });
            it(" Should ensure a number is an index", function () {
            	expect(this.vBoard.ensureIndex("a4")).toBe(41);
            });
            it(" Should say a5 and g5 are on the same rank", function () {
            	expect(this.vBoard.isSameRank("a5", "g5")).toBe(true);
            });
            it(" Should say a4 and g5 are not on the same rank", function () {
            	expect(this.vBoard.isSameRank("a4", "g5")).toBe(false);
            });
            it(" Should say a5 and a1 are on the same file", function () {
            	expect(this.vBoard.isSameFile("a5", "a1")).toBe(true);
            });
            it(" Should say a4 and g5 are not on the same file", function () {
            	expect(this.vBoard.isSameFile("a4", "g5")).toBe(false);
            });
            it(" Should say a8 and e4 are on the same diagonal", function () {
            	expect(this.vBoard.isSameDiagonal("a8", "e4")).toBe(true);
            });
            it(" Should say b1 and e4 are on the same diagonal", function () {
            	expect(this.vBoard.isSameDiagonal("b1", "e4")).toBe(true);
            });
            it(" Should say g8 and e4 are not on the same diagonal", function () {
            	expect(this.vBoard.isSameDiagonal("g8", "e4")).toBe(false);
            });
            it(" Should say b6 and e4 are on the same diagonal", function () {
            	expect(this.vBoard.isSameDiagonal("b6", "e4")).toBe(false);
            });
		});
		describe("Working with FEN", function () {
		    beforeEach(function () {
		        var start = 
		"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 10";
		        this.vBoard = new MarshallPGN.VBoard(start);
		    });
		    it("should have the pieces all set up properly", function () {
		        expect(this.vBoard.whatsOn("a8")).toEqual(blackRook);
		        expect(this.vBoard.whatsOn("e8")).toEqual(blackQueen);
		        expect(this.vBoard.whatsOn("f8")).toEqual(blackRook);
		        expect(this.vBoard.whatsOn("h8")).toEqual(blackKing);
		        expect(this.vBoard.whatsOn("a7")).toEqual(blackPawn);
		        expect(this.vBoard.whatsOn("b7")).toEqual(blackPawn);
		        expect(this.vBoard.whatsOn("c7")).toEqual(blackPawn);
		        expect(this.vBoard.whatsOn("e7")).toEqual(blackKnight);
		        expect(this.vBoard.whatsOn("f7")).toEqual(blackBishop);
		        expect(this.vBoard.whatsOn("g7")).toEqual(blackPawn);
		        expect(this.vBoard.whatsOn("h7")).toEqual(whiteBishop);
		        expect(this.vBoard.whatsOn("b6")).toEqual(blackBishop);
		        expect(this.vBoard.whatsOn("d6")).toEqual(blackPawn);
		        expect(this.vBoard.whatsOn("h6")).toEqual(whiteBishop);
		        expect(this.vBoard.whatsOn("e5")).toEqual(blackPawn);
		        expect(this.vBoard.whatsOn("h5")).toEqual(whiteQueen);
		        expect(this.vBoard.whatsOn("d4")).toEqual(whitePawn);
		        expect(this.vBoard.whatsOn("f4")).toEqual(blackKnight);
		        expect(this.vBoard.whatsOn("h4")).toEqual(whiteKnight);
		        expect(this.vBoard.whatsOn("c3")).toEqual(whitePawn);
		        expect(this.vBoard.whatsOn("h3")).toEqual(whiteRook);
		        expect(this.vBoard.whatsOn("a2")).toEqual(whitePawn);
		        expect(this.vBoard.whatsOn("b2")).toEqual(whitePawn);
		        expect(this.vBoard.whatsOn("d2")).toEqual(whiteKnight);
		        expect(this.vBoard.whatsOn("g2")).toEqual(whitePawn);
		        expect(this.vBoard.whatsOn("h2")).toEqual(whitePawn);
		        expect(this.vBoard.whatsOn("a1")).toEqual(whiteRook);
		        expect(this.vBoard.whatsOn("g1")).toEqual(whiteKing);
		    });
		    it("should return the modified position", function () {
		        this.vBoard.place("P", "f4");
		        expect(this.vBoard.getFEN()).toBe(
		"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1P1N/2P4R/PP1N2PP/R5K1 w - - 0 10"
		        );
		    });
		    it(" Should return the correct move number", function () {
		    	expect(this.vBoard.getMoveNumber()).toBe(10);
		    });
		});
		describe(" Answering Questions", function () {
			beforeEach(function () {
			});
            it(" Should find if black king is in check", function() {
                var vBoard = new MarshallPGN.VBoard("r1bqkbnr/pppp1Qp1/7p/4p3/2B1P3/8/" +
                    "PPPP1PPP/RNB1K1NR b KQkq - 0 4");
                expect(vBoard.isCheck("black")).toBe(true);
            });
            it(" Should find check from rook", function() {
                var vBoard = new MarshallPGN.VBoard("r6K/8/8/8/8/8/8/7k w - - 0 13");
                expect(vBoard.isCheck("white")).toBe(true);
            });
            it(" Should find check from rook (right)", function() {
                var vBoard = new MarshallPGN.VBoard("K6r/8/8/8/8/8/8/7k w - - 0 13");
                expect(vBoard.isCheck("white")).toBe(true);
            });
            it(" Should find check from rook (up)", function() {
                var vBoard = new MarshallPGN.VBoard("K6R/8/8/8/8/8/8/7k b - - 0 13");
                expect(vBoard.isCheck("black")).toBe(true);
            });
            it(" Should find check from rook (down)", function() {
                var vBoard = new MarshallPGN.VBoard("K6k/8/8/8/8/8/8/7R b - - 0 13");
                expect(vBoard.isCheck("black")).toBe(true);
            });
            it(" Should find check from bishop (ul)", function() {
                var vBoard = new MarshallPGN.VBoard("B6K/8/8/8/8/8/8/7k b - - 0 13");
                expect(vBoard.isCheck("black")).toBe(true);
            });
            it(" Should find check from bishop (ur)", function() {
                var vBoard = new MarshallPGN.VBoard("k6b/8/8/8/8/8/8/K7 w - - 0 13");
                expect(vBoard.isCheck("white")).toBe(true);
            });
            it(" Should find check from queen (dl)", function() {
                var vBoard = new MarshallPGN.VBoard("k6K/8/8/8/8/8/8/q7 w - - 0 13");
                expect(vBoard.isCheck("white")).toBe(true);
            });
            it(" Should find check from queen (dr)", function() {
                var vBoard = new MarshallPGN.VBoard("K6k/8/8/8/8/8/8/7q w - - 0 13");
                expect(vBoard.isCheck("white")).toBe(true);
            });
	
            it(" Should find a knight to move to a square", function() {
                var vBoard = new MarshallPGN.VBoard("r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/" +
                    "2P4R/PP1N2PP/R5K1 w - - 0 13");
        
                expect(vBoard.findFromPiece("n", "c8", "", "black")).toBe("e7");
                expect(vBoard.findFromPiece("n", "c8", "e7", "black")).toBe("e7");
                expect(vBoard.findFromPiece("n", "h5", "", "black")).toBe("f4");
                expect(vBoard.findFromPiece("n", "h5", "f4", "black")).toBe("f4");
            });
            it(" Should find a rook to move to a square", function() {
                var vBoard = new MarshallPGN.VBoard("r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/" +
                    "2P4R/PP1N2PP/R5K1 w - - 0 13");
        
                expect(vBoard.findFromPiece("R", "b8", "", "black")).toBe("a8");
                expect(vBoard.findFromPiece("R", "b8", "a8", "black")).toBe("a8");
            });
            it(" Should find a queen to move to a square", function() {
                var vBoard = new MarshallPGN.VBoard("r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/" +
                    "2P4R/PP1N2PP/R5K1 w - - 0 13");
        
                expect(vBoard.findFromPiece("Q", "d7", "", "black")).toBe("e8");
                expect(vBoard.findFromPiece("Q", "d7", "e8", "black")).toBe("e8");
            });
            it(" Should find the Bishop to move to a square", function() {
                var vBoard = new MarshallPGN.VBoard("r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/" +
                    "2P4R/PP1N2PP/R5K1 w - - 0 13");
        
                expect(vBoard.findFromPiece("B", "f5", "", "white")).toBe("h7");
                expect(vBoard.findFromPiece("B", "f5", "h7", "white")).toBe("h7");
            });
            it(" Should find the pawn to move to a square", function() {
                var vBoard = new MarshallPGN.VBoard("r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/" +
                    "2P4R/PP1N2PP/R5K1 w - - 0 13");
        
                expect(vBoard.findFromPawn("a5", "", "black", false)).toBe("a7");
                expect(vBoard.findFromPawn("a6", "", "black", false)).toBe("a7");
            });
            it(" Should find the line a1-h8 clear for white", function () {
            	var vBoard = new MarshallPGN.VBoard("7k/8/8/8/8/8/8/BK6");
            	expect(vBoard.isLineClear("a1", "h8", "white")).toBe(true);
            });
            it(" Should not find the line a1-h8 clear for black", function () {
            	var vBoard = new MarshallPGN.VBoard("7k/8/8/8/8/8/8/qK6");
            	expect(vBoard.isLineClear("a1", "h8", "white")).toBe(true);
            });
		});
		describe("Moving", function () {
			beforeEach(function () {
				this.vBoard = new MarshallPGN.VBoard(
				    "rnbqkb1r/pp2pppp/2p2n2/3p2B1/3PP3/5N2/PPP2PPP/RN1QKB1R"
				);
			});
			it(" Should move the correct (b8) Knight", function () {
				expect(this.vBoard.findFromPiece("N", "d7", "b", "black")).
				    toBe("b8");
			});
			it(" Should find the correct from square (d6)", function () {
				expect(this.vBoard.whichPiece("d", ["d6", "e7"])).toBe("d6");
			});
			it(" Should find the correct from square (f5)", function () {
				expect(this.vBoard.whichPiece("5", ["f5", "f4"])).toBe("f5");
			});
		});
	});
}) ();