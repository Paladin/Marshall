(function () {
    var tagsOnly = "[Event \"Waukesha Team\"]" +
        "[Site \"Waukesha\"]" +
        "[Date \"2001.07.11\"]" +
        "[Round \"1\"]" +
        "[White \"Walker\"]" +
        "[Black \"Coons\"]" +
        "[Result \"1-0\"]" +
        "[Annotator	\"Shredder\"]" +
        "[SetUp	\"1\"]" +
        "[PlyCount	\"9\"]" +
        "[SourceDate	\"2009.06.14\"]";

    var simpleMoves = "[Event \"testing\"]" +
        "[Site \"lab\"]" +
        "[Date \"2001.07.11\"]" +
        "[Round \"1\"]" +
        "[White \"Walker\"]" +
        "[Black \"Anon\"]" +
        "[Result \"1-0\"]" +
        "1. e4 e5 2. f4 f6 3. fxe5 fxe5 4. Qh5+ Ke7 5. Qe5+ Kf7 6.Bc4+ Kg6 7. Qf5# 1-0";

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

    var theXPGN = "[Event \"Waukesha Team\"]" +
        "[Site \"Waukesha\"]" +
        "[Date \"2001.07.11\"]" +
        "[Round \"1\"]" +
        "[White \"Walker\"]" +
        "[Black \"Coons\"]" +
        "[Result \"1-0\"]" +
        "[Annotator	\"Shredder\"]" +
        "[SetUp	\"1\"]" +
        "[PlyCount	\"9\"]" +
        "[SourceDate	\"2009.06.14\"]" +
        "{Opening commentary}" +
        "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. Bd3 Nc6 5. c3 Qc7 ;end of line\n" +
        "6. Ne2 { +0.58 6. Nf3 Bg4" +
        "7. O-O e6 8. Re1 Be7 9. h3 Bf5 10. Bxf5 exf5 } Bg4 { -0.30 6... Bd7 7. O-O Nf6" +
        "8. Bf4 e5 9. dxe5 Nxe5 10. b3 } 7. Bf4 { +0.38 7. f3 Bd7 8. Bf4 e5 9. dxe5 Nxe5" +
        "10. Ba6 Bc6 11. Nd4 } Bxe2 { +0.16 7... Qxf4 8. Nxf4 Bxd1 9. Kxd1 e6 10. b4 Bd6" +
        "11. Nh5 g6 12. b5 Nce7 13. Ng7 Kf8 } 8. Bxc7 { -0.09 8. Qd2 Qxf4 9. Qxf4 Bxd3" +
        "10. Na3 e6 11. O-O-O g6 12. Qc7 Be4 } Bxd1 9. Kxd1 Nf6 10. Nd2 e6 11. Nf3 {" +
        "-0.19 11. Be2 a6 12. Rc1 b5 13. Bf4 O-O-O 14. h4 Bd6 15. Bxd6 Rxd6 } Kd7 {" +
        "+0.39 11... Be7 12. Re1 Rc8 13. Bg3 O-O 14. Ne5 Nxe5 15. Bxe5 Ng4 } 12. Bg3 {" +
        "+0.34 12. Bf4 Ne4 13. Bxe4 dxe4 14. Ng5 f5 15. h4 Rc8 16. Rb1 } a6 { -0.26" +
        "12... Ne4 13. Rc1 Rc8 14. Nd2 Nxg3 15. hxg3 h5 16. f4 } 13. h3 { +0.46 13. Re1" +
        "Be7 14. h3 Nh5 15. Bh2 Rac8 16. g4 Nf6 17. Ne5 Ke8 } Bd6 { -0.29 13... Be7 14." +
        "Rc1 Ne4 15. Bxe4 dxe4 16. Nd2 f5 17. Nc4 Rae8 18. Re1 } 14. Ne5+ { +0.67 14." +
        "Bxd6 Kxd6 15. Re1 Rac8 16. Rc1 Ke7 17. Ne5 g5 18. Nf3 } Bxe5 15. dxe5 Ne8 {" +
        "-0.48 15... Nh5 16. Bh2 g5 17. Re1 Rac8 18. g4 Ng7 19. f4 h5 } 16. c4 { +0.56" +
        "16. Re1 Rc8 17. Rb1 f6 18. f4 fxe5 19. fxe5 } Nc7 { -0.23 16... d4 17. f4 f6" +
        "18. Rc1 } 17. Ke2 { +0.18 17. Rc1 d4 18. Re1 Rac8 19. a3 f5 20. f4 } Nb4 {" +
        "-0.05 17... f6 18. exf6 gxf6 19. Rhd1 d4 20. c5 Nd5 21. a4 h5 } 18. cxd5 {" +
        "+0.42 18. Rhd1 Nxd3 19. Rxd3 Rac8 20. b4 g5 21. a4 h5 } Nbxd5 { -0.38 18..." +
        "Ncxd5 19. Bc4 h5 20. a3 h4 21. axb4 hxg3 22. Bxd5 exd5 23. fxg3 Rae8 } 19. Be4" +
        "{ +0.59 19. Rac1 h5 20. Rhd1 Kc8 21. Bh2 Rd8 22. b3 f5 } Rac8 { -0.50 19... h5" +
        "20. Rac1 h4 21. Bh2 Rhd8 22. Rhd1 Rac8 23. a4 f5 24. exf6EP gxf6 } 20. Rhd1 Ke7" +
        "{ -0.79 20... h5 21. Rac1 Ke7 22. h4 Rhd8 23. a4 g6 24. Rc5 } 21. Bh4+ { +0.88" +
        "21. Rac1 h6 22. f4 Rhg8 23. f5 g6 24. f6 Kf8 25. h4 } f6 22. Rac1 g5 { -0.87" +
        "22... Rhg8 23. exf6 gxf6 24. g3 h6 25. f3 b5 26. Rc6 } 23. exf6+ Kxf6 24. Bg3" +
        "Nf4+ { -1.30 24... h5 25. a4 b5 26. axb5 Nxb5 27. Rxc8 Rxc8 28. Bxd5 exd5 29." +
        "Rxd5 Rc2 30. Rd2 } 25. Bxf4 gxf4 26. Bxb7 Ke7 27. Bxc8 { +4.74 27. Kf3 Rhg8 28." +
        "Bxc8 Rxc8 29. Rc5 h5 30. h4 a5 31. Rxa5 Nd5 32. Ra7 Kd6 } Rxc8 28. Kf3 h6 {" +
        "-4.79 28... a5 29. Rc5 a4 30. Rd4 h6 31. a3 e5 32. Rxe5 Kf6 33. Ke4 } 29. Kxf4" +
        "{ +5.53 29. Rc5 h5 30. h4 e5 31. Ke4 Kf8 32. Rd7 f3 33. Rcxc7 Rxc7 34. Rxc7" +
        "fxg2 } Rf8+ { -3.91 29... Nd5 30. Kg3 Rg8 31. Kh2 Rf8 32. f3 Kd6 33. Rc4 e5 34." +
        "b4 } 30. Ke4 { +4.01 30. Kg3 Nd5 31. Rc6 a5 32. Rd4 h5 33. Re4 Rg8 34. Kh4 Rxg2" +
        "35. Rexe6 Kf7 } Nd5 31. Rc2 { +3.76 31. Rd2 Rf4 32. Ke5 Rf5 33. Kd4 h5 34. Rc6" +
        "Nb4 35. Rc5 Nxa2 36. Rxf5 exf5 37. Ke5 } Rf4+ 32. Ke5 { +3.69 32. Kd3 Rf5 33." +
        "Ke2 a5 34. g4 Rf8 35. Rc5 Nf4 36. Ke1 Nxh3 37. Rc7 Kf6 } Rf5+ 33. Kd4 Rf4+ {" +
        "-3.26 33... Nb4 34. Rc7 Kf6 35. Rd2 Nxa2 36. Kc4 Rf4 37. Kc5 Rb4 38. Rcd7 a5 }" +
        "34. Kc5 Rf5 { -3.57 34... h5 35. Rxd5 exd5 36. Kxd5 Rf6 37. b3 Kd7 38. h4 Rd6" +
        "39. Ke5 } 35. Rxd5 { +3.68 35. g4 Rf8 36. Rcd2 Rc8 37. Kd4 Kd6 38. Ke4 Rc4 39." +
        "Rd4 Rc2 40. R1d2 } exd5 { -2.34 35... Rxd5 36. Kb6 Rd6 37. Kb7 Kf6 38. f4 a5" +
        "39. g4 Rd4 40. Kb6 a4 } 36. b4 { +2.88 36. g4 Rf3 37. Kxd5 h5 38. Re2 Kd7 39." +
        "Ke4 Rxh3 40. g5 Rh2 41. Kd3 Rh3 42. Re3 Rh2 } Re5 { -2.73 36... h5 37. Re2 Kf7" +
        "38. g3 Kf6 39. a4 Re5 40. Rxe5 Kxe5 41. f4 Ke4 42. b5 axb5 43. axb5 } 37. Rc3" +
        "Kd7 { -3.24 37... Rf5 38. f3 Rg5 39. g4 Re5 40. Rd3 Re2 41. Ra3 Re6 42. Kxd5" +
        "Rd6 43. Kc5 } 38. Re3 { +3.37 38. Ra3 Re6 39. Kxd5 Rd6 40. Kc4 Rc6 41. Kb3 Rg6" +
        "42. g3 Kc7 43. Ra5 Rc6 } Rf5 39. f3 h5 40. a3 { +3.46 40. g4 Rf4 41. Ra3 d4 42." +
        "gxh5 Kc7 43. h6 Kb7 44. h7 Rh4 45. f4 Rxh7 46. Kxd4 Rd7 47. Kc5 } Rg5 { -2.83" +
        "40... h4 41. Rd3 Ke6 42. Rd4 Rh5 43. a4 Rg5 44. Rg4 Rxg4 45. hxg4 Ke5 } 41. g4" +
        "hxg4 { -3.88 41... Rg6 42. Rd3 Kc7 43. Kxd5 Rg8 44. Re3 Rd8 45. Kc5 Rf8 46. a4" +
        "Rf4 47. Re7 Kd8 } 42. fxg4 { +3.89 42. hxg4 Rg6 43. Rd3 Rf6 44. Rxd5 Ke7 45." +
        "Rf5 Rxf5 46. gxf5 Kf6 47. Kb6 Kxf5 48. Kxa6 Ke5 49. a4 } Rg6 { -4.11 42... Kc7" +
        "43. Re7 Kb8 44. a4 Rg8 45. Kxd5 Rh8 46. Re3 Kb7 47. g5 Rd8 48. Kc5 Rc8 49. Kd6" +
        "Rd8 50. Ke7 } 43. a4 { +3.94 43. Rd3 Rc6 44. Kxd5 Rc2 45. Rf3 Rh2 46. Rf7 Kd8" +
        "47. Ra7 Rxh3 48. Rxa6 Rg3 49. Kd6 Kc8 } Rd6 { -3.92 43... Rg5 44. Re2 d4 45." +
        "Kxd4 Rg6 46. Re5 Rh6 47. Rh5 Rxh5 48. gxh5 Ke6 49. h6 } 44. b5 axb5 45. axb5 d4" +
        "{ -4.84 45... Rf6 46. Kxd5 Kc8 47. g5 Rf2 48. Re4 Rg2 49. Rg4 Rd2 50. Kc6 Rc2" +
        "51. Kb6 Kd7 52. g6 } 46. Rd3 Kc7 { -4.94 46... Rh6 47. Rxd4 Kc8 48. Rd3 Rf6 49." +
        "b6 Rf2 50. Rd5 Rc2 51. Kb5 Rh2 52. Rc5 Kb8 } 47. Rxd4 { +5.05 47. h4 Re6 48." +
        "Rxd4 Re5 49. Rd5 Re2 50. b6 Kc8 51. Kc6 Rc2 52. Rc5 Rb2 53. Re5 Rc2 54. Kd6 }" +
        "Rh6 48. b6+ { +4.76 48. Rd3 Kc8 49. b6 Kb7 50. Rb3 Rc6 51. Kd5 Rc2 52. h4 Rh2" +
        "53. h5 Rd2 54. Kc5 Rc2 55. Kb5 } Kc8 { -3.85 48... Rxb6 49. Rd7 Kxd7 50. Kxb6" +
        "Ke6 51. h4 Kf6 52. Kc5 Kg7 53. Kd5 Kg6 54. h5 Kh6 55. Ke5 } 49. Rd3 Rh8 { -4.81" +
        "49... Kb7 50. Rd7 Kb8 51. g5 Rxh3 52. g6 Rc3 53. Kd4 Rg3 54. g7 Rg4 55. Ke5 Kc8" +
        "56. Rf7 Rg5 57. Ke6 Rg2 58. b7 Kb8 } 50. g5 Kb7 { -5.61 50... Rg8 51. h4 Rh8" +
        "52. Kc6 Rh7 53. g6 Rc7 54. Kd5 Rd7 55. Kc4 Re7 56. Rg3 Re2 57. g7 } 51. g6 {" +
        "+5.80 51. Rd7 Kc8 52. Kc6 Rg8 53. b7 Kb8 54. h4 Rg6 55. Rd6 Rg8 56. g6 Ka7 }" +
        "Rg8 { -6.43 51... Rc8 52. Kb5 Rc1 53. Rd7 Kb8 54. g7 Rg1 55. Kc4 Kc8 56. b7 Kb8" +
        "57. h4 Rg3 } 52. Rd6 { +12.38 52. Rd7 Kc8 53. Rc7 Kb8 54. g7 Re8 55. Re7 Rc8" +
        "56. Kb4 Rg8 57. Rf7 Rc8 58. Rf8 Kb7 59. g8=Q } Kb8 { -6.04 52... Rc8 53. Kd5" +
        "Rc2 54. g7 Rg2 55. Ke6 Rg6 56. Kf7 Rxd6 57. g8=Q Rxb6 58. Qd8 Rb2 59. Qd7 Kb8" +
        "60. h4 } 53. h4 Ka8 { -7.00 53... Kb7 54. h5 Rc8 55. Kd5 Rh8 56. g7 Rxh5 57." +
        "Ke6 Rg5 58. Kf7 Rf5 59. Kg6 Rf4 60. g8=Q Rg4 61. Kf7 } 54. h5 Kb7 { -8.73 54..." +
        "Kb8 55. Rd7 Rc8 56. Kd6 Rc2 57. g7 Rd2 58. Ke7 Re2 59. Kf8 Kc8 60. g8=Q Kxd7" +
        "61. Qd5 Kc8 62. b7 Kc7 63. h6 } 55. Rd7+ Kc8 56. Kc6 Kb8 57. g7 Re8 { -mate 6" +
        "57... Rc8 58. Kd6 Re8 59. h6 Rc8 60. h7 Rc4 61. h8=Q Rc8 62. Rf7 Rxh8 63." +
        "gxh8=Q } 58. h6 { +mate 6 58. Rc7 Ka8 59. b7 Ka7 60. g8=Q Rxg8 61. Rc8 Rh8 62." +
        "Rxh8 Ka6 63. Ra8 } Ka8 { -mate 6 58... Re6 59. Kb5 Re5 60. Ka6 Re8 61. h7 Kc8" +
        "62. Rc7 Kb8 63. h8=Q Rd8 64. Qxd8 } 59. h7 Rc8+ { 0.00 59... Rd8 } 60. Rc7 {" +
        "mate 3 60. Kd6 Rc3 61. h8=Q Rc8 62. Qxc8 } Rxc7+ 61. bxc7 1-0 { The pawns are unbeatable }";

    describe("Parsing PGN input", function () {
    	beforeEach(function () {
    	});
        describe("Parsing tags", function () {
            beforeEach(function () {
                this.pgn = new Pgn(tagsOnly);
            });
            it(" Should get the tag count correct", function () {
                expect(11).toBe(Object.keys(this.pgn.props).length);
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
                expect("1").toBe(this.pgn.props.Round);
            });
            it(" Should correctly name the Annotator", function () {
                expect("Shredder").toBe(this.pgn.props.Annotator);
            });
            it(" Should correctly identify the result", function () {
                expect("1-0").toBe(this.pgn.props.Result);
            });
            it(" Should correctly name the setup", function () {
                expect("1").toBe(this.pgn.props.SetUp);
            });
            it(" Should correctly name the PlyCount", function () {
                expect("9").toBe(this.pgn.props.PlyCount);
            });
            it(" Should correctly name the SourceDate", function () {
                expect("2009.06.14").toBe(this.pgn.props.SourceDate);
            });
        });
        describe(" Parsing Moves", function () {
        	beforeEach(function () {
        		this.pgn = new Pgn(withCommentary);
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
            it(" Should end with white winning", function () {
            	expect(this.pgn.moveTree.goEnd().result).toBe("1-0");
            	expect(this.pgn.moveTree.goEnd().text).toBe("Qf5#");
            });
            it(" Should provide the correct move list", function () {
            	expect(this.pgn.moveTree.next.list()).toBe("1. e4 e5 2. f4 f6 3. fxe5 fxe5 4. Qh5+" +
            	    " Ke7 5. Qe5+ Kf7 6. Bc4+ Kg6 7. Qf5#");
            });
            it(" Should have a game intro comment", function () {
                expect(this.pgn.moveTree.commentary[0]).
                    toBe("Bad Opening play");
            });
            it(" Should have a comment on black's second move", function () {
            	expect(this.pgn.moveTree.next.next.next.next.commentary.length).
            	    toBe(1);
            });
            it(" Should have this comment on Black's second", function () {
            	expect(this.pgn.moveTree.next.next.next.next.text).toBe("f6");
            	expect(this.pgn.moveTree.next.next.next.next.commentary).
            	    toEqual(["This should not be moved this early in the game"]);
            });
            it(" Should have found a variation on Black's second", function () {
            	expect(this.pgn.moveTree.next.next.next.next.down.text).toBe("Nf6");
            });
            it(" Should have a second variation", function () {
            	expect(this.pgn.moveTree.next.next.next.next.down.down.list()).
            	    toBe("2. ... d5 3. exd5 e4 4. c3");
            });
            it(" Should find a sub variation to the second variation", function () {
            	expect(this.pgn.moveTree.next.next.next.next.down.down.next.next.
            	    down.list()).toBe("3. ... exf5 4. Nf3");
            });
            it(" Should find the right color on the first variation", function () {
            	expect(this.pgn.moveTree.next.next.next.next.down.color).toBe("black");
            });
            it(" Should have an initial destination of e4", function () {
            	expect(this.pgn.moveTree.next.destination).toBe("e4");
            });
            it(" Should find the subvariation's second move heads for f3", function () {
            	expect(this.pgn.moveTree.next.next.next.next.down.down.next.
            	    next.down.next.destination).toBe("f3");
            });
        });
    });
} ());