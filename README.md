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

Markup is more semantic and variations work. Or at least the Demo works and the tests work, but the code is still filled with lots of appendix methods and I want full, solid testing in place before I bump the version number.

Along the way I've removed a few features. Some will make it back in by 1.0, some never will. This code should take a PGN with variations and play through it. The up/down buttons in the toolbar meant for dropping in to them still aren't hooked up, but soon. First priority is cleaning up after the push to get variations hooked in. Then I'll reconnect some removed features, and document everything.


-----------------------------------------------------

Following contents come from original readme:

You have downloaded the archive and you want to use it for your own
webpage or maybe even write a plugin for blog software?

* Extract the archive.
* Include the jsPgnViewer.js in your webpage.
* Make the img folder from the archive available somewhere in your project.
* To initialize the board:
    * Make a hidden div with an id
    
            <div style="visibility:hidden;display:none" id="id_of_the_pgn_div"></div>
    * Paste a PGN into the div
    * Make another div where ever you want the board to appear.
    * The div's id has to have the suffix \_board. In the current example it should be "id\_of\_the\_pgn\_div\_board".
    * Somewhere in the &lt;script> tags add
    
	        var board = new Board("id_of_the_pgn_div")
            board.init()
* If you want to reference the images from another directory you can use the
	imagePrefix attribute of the Board object.

        board.imagePrefix = "someDirectory/" 
* If you don't want the movesPane to show up

        board.showMovesPane=true 
* Easier way to set options

        var board = new Board("id_of_the_pgn_div",{'showMovesPane':true, 'imagePrefix':'someDirectory/'}) 

Have fun!
