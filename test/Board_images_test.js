TestCase( "BoardImagesTest", 
{
	setUp: function() {
		this.images = new BoardImages( Array() );
	},
	
	tearDown: function() {},
	
	"test create default board images": function () {
		testObject = new BoardImages( Array() );

		assertEquals( 'default', testObject.set );
		assertEquals( '', testObject.pref );
		assertEquals( 'gif', testObject.suf );
		assertEquals( 'bPawn.gif', testObject.imageNames['default']['black']['pawn'] );
	},
	
	"test create custom board images": function () {
		testObject = new BoardImages({
			'set' : 'custom',
			'imagePrefix' : 'new',
			'imageSuffix' : 'jpg'
		});

		assertEquals( 'custom', testObject.set );
		assertEquals( 'new', testObject.pref );
		assertEquals( 'jpg', testObject.suf );
		assertEquals( 'wQueen.jpg', testObject.imageNames['default']['white']['queen'] );
	},
	
	"test preloading images": function () {
		testObject = new BoardImages( Array() );
		
		assertEquals( 'Should load all images', 19, testObject.preload() );
		assertEquals( 'Should load default images', 19, testObject.preload('default') );
	}
});