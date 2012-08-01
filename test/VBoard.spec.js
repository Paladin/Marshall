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
		
		describe("Setting it up", function () {
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

	});
})();