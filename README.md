# Marshall

Marshall is a javascript library based on Toomas R&#246;mer's jsPgnViewer library (http://www.pgnview.com) which he licensed under the apache 2.0
license. For the sake of consistency, this is also licensed under the apache license.

##Why another one?

Basically, because I wanted a different approach to the output. I wanted semantically proper markup, and I wanted to control the appearance of everything with css, rather than inline styles written (and controlled) by javascript. I recognize this is a different goal from the original, basically when the library reaches a release stage, the only thing that will remain of the original code is the pgn engine and maybe some of the structure. It was too much to ask that the original author accept changes that would quite possibly break the WP plugin he also offered, so a fork was the kindest option for all.

I'm creating a pgn viewer that has good solid HTML markup and leaves the styling to you, so you can fit it into the design of the site you're using it on without having to fight it every step of the way. That's also why this version doesn't rely on the presence of any other javascript libraries. I'm evaluating the idea of making special versions of Marshall that will depend upon various libraries; let me know which ones you want to see, if any.

##Where Are We Now?

Version 1.0 Beta. Soon we'll hit release. I'll tag the milestones in the repo as they happen, but I'll try to keep the master branch stable at all times. When I have to do some major work, that will be in a feature branch. Feel free to browse any of the branches, but the current master branch is the one I'm most interested in bug reports on and suggestions for. This started because I was scratching an itch of my own, but I've almost finished that. Maybe I can scratch some of yours, as well.

##How do I use it?

Here's the basics:

1. Download and unzip, or clone the repo. You'll want one of the two "Marshall" files in the js directory: Marshall.pack62.js is the packed version (hey, I'm a cheesehead, you expected me *not* to use a program called "packer?") and Marshall.js is the uncompressed version. The files in the src directory aren't useful unless you want to do some development on this as well.
2. The dev.html file is a development demo. Have a look in that for clues about how to make CSS styles work for your site, there will be more details in the wiki (if not now, then soon). The /img directory holds the images used by the demo. take your pick or make some of your own. If you change where it's located, remember to change your CSS to point to it. The /css directory contains the demo CSS file.
3. If you're building your page by hand, the easiest method is to create a `<div>` on your page with an ID to identify it. Inside that `<div>` you place the PGN text of the game. Where you want the game player to show, create another `<div>` with an ID of the first one plus "\_board":
`<div id="mypgndata">PGN Data here.....</div>`
`<div id="mypgndata_board"></div>`
The board div is empty, Marshall will build the player there.
4. For every game on your page, you'll need to create an instance of it:
`<script>var game = new MarshallPGN.Game("mypgndata");</script>` You'll notice the demo has four games, and uses an array (game[0] to game[4]) for the players.

And away it goes!

Check the wiki for more detailed docs as I write them (or fill them in yourself)

Have fun!
