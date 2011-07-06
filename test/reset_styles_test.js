TestCase( "resetStylesTest", {
	setUp: function() {
		this.theElement = resetStyles(document.createElement("div"));
	},
	
	tearDown: function() {},
	
	"test should make background transparent": function () {		
		assertEquals( "transparent", this.theElement.style.background );
	},
	
	"test should make margin '0px'": function () {		
		assertEquals( '0px', this.theElement.style.margin );
	},
	
	"test should make padding '0px'": function () {		
		assertEquals( '0px', this.theElement.style.padding );
	},
	
	"test should make border '0px'": function () {		
		assertEquals( '0px', this.theElement.style.border );
	},
	
	"test should make fontSize 100%": function () {		
		assertEquals( "100%", this.theElement.style.fontSize );
	},
	
	"test should make outline '0px'": function () {		
		assertEquals( '0px', this.theElement.style.outline );
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
