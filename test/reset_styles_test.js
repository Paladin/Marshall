TestCase( "resetStylesTest", {
	setUp: function() {
		this.theElement = resetStyles(document.createElement("div"));
	},
	
	tearDown: function() {},
	
	"test should make background color transparent": function () {		
		assertEquals( "transparent", this.theElement.style.backgroundColor );
	},
	
	"test should make margin '0px'": function () {
		assertEquals( '0px', this.theElement.style.marginTop );
		assertEquals( '0px', this.theElement.style.marginBottom );
		assertEquals( '0px', this.theElement.style.marginRight );
		assertEquals( '0px', this.theElement.style.marginLeft );
	},
	
	"test should make padding '0px'": function () {
		assertEquals( '0px', this.theElement.style.paddingTop );
		assertEquals( '0px', this.theElement.style.paddingBottom );
		assertEquals( '0px', this.theElement.style.paddingRight );
		assertEquals( '0px', this.theElement.style.paddingLeft );
	},
	
	"test should make border '0px'": function () {		
		assertEquals( '0px', this.theElement.style.borderTopWidth );
		assertEquals( '0px', this.theElement.style.borderBottomWidth );
		assertEquals( '0px', this.theElement.style.borderRightWidth );
		assertEquals( '0px', this.theElement.style.borderLeftWidth );
	},
	
	"test should make fontSize 100%": function () {		
		assertEquals( "100%", this.theElement.style.fontSize );
	},
	
	"test should make outline '0px'": function () {		
		assertEquals( '0px', this.theElement.style.outlineWidth );
	},
	
	"test should make verticalAlign middle": function () {		
		assertEquals( "middle", this.theElement.style.verticalAlign );
	},
	
	"test should make textAlign center": function () {		
		assertEquals( "center", this.theElement.style.textAlign );
	},
	
	"test should make borderCollapse separate": function () {		
		assertEquals( "separate", this.theElement.style.borderCollapse );
	},
});
