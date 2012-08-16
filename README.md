# Marshall

Marshall is a javascript library based on Toomas R&#246;mer's jsPgnViewer library (http://www.pgnview.com) which he licensed under the apache 2.0
license. For the sake of consistency, this is also licensed under the apache license.

##Why another one?

Basically, because I wanted a different approach to the output. I wanted semantically proper markup, and I wanted to control the appearance of everything with css, rather than inline styles written (and controlled) by javascript. I recognize this is a different goal from the original, basically when the library reaches a release stage, the only thing that will remain of the original code is the pgn engine and maybe some of the structure. It was too much to ask that the original author accept changes that would quite possibly break the WP plugin he also offered, so a fork was the kindest option for all.

##So what is the goal here?

I'm trying to create a pgn viewer that simply creates HTML, no styling info at all, that will try and fit easily into the design of the site you're using it on.

##What's with the file structure?
Simple. The main tree is the development versions, so each class is in its own file. When the releases start to happen, there will be a separate directory for the combined and minified versions of the javascript; use those.

For now, each class/function is in its own file. Deal with it.

##Where Are We Now?

Variations solid. Control bar buttons for them not hooked up yet. Added an alternate source for PGN data.

##How do I use it?

In a nutshell:

1. Download the archive and unzip it. For now the code is still in 7 separate javascript files, so deal with it. OK? I promise I'll make it one compressed js file when v1.0 goes beta. (Real Soon Now!)
2. The dev.html file is a development demo. Have a look in that for clues about how to make CSS styles work for your site. The /img directory holds the images used by the demo. Right now only the default and the uscf directories are fit to use. If you change where it's located, remember to change your CSS to point to it. The /css directory contains the demo CSS file.
3. If you're building your page by hand, the easiest method is to create a `<div>` on your page with an ID to identify it. Inside that `<div>` you place the PGN text of the game. Where you want the game player to show, create another `<div>` with an ID of the first one plus "\_board":
`<div id="mypgndata">PGN Data here.....</div>`
`<div id="mypgndata_board"></div>`
The player board is empty, Marshall will build it there.
4. At the bottom of the page put this script:
`<script>var game = new Game("mypgndata");</script>`

And away it goes!

Check the wiki for more detailed docs as I write them (or fill them in yourself)

Have fun!
