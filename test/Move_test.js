TestCase( "MoveTest", {
	setUp: function() {
		this.theMove = new Move("e4", "e5");
	},
	
	tearDown: function() {},
	
	"test toString should return white and black moves concatenated": function () {
		var theMoveText = this.theMove.toString();
		
		assertString( theMoveText );
		assertEquals( "e4 e5", theMoveText );
	}
});