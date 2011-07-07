TestCase( "vSquareTest", 
{
	setUp: function() {
		this.theSquare = new vSquare();
	},
	
	tearDown: function() {},
	
	"test new Square should be empty": function () {
		assertNull( this.theSquare.piece);
		assertNull( this.theSquare.color);
		assertString( this.theSquare.type );
		assertEquals( "", this.theSquare.type );
	},
	
	"test black queen should be on square": function () {
		this.theSquare.piece = 'queen';
		this.theSquare.color = 'black';
		this.theSquare.type = 'N/A';
		assertString( this.theSquare.toString() );
		assertEquals( "vSquare -- piece = queen color=black type=N/A", this.theSquare.toString() );
	},
	
	"test cloning square": function () {
		this.theSquare.piece = 'pawn';
		this.theSquare.color = 'black';
		this.theSquare.type = 'N/A';
		theClone = this.theSquare.clone();
		assertNotSame( this.theSquare, theClone );
		assertEquals( this.theSquare.toString(), theClone.toString() );
	}
}
);