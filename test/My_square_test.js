TestCase( "MySquareTest", 
{
	setUp: function() {
		this.theSquare = new MySquare( 1, 2, 'pawn', 'white' );
	},
	
	tearDown: function() {},
	
	"test new Square as white pawn on b3": function () {
		assertString( this.theSquare.toString() );
		assertEquals( "MySquare -- x = 1 y=2 color=white piece=pawn", this.theSquare.toString() );
	},
	
	"test cloning square": function () {
		theClone = this.theSquare.clone();
		assertNotSame( this.theSquare, theClone );
		assertEquals( this.theSquare.toString(), theClone.toString() );
	}
}
);