TestCase( "BoardImagesTest", 
{
	setUp: function() {
		this.images = new BoardImages( Array() );
	},
	
	tearDown: function() {},
	
	"test create default board iamges": function () {
		testObject = new BoardImages( Array() );

		assertEquals( 'default', testObject.set );
		assertEquals( '', testObject.pref );
		assertEquals( 'gif', testObject.suf );
		assertEquals( 'bPawn.gif', testObject.imageNames['default']['black']['pawn'] );
	},
	
	"test create custom board iamges": function () {
		testObject = new BoardImages({
			'set' : 'custom',
			'imagePrefix' : 'new',
			'imageSuffix' : 'jpg'
		});

		assertEquals( 'custom', testObject.set );
		assertEquals( 'new', testObject.pref );
		assertEquals( 'jpg', testObject.suf );
		assertEquals( 'wQueen.jpg', testObject.imageNames['default']['white']['queen'] );
	}
}
);