# Marshall

Marshall is a javascript library based on Toomas R&#246;mer's jsPgnViewer library (http://www.pgnview.com) which he licensed under the apache 2.0
license. For the sake of consistency, this is also licensed under the apache license.

There are a lot of misinterpretations of the [PGN standard](http://www6.chessclub.com/help/PGN-spec) out there (for example, [this page](http://www.gambitchess.com/semi/pgnutils.htm) insists that semi-colons are not allowed inside comment braces, when the standard clearly says they are) so if you're having problems converting a PGN file for use with Marshall, it may not be a bug, it may be because the person/program that generated the file doesn't really understand PGN. Or it could be a bug.

Let me know about it by filing an issue, anyway. I'm a firm believer in [Postel's Law](http://en.wikipedia.org/wiki/Jon_Postel#Postel.27s_Law) and we may be able to make an adjustment to the parser to allow that particular piece of bad PGN to be parsed anyway, without breaking parsing for "real" PGN files. As evidence of that idea, note Marshall will accept castling with zeros (0-0-0) as well as uppercase o's (O-O-O) even though the standard expressly forbids the zeros. (Marshall also doesn't insist on the tag order specified in the standard, and will fill in required tags that are not in the file, given them the unknown value.) The idea behind Marshall is not to poke holes in your PGN, it's to let you play over a game.

##How do I use it?

To get started, either download and unzip, or clone, the repo. There are probably more files here than you'll want for your specific project. At the minimum, you'll want one of the two "Marshall" files in the js directory (Marshall.pack62.js is the packed version, Marshall.js is the uncompressed source). The files in the /js/src directory are simply the Marshall.js file broken out into separate files for each object. They're only of use if you plan on doing some development, so if you're just going to use Marshall, you can safely toss the entire /src directory.

The file in the /css directory is a sample css file (the demo html file uses it). you can look there for clues about how to set up your CSS they way you want it. The intent of Marshall is to fit in with whatever design you currently have on your site, which means you're going to have to do some of the work yourself. I've included enough samples to get you started, and there's more information in the wiki. If there's a look in the demo you like, just copy that section of the CSS into your site's CSS. Hopefully, it won't interact with the rest of your CSS.

The files in the /img directory are used by the css to create the looks you see. You can use any of the images there, or create your own. The images are css sprites, meaning they hold the entire set of pieces in one image, and the css pulls out the right ones to display. Look at any one of them to see how you can build your own. You will only need one set of the piece images and one button bar will be enough to get you going.

In your web page, you'll need two divs (or equivalent elements). One will contain the PGN for the game to be shown. This div is hidden by your css (look at ".pgn_source" in the sample css) but used by the javascript to build the player. Give this div an id that you will use to tell Marshall where to look for it. This div can be placed anywhere on the page you want to place it. I usually place them at the bottom of the page, to keep them out of the way.

The second div will be placed where you want the player to be. Create its id by adding "\_board" to the id of the source. For example:

`<div id="mypgndata_board"></div>`

and

`<div id="mypgndata">PGN Data here.....</div>`

For every game you will be displaying on your page, you'll need to create an instance of Marshall for it:


The demo has four games on the same page, so it uses an array (game[0] to game[4]) to create the players.

There are additional configuration options you can use to customize the player for the game. For example, Marshall shows the game from White's point of view (white is at the bottom of the board). If you'd rather have the game shown from Black's point of view, you could use:

`<script>var game = new MarshallPGN.Game("mypgndata", {"flipped": true"});</script>`

to flip the board so that Black is at the bottom. You can find a full list of configuration options and how to use them in the wiki.

And check the wiki for further details about how to use Marshall on your page.

Have fun!
