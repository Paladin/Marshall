(function (){

	describe("Virtual Board", function () {
		describe("Square Addresses", function () {

			beforeEach(function () {
			    this.vBoard = new VBoard();
			});

			it('should be able to translate standard algebraic f2', function () {
				expect(this.vBoard.algebraic2Index('f2')).toBe(26);
			});

			it('should be able to translate standard algebraic j9', function () {
				expect(this.vBoard.algebraic2Index('j9')).toBe(0);
			});

		});
		
		describe("Setting up 'normal' position", function () {
		    beforeEach(function () {
		        this.vBoard = new VBoard();
		    });
		    it("should have a black knight on g8", function () {
		        expect(this.vBoard.whatsOn("g8")).toBe("n");
		    });
		    it("should have a white pawn on c2", function () {
		        expect(this.vBoard.whatsOn("c2")).toBe("P");
		    });
		});
		
		describe("Setting up midgame position", function () {
		    beforeEach(function () {
		        var start = 
		"r3qr1k/ppp1nbpB/1b1p3B/4p2Q/3P1n1N/2P4R/PP1N2PP/R5K1 w - - 0 1";
		        this.vBoard = new VBoard(start);
		    });
		    it("should have the pieces all set up properly", function () {
		        expect(this.vBoard.whatsOn("a8")).toBe("r");
		        expect(this.vBoard.whatsOn("e8")).toBe("q");
		        expect(this.vBoard.whatsOn("f8")).toBe("r");
		        expect(this.vBoard.whatsOn("h8")).toBe("k");
		        expect(this.vBoard.whatsOn("a7")).toBe("p");
		        expect(this.vBoard.whatsOn("b7")).toBe("p");
		        expect(this.vBoard.whatsOn("c7")).toBe("p");
		        expect(this.vBoard.whatsOn("e7")).toBe("n");
		        expect(this.vBoard.whatsOn("f7")).toBe("b");
		        expect(this.vBoard.whatsOn("g7")).toBe("p");
		        expect(this.vBoard.whatsOn("h7")).toBe("B");
		        expect(this.vBoard.whatsOn("b6")).toBe("b");
		        expect(this.vBoard.whatsOn("d6")).toBe("p");
		        expect(this.vBoard.whatsOn("h6")).toBe("B");
		        expect(this.vBoard.whatsOn("e5")).toBe("p");
		        expect(this.vBoard.whatsOn("h5")).toBe("Q");
		        expect(this.vBoard.whatsOn("d4")).toBe("P");
		        expect(this.vBoard.whatsOn("f4")).toBe("n");
		        expect(this.vBoard.whatsOn("h4")).toBe("N");
		        expect(this.vBoard.whatsOn("c3")).toBe("P");
		        expect(this.vBoard.whatsOn("h3")).toBe("R");
		        expect(this.vBoard.whatsOn("a2")).toBe("P");
		        expect(this.vBoard.whatsOn("b2")).toBe("P");
		        expect(this.vBoard.whatsOn("d2")).toBe("N");
		        expect(this.vBoard.whatsOn("g2")).toBe("P");
		        expect(this.vBoard.whatsOn("h2")).toBe("P");
		        expect(this.vBoard.whatsOn("a1")).toBe("R");
		        expect(this.vBoard.whatsOn("g1")).toBe("K");
		    });
		    it("should have a white pawn on c3", function () {
		    });
		});

        describe("Setting a piece on a square", function () {
            beforeEach(function () {
                this.vBoard = new VBoard();
            });
            it("should set a white Queen on d5", function () {
                this.vBoard.place("Q", "d5");
                expect(this.vBoard.whatsOn("d5")).toBe("Q");
            });
            it("should set a black Bishop on b6", function () {
                this.vBoard.place("b", "b6");
                expect(this.vBoard.whatsOn("b6")).toBe("b");
            });
        });

	});
}) ();