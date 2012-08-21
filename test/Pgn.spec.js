(function () {
    var fullGame = "[Event \"None\"]" +
        "[Site \"Nowhere\"]" +
        "[Date \"2012.08.20\"]" +
        "[Round \"1\"]" +
        "[White \"U. N. Owen\"]" +
        "[Black \"Anon E. Moose\"]" +
        "[Result \"*\"]" +
        "[PlyCount \"22\"]" +
        "[ECO \"C21\"]" +
        "{A Goring Gambit line}" +
        "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. c3 dxc3 {Black is better advised" +
        " to treat this like a Two Knight's defense:} (4... Nf6 ( 4... Bc5 " +
        "5. Bc4 Nf6 6. cxd4 Bb4+ 7. Nc3 Nxe4 8. O-O) 5. e5 Ne4 6. cxd4) 5. Bc4" +
        " cxb2 6. Bxb2 Bb4+ 7. Nc3 Nf6 8. Qc2 (8. e5 Ne4 (8... Ng5) 9. Qc2)" +
        " 8... O-O 9. O-O-O a6 10. e5 d5 11. exd6 Bxd6  *";

    var incompleteTags = "[Event \"Waukesha Team\"]" +
        "[Site \"Waukesha\"]" +
        "[Date \"2001.07.11\"]" +
        "[White \"Walker\"]" +
        "[Black \"Coons\"]" +
        "[Result \"1-0\"]" +
        "[SourceDate	\"2009.06.14\"]";

    var withCommentary = "[Event \"testing\"]" +
        "[Site \"lab\"]" +
        "[Date \"2001.07.11\"]" +
        "[Round \"1\"]" +
        "[White \"Walker\"]" +
        "[Black \"Anon\"]" +
        "[Result \"1-0\"]" +
        "{Bad Opening play}" +
        "1. e4 e5 2. f4 f6 {This should not be moved this early in the game}" +
        "( 2... Nf6 ) (2... d5 3. exd5 e4 ( 3...exf5 4.Nf3 ) 4 c3) 3. fxe5" +
        " fxe5 4. Qh5+ Ke7 5. Qe5+ Kf7 6.Bc4+ Kg6 7. Qf5# 1-0";

    describe("Parsing PGN input", function () {
    	beforeEach(function () {
    	});
        describe("Parsing tags", function () {
            beforeEach(function () {
                this.pgn = new MarshallPGN.Pgn(fullGame);
            });
            it(" Should get the tag count correct", function () {
                expect(9).toBe(Object.keys(this.pgn.props).length);
            });
            it(" Should correctly name White", function () {
                expect("U. N. Owen").toBe(this.pgn.props.White);
            });
            it(" Should correctly name Black", function () {
                expect("Anon E. Moose").toBe(this.pgn.props.Black);
            });
            it(" Should correctly name the Event", function () {
                expect("None").toBe(this.pgn.props.Event);
            });
            it(" Should correctly name the Site", function () {
                expect("Nowhere").toBe(this.pgn.props.Site);
            });
            it(" Should correctly name the Date", function () {
                expect("2012.08.20").toBe(this.pgn.props.Date);
            });
            it(" Should correctly name the Round", function () {
                expect("1").toBe(this.pgn.props.Round);
            });
            it(" Should correctly name the ECO", function () {
                expect("C21").toBe(this.pgn.props.ECO);
            });
            it(" Should correctly identify the result", function () {
                expect("*").toBe(this.pgn.props.Result);
            });
            it(" Should correctly name the PlyCount", function () {
                expect("22").toBe(this.pgn.props.PlyCount);
            });
        });
        describe("Parsing incomplete tag set", function () {
            beforeEach(function () {
                this.pgn = new MarshallPGN.Pgn(incompleteTags);
            });
            it(" Should get the tag count correct", function () {
                expect(8).toBe(Object.keys(this.pgn.props).length);
            });
            it(" Should correctly name White", function () {
                expect("Walker").toBe(this.pgn.props.White);
            });
            it(" Should correctly name Black", function () {
                expect("Coons").toBe(this.pgn.props.Black);
            });
            it(" Should correctly name the Event", function () {
                expect("Waukesha Team").toBe(this.pgn.props.Event);
            });
            it(" Should correctly name the Site", function () {
                expect("Waukesha").toBe(this.pgn.props.Site);
            });
            it(" Should correctly name the Date", function () {
                expect("2001.07.11").toBe(this.pgn.props.Date);
            });
            it(" Should correctly name the Round", function () {
                expect("?").toBe(this.pgn.props.Round);
            });
            it(" Should correctly identify the result", function () {
                expect("1-0").toBe(this.pgn.props.Result);
            });
            it(" Should correctly name the Source Date", function () {
                expect("2009.06.14").toBe(this.pgn.props.SourceDate);
            });
        });
        describe(" Parsing Moves", function () {
        	beforeEach(function () {
        		this.pgn = new MarshallPGN.Pgn(fullGame);
        	});
            it(" Should have created some moves", function () {
                expect(this.pgn.moveTree.next).toNotBe(null);
            });
            it(" Should have created a move number", function () {
                expect(this.pgn.moveTree.next.number).toBeGreaterThan(0);
            });
            it(" Should start with move number 1", function () {
            	expect(this.pgn.moveTree.next.number).toBe(1);
            });
            it(" Should end with no result", function () {
            	expect(this.pgn.moveTree.goEnd().result).toBe("*");
            	expect(this.pgn.moveTree.goEnd().text).toBe("Bxd6");
            });
            it(" Should provide the correct move list", function () {
            	expect(this.pgn.moveTree.next.list()).toBe("1. e4 e5 2. Nf3 " +
            	    "Nc6 3. d4 exd4 4. c3 dxc3 5. Bc4 cxb2 6. Bxb2 Bb4+ " +
            	    "7. Nc3 Nf6 8. Qc2 O-O 9. O-O-O a6 10. e5 d5 11. exd6 Bxd6");
            });
            it(" Should have a game intro comment", function () {
                expect(this.pgn.moveTree.commentary[0]).
                    toBe("A Goring Gambit line");
            });
            it(" Should have a comment on black's fourth move", function () {
            	expect(this.pgn.moveTree.next.next.next.next.next.next.next.
            	    next.commentary.length).toBe(1);
            });
            it(" Should have this comment on Black's fourth", function () {
                var move = this.pgn.moveTree.next.next.next.next.next.next.
                    next.next;
            	expect(move.text).toBe("dxc3");
            	expect(move.commentary).toEqual(["Black is better advised to " +
            	    "treat this like a Two Knight's defense:"]);
            });
            it(" Should have found a variation on Black's fourth", function () {
            	expect(this.pgn.moveTree.next.next.next.next.next.next.
            	    next.next.down.text).toBe("Nf6");
            });
            it(" Should have a second variation", function () {
            	expect(this.pgn.moveTree.next.next.next.next.next.next.next.
            	    next.down.down.list()).
            	    toBe("4. ... Bc5 5. Bc4 Nf6 6. cxd4 Bb4+ 7. Nc3 Nxe4 8. O-O");
            });
            it(" Should find a sub variation to the second variation", function () {
            	expect(this.pgn.moveTree.next.next.next.next.next.next.next.
            	    next.next.next.next.next.next.next.next.down.next.down.
            	    list()).toBe("8. ... Ng5");
            });
            it(" Should find the right color on the first variation", function () {
            	expect(this.pgn.moveTree.next.next.next.next.next.next.next.
            	    next.down.color).toBe("black");
            });
            it(" Should have an initial destination of e4", function () {
            	expect(this.pgn.moveTree.next.destination).toBe("e4");
            });
        });
    });
} ());