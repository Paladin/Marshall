TestCase( "PlyTest", 
{
	setUp: function() {
		this.thePly = new Ply({
							piece:"N",
							from: {rank: 3, file: "f"},
							to: {rank: 5, file: "g"},
							captured: "B",
							capturedOn: {rank: 5, file: "g"},
							promotedTo:	'',
							castled:	''
						});
	},
	
	tearDown: function() {},
	
	"test should be initialized properly": function () {
		assertEquals( "N", this.thePly.piece );
		assertEquals( "f", this.thePly.from.file );
		assertEquals( 3, this.thePly.from.rank );
		assertEquals( 5, this.thePly.to.rank );
		assertEquals( "g", this.thePly.to.file );
		assertEquals( "B", this.thePly.captured );
		assertEquals( "g", this.thePly.capturedOn.file );
		assertEquals( 5, this.thePly.capturedOn.rank );
		assertEquals( "", this.thePly.promotedTo );
		assertEquals( "", this.thePly.castled );
	},
	
	"test should return a correctly formatted long form move string": function() {
		assertEquals( "Nf3xBg5", this.thePly.toString() );
	},
	
	"test should return a correctly formatted short form move string": function() {
		assertEquals( "Ng5", this.thePly.toString('short') );
	}
});