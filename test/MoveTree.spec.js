(function () {
    var initial = { "next": "another move tree", "number": 1 };
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
} ());