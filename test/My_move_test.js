TestCase( "MyMoveTest", 
{
	setUp: function() {
		this.theMove = new MyMove();
	},
	
	tearDown: function() {},
	
	"test new Move should be empty": function () {
		assertNull( this.theMove.oPiece);
		assertNull( this.theMove.oColor);
		assertNull( this.theMove.pPiece);
		assertNull( this.theMove.enP);
		assertNull( this.theMove.moveStr);
		assertArray( this.theMove.actions );
		assertEquals( 0, this.theMove.actions.length );
		assertEquals( 'MyMove -- no. actions 0', this.theMove.toString() );
	},
		
	"test adding an action and getting the count": function () {
		action = new MySquare( 1, 2, 'pawn', 'white' );
		this.theMove.add( action );
		assertEquals( 1, this.theMove.actions.length );
		assertEquals( action, this.theMove.actions[0] );
		assertEquals( 'MyMove -- no. actions 1', this.theMove.toString() );
	}
}
);