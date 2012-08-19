(function () {
	describe("Pieces", function () {
		beforeEach(function () {
		});
		it(" Should create a White Knight", function () {
		    var piece = new MarshallPGN.Piece("N");
			expect(piece.color).toBe("white");
			expect(piece.symbol).toBe("N");
		});
		it(" Should create a Black Queen", function () {
		    var piece = new MarshallPGN.Piece("q");
			expect(piece.color).toBe("black");
			expect(piece.symbol).toBe("q");
		});
		describe("Movements", function () {
			beforeEach(function () {
			});
			it(" Should find the Nc3 cannot possibly move to e5", function () {
				var vBoard = new MarshallPGN.VBoard("k7/8/8/8/1b6/2N5/8/4K3"),
			        piece = new MarshallPGN.Piece("N");
				expect(piece.isPossible(vBoard, 33, 55)).toBe(false);
			});
			it(" Should find the Nb1 can possibly go to c4", function () {
				var vBoard = new MarshallPGN.VBoard(),
			        piece = new MarshallPGN.Piece("N");
				expect(piece.isPossible(vBoard, 12, 43)).toBe(true);
			});
			it(" Should find the Nb1 can go to c3", function () {
				var vBoard = new MarshallPGN.VBoard(),
			        piece = new MarshallPGN.Piece("N");
				expect(piece.isLegal(vBoard, 12, 33)).toBe(true);
			});
			it(" Should find the Ng1 cannot go to c3", function () {
				var vBoard = new MarshallPGN.VBoard(),
			        piece = new MarshallPGN.Piece("N");
				expect(piece.isLegal(vBoard, 17, 33)).toBe(false);
			});
			it(" Should find the Nc3 cannot go to d5", function () {
				var vBoard = new MarshallPGN.VBoard("k7/8/8/8/1b6/2N5/8/4K3"),
			        piece = new MarshallPGN.Piece("N");
				expect(piece.isLegal(vBoard, 33, 54)).toBe(false);
			});
			it(" Should find Ba1 cannot go to b3", function () {
				var vBoard = new MarshallPGN.VBoard("k6B/8/8/8/8/8/8/7K"),
				    piece = new MarshallPGN.Piece("B");
				expect(piece.isLegal(vBoard, 11, 32)).toBe(false);
			});
			it(" Should find Bb8 cannot go to a7", function () {
				var vBoard = new MarshallPGN.VBoard("kb5R/8/8/8/8/8/8/7K"),
				    piece = new MarshallPGN.Piece("b");
				expect(piece.isLegal(vBoard, 82, 71)).toBe(false);
			});
			it(" Should find Bb8 can go to e5", function () {
				var vBoard = new MarshallPGN.VBoard("kb6/8/8/8/8/8/8/7K"),
				    piece = new MarshallPGN.Piece("b");
				expect(piece.isLegal(vBoard, 82, 55)).toBe(true);
			});
			it(" Should find Ra1 cannot go to b3", function () {
				var vBoard = new MarshallPGN.VBoard("k6R/8/8/8/8/8/8/7K"),
				    piece = new MarshallPGN.Piece("R");
				expect(piece.isLegal(vBoard, 11, 32)).toBe(false);
			});
			it(" Should find Rb7 cannot go to a7", function () {
				var vBoard = new MarshallPGN.VBoard("k7/1r6/8/8/8/8/8/6KB"),
				    piece = new MarshallPGN.Piece("r");
				expect(piece.isLegal(vBoard, 72, 71)).toBe(false);
			});
			it(" Should find Rb7 can go to b5", function () {
				var vBoard = new MarshallPGN.VBoard("kb6/8/8/8/8/8/8/7K"),
				    piece = new MarshallPGN.Piece("r");
				expect(piece.isLegal(vBoard, 72, 52)).toBe(true);
			});
			it(" Should find Qa1 cannot go to b3", function () {
				var vBoard = new MarshallPGN.VBoard("k6Q/8/8/8/8/8/8/7K"),
				    piece = new MarshallPGN.Piece("Q");
				expect(piece.isLegal(vBoard, 11, 32)).toBe(false);
			});
			it(" Should find Qb7 cannot go to a7", function () {
				var vBoard = new MarshallPGN.VBoard("k7/1q6/8/8/8/8/8/6KB"),
				    piece = new MarshallPGN.Piece("q");
				expect(piece.isLegal(vBoard, 72, 71)).toBe(false);
			});
			it(" Should find Qb7 can go to e4", function () {
				var vBoard = new MarshallPGN.VBoard("kb6/8/8/8/8/8/8/6K1"),
				    piece = new MarshallPGN.Piece("q");
				expect(piece.isLegal(vBoard, 72, 45)).toBe(true);
			});
		});
	});
} ());