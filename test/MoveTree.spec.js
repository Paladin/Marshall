(function () {
    var initial = { "next": "another move tree", "number": 1,
        "text": "Nf3", "color": "black", "commentary": "This is a comment"};
 
    describe("Move Tree", function () {
    	beforeEach(function () {
    		this.moveTree = new MoveTree(initial);
    	});
    	it("should not be the last in the tree", function () {
    		expect(this.moveTree.isEnd()).toBe(false);
    	});
    	it("should not be empty", function () {
    		expect(this.moveTree.isEmpty()).toBe(false);
    	});
    	it("should be empty when created", function () {
    	    var emptyMove = new MoveTree();
    		expect(emptyMove.isEmpty()).toBe(true);
    	});
    });
    describe(" Traversing Tree", function () {
        var a1w = { number: 1, text: "e4", color: "white" },
        a1b = { number: 1, text: "c5", color: "black" },
        a2w = { number: 2, text: "Nc3", color: "white" },
        a2b = { number: 2, text: "Nc6", color: "black" },
        a3w = { number: 3, text: "f4", color: "white" },
        a3b = { number: 3, text: "e6", color: "black" },
        a4w = { number: 4, text: "Nf3", color: "white" },
        a4b = { number: 4, text: "d5", color: "black" },
        b2w = { number: 2, text: "d4", color: "white" },
        b2b = { number: 2, text: "cxd4", color: "black" },
        b3w = { number: 3, text: "c3", color: "white" },
        c3w = { number: 3, text: "Qxd4", color: "white" },
        d3b = { number: 3, text: "g6", color: "black" },
        d4w = { number: 4, text: "Nf3", color: "white" },
        d4b = { number: 4, text: "Bg7", color: "black" },
        d5w = { number: 5, text: "Bc4", color: "white" },
        e4b = { number: 4, text: "d6", color: "black" },
        e5w = { number: 5, text: "Bb5", color: "white" },
        f2w = { number: 5, text: "Nf3", color: "white" },
        f2b = { number: 5, text: "Nc6", color: "black" },
        f3w = { number: 5, text: "d4", color: "white" };

    	beforeEach(function () {
    	    this.moveTree = new MoveTree(a1w);
    	    this.moveTree.addNext(a1b);
    	    this.moveTree.next.addNext(a2w);
    	    this.moveTree.next.next.addNext(a2b);
    	    this.moveTree.next.next.next.addNext(a3w);
    	    this.moveTree.next.next.next.next.addNext(a3b);
    	    this.moveTree.next.next.next.next.next.addNext(a4w);
    	    this.moveTree.next.next.next.next.next.next.addNext(a4b);
    	    this.moveTree.next.next.addVariation(b2w);
    	    this.moveTree.next.next.down.addNext(b2b);
    	    this.moveTree.next.next.down.addVariation(f2w);
    	    this.moveTree.next.next.down.down.addNext(f2b);
    	    this.moveTree.next.next.down.down.next.addNext(f3w);
    	    this.moveTree.next.next.down.next.addNext(b3w);
    	    this.moveTree.next.next.down.next.next.addVariation(c3w);
    	    this.moveTree.next.next.next.next.next.addVariation(d3b);
    	    this.moveTree.next.next.next.next.next.down.addNext(d4w);
    	    this.moveTree.next.next.next.next.next.down.next.addNext(d4b);
    	    this.moveTree.next.next.next.next.next.down.next.next.addNext(d5w);
    	    this.moveTree.next.next.next.next.next.down.next.next.addVariation(e4b);
    	    this.moveTree.next.next.next.next.next.down.next.next.down.addNext(e5w);
    	});
    	it(" Should connect new next", function () {
    		expect(this.moveTree).toBe(this.moveTree.next.previous);
    	});
    	it(" Should add variation", function () {
    		expect(this.moveTree.next.next).toBe(this.moveTree.next.next.down.up);
    	});
    	it(" Should add the variation at the bottom", function () {
    		expect(this.moveTree.next.next.
    		    addVariation({number: 2, text: "c3", color: "white" })).
    		    toBe(this.moveTree.next.next.down.down.down);
    	});
    	it(" Should list main line", function () {
    		expect(this.moveTree.list()).
    		    toBe("1. e4 c5 2. Nc3 Nc6 3. f4 e6 4. Nf3 d5");
    	});
    	it(" Should list variation e", function () {
    		expect(this.moveTree.next.next.next.next.next.down.next.
    		    next.down.list()).toBe("4. ... d6 5. Bb5");
    	});
    	it(" Should get next move", function () {
    		expect(this.moveTree.getNextMove()).toBe(this.moveTree.next);
    	});
    	it(" Should get previous move", function () {
    		expect(this.moveTree.next.next.getPreviousMove()).
    		    toBe(this.moveTree.next);
    	});
    	it(" Should not be at the end of a line", function () {
    		expect(this.moveTree.isEnd()).toBe(false);
    	});
    	it(" Should be at the end of a line", function () {
    		expect(this.moveTree.next.next.down.next.next.isEnd()).toBe(true);
    	});
    	it(" Should got to the start of the line", function () {
    		expect(this.moveTree.next.next.next.next.next.down.next.next.next
    		    .goStart()).toBe(this.moveTree.next.next.next.next.next.down);
    	});
    	it(" Should go to the end of the line", function () {
    		expect(this.moveTree.goEnd()).
    		    toBe(this.moveTree.next.next.next.next.next.next.next);
    	});
    	it(" Should got to last subvariation of this move", function () {
    		expect(this.moveTree.next.next.goBottom())
    		    .toBe(this.moveTree.next.next.down.down);
    	});
    	it(" Should come up to the parent variation", function () {
    		expect(this.moveTree.next.next.next.next.next.down.next.next.
    		    down.goTop()).toBe(this.moveTree.next.next.next.next.next.
    		    down.next.next);
    	});
    });
} ());