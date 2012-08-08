(function (){

	describe("Virtual Board", function () {
	    var blackPawn = { piece : 'pawn', color : 'black' },
	    	blackKnight = { piece : 'knight', color : 'black' },
	    	blackBishop = { piece : 'bishop', color : 'black' },
	    	blackRook = { piece : 'rook', color : 'black' },
	    	blackKing = { piece : 'king', color : 'black' },
	    	blackQueen = { piece : 'queen', color : 'black' },
	    	whitePawn = { piece : 'pawn', color : 'white' },
	    	whiteKnight = { piece : 'knight', color : 'white' },
	    	whiteBishop = { piece : 'bishop', color : 'white' },
	    	whiteRook = { piece : 'rook', color : 'white' },
	    	whiteKing = { piece : 'king', color : 'white' },
	    	whiteQueen = { piece : 'queen', color : 'white' },
	    	empty = { piece : 'empty', color : null};

		describe("Working with squares", function () {
			beforeEach(function () {
			    this.vBoard = new VBoard();
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
                expect(this.vBoard.exists("56")).toBe(true);
            });
            it("should find the square h9 doesn't exist", function () {
                expect(this.vBoard.exists("h9")).toBe(false);
            });
            it("should find the square 98 doesn't exist", function () {
                expect(this.vBoard.exists("98")).toBe(false);
            });
            it(" Should be able to clear square a8", function () {
            	expect(this.vBoard.isOccupied("a8")).toBe(true);
            	this.vBoard.clear("a8");
            	expect(this.vBoard.isOccupied("a8")).toBe(false);
            });
		});
		describe("Working with FEN", function () {
		    beforeEach(function () {
		        var start = 
		"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1";
		        this.vBoard = new VBoard(start);
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
		"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1P1N/2P4R/PP1N2PP/R5K1 w - - 0 1"
		        );
		    });
		});
	});
}) ();