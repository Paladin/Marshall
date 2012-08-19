var MarshallPGN = MarshallPGN || {};
MarshallPGN.NAG = [
	{ "meaning": "null annotation", "code": null, "text": true },
	{ "meaning": "good move (traditional \"!\")", "code": "!", "text": true },
	{ "meaning": "poor move (traditional \"?\")", "code": "?", "text": true },
	{ "meaning": "very good move (traditional \"!!\")", "code": "!!", "text": true },
	{ "meaning": "very poor move (traditional \"??\")", "code": "??", "text": true },
	{ "meaning": "speculative move (traditional \"!?\")", "code": "!?", "text": true },
	{ "meaning": "questionable move (traditional \"?!\")", "code": "?!", "text": true },
	{ "meaning": "forced move (all others lose quickly)", "code": null, "text": false },
	{ "meaning": "singular move (no reasonable alternatives)", "code": null, "text": false },
	{ "meaning": "worst move", "code": null, "text": false },
	{ "meaning": "drawish position", "code": "=", "text": false },
	{ "meaning": "equal chances, quiet position", "code": "=", "text": false },
	{ "meaning": "equal chances, active position", "code": "=", "text": false },
	{ "meaning": "unclear position", "code": null, "text": false },
	{ "meaning": "White has a slight advantage", "code": "+/=", "text": false },
	{ "meaning": "Black has a slight advantage", "code": "=/+", "text": false },
	{ "meaning": "White has a moderate advantage", "code": "+=", "text": false },
	{ "meaning": "Black has a moderate advantage", "code": "=+", "text": false },
	{ "meaning": "White has a decisive advantage", "code": "+-", "text": false },
	{ "meaning": "Black has a decisive advantage", "code": "-+", "text": false },
	{ "meaning": "White has a crushing advantage (Black should resign)", "code": "++--", "text": false },
	{ "meaning": "Black has a crushing advantage (White should resign)", "code": "--++", "text": false },
	{ "meaning": "White is in zugzwang", "code": null, "text": false },
	{ "meaning": "Black is in zugzwang", "code": null, "text": false },
	{ "meaning": "White has a slight space advantage", "code": null, "text": false },
	{ "meaning": "Black has a slight space advantage", "code": null, "text": false },
	{ "meaning": "White has a moderate space advantage", "code": null, "text": false },
	{ "meaning": "Black has a moderate space advantage", "code": null, "text": false },
	{ "meaning": "White has a decisive space advantage", "code": null, "text": false },
	{ "meaning": "Black has a decisive space advantage", "code": null, "text": false },
	{ "meaning": "White has a slight time (development) advantage", "code": null, "text": false },
	{ "meaning": "Black has a slight time (development) advantage", "code": null, "text": false },
	{ "meaning": "White has a moderate time (development) advantage", "code": null, "text": false },
	{ "meaning": "Black has a moderate time (development) advantage", "code": null, "text": false },
	{ "meaning": "White has a decisive time (development) advantage", "code": null, "text": false },
	{ "meaning": "Black has a decisive time (development) advantage", "code": null, "text": false },
	{ "meaning": "White has the initiative", "code": "<-", "text": false },
	{ "meaning": "Black has the initiative", "code": "->", "text": false },
	{ "meaning": "White has a lasting initiative", "code": null, "text": false },
	{ "meaning": "Black has a lasting initiative", "code": null, "text": false },
	{ "meaning": "White has the attack", "code": null, "text": false },
	{ "meaning": "Black has the attack", "code": null, "text": false },
	{ "meaning": "White has insufficient compensation for material deficit", "code": null, "text": false },
	{ "meaning": "Black has insufficient compensation for material deficit", "code": null, "text": false },
	{ "meaning": "White has sufficient compensation for material deficit", "code": null, "text": false },
	{ "meaning": "Black has sufficient compensation for material deficit", "code": null, "text": false },
	{ "meaning": "White has more than adequate compensation for material deficit", "code": null, "text": false },
	{ "meaning": "Black has more than adequate compensation for material deficit", "code": null, "text": false },
	{ "meaning": "White has a slight center control advantage", "code": null, "text": false },
	{ "meaning": "Black has a slight center control advantage", "code": null, "text": false },
	{ "meaning": "White has a moderate center control advantage", "code": null, "text": false },
	{ "meaning": "Black has a moderate center control advantage", "code": null, "text": false },
	{ "meaning": "White has a decisive center control advantage", "code": null, "text": false },
	{ "meaning": "Black has a decisive center control advantage", "code": null, "text": false },
	{ "meaning": "White has a slight kingside control advantage", "code": null, "text": false },
	{ "meaning": "Black has a slight kingside control advantage", "code": null, "text": false },
	{ "meaning": "White has a moderate kingside control advantage", "code": null, "text": false },
	{ "meaning": "Black has a moderate kingside control advantage", "code": null, "text": false },
	{ "meaning": "White has a decisive kingside control advantage", "code": null, "text": false },
	{ "meaning": "Black has a decisive kingside control advantage", "code": null, "text": false },
	{ "meaning": "White has a slight queenside control advantage", "code": null, "text": false },
	{ "meaning": "Black has a slight queenside control advantage", "code": null, "text": false },
	{ "meaning": "White has a moderate queenside control advantage", "code": null, "text": false },
	{ "meaning": "Black has a moderate queenside control advantage", "code": null, "text": false },
	{ "meaning": "White has a decisive queenside control advantage", "code": null, "text": false },
	{ "meaning": "Black has a decisive queenside control advantage", "code": null, "text": false },
	{ "meaning": "White has a vulnerable first rank", "code": null, "text": false },
	{ "meaning": "Black has a vulnerable first rank", "code": null, "text": false },
	{ "meaning": "White has a well protected first rank", "code": null, "text": false },
	{ "meaning": "Black has a well protected first rank", "code": null, "text": false },
	{ "meaning": "White has a poorly protected king", "code": null, "text": false },
	{ "meaning": "Black has a poorly protected king", "code": null, "text": false },
	{ "meaning": "White has a well protected king", "code": null, "text": false },
	{ "meaning": "Black has a well protected king", "code": null, "text": false },
	{ "meaning": "White has a poorly placed king", "code": null, "text": false },
	{ "meaning": "Black has a poorly placed king", "code": null, "text": false },
	{ "meaning": "White has a well placed king", "code": null, "text": false },
	{ "meaning": "Black has a well placed king", "code": null, "text": false },
	{ "meaning": "White has a very weak pawn structure", "code": null, "text": false },
	{ "meaning": "Black has a very weak pawn structure", "code": null, "text": false },
	{ "meaning": "White has a moderately weak pawn structure", "code": null, "text": false },
	{ "meaning": "Black has a moderately weak pawn structure", "code": null, "text": false },
	{ "meaning": "White has a moderately strong pawn structure", "code": null, "text": false },
	{ "meaning": "Black has a moderately strong pawn structure", "code": null, "text": false },
	{ "meaning": "White has a very strong pawn structure", "code": null, "text": false },
	{ "meaning": "Black has a very strong pawn structure", "code": null, "text": false },
	{ "meaning": "White has poor knight placement", "code": null, "text": false },
	{ "meaning": "Black has poor knight placement", "code": null, "text": false },
	{ "meaning": "White has good knight placement", "code": null, "text": false },
	{ "meaning": "Black has good knight placement", "code": null, "text": false },
	{ "meaning": "White has poor bishop placement", "code": null, "text": false },
	{ "meaning": "Black has poor bishop placement", "code": null, "text": false },
	{ "meaning": "White has good bishop placement", "code": null, "text": false },
	{ "meaning": "Black has good bishop placement", "code": null, "text": false },
	{ "meaning": "White has poor rook placement", "code": null, "text": false },
	{ "meaning": "Black has poor rook placement", "code": null, "text": false },
	{ "meaning": "White has good rook placement", "code": null, "text": false },
	{ "meaning": "Black has good rook placement", "code": null, "text": false },
	{ "meaning": "White has poor queen placement", "code": null, "text": false },
	{ "meaning": "Black has poor queen placement", "code": null, "text": false },
	{ "meaning": "White has good queen placement", "code": null, "text": false },
	{ "meaning": "Black has good queen placement", "code": null, "text": false },
	{ "meaning": "White has poor piece coordination", "code": null, "text": false },
	{ "meaning": "Black has poor piece coordination", "code": null, "text": false },
	{ "meaning": "White has good piece coordination", "code": null, "text": false },
	{ "meaning": "Black has good piece coordination", "code": null, "text": false },
	{ "meaning": "White has played the opening very poorly", "code": null, "text": false },
	{ "meaning": "Black has played the opening very poorly", "code": null, "text": false },
	{ "meaning": "White has played the opening poorly", "code": null, "text": false },
	{ "meaning": "Black has played the opening poorly", "code": null, "text": false },
	{ "meaning": "White has played the opening well", "code": null, "text": false },
	{ "meaning": "Black has played the opening well", "code": null, "text": false },
	{ "meaning": "White has played the opening very well", "code": null, "text": false },
	{ "meaning": "Black has played the opening very well", "code": null, "text": false },
	{ "meaning": "White has played the middlegame very poorly", "code": null, "text": false },
	{ "meaning": "Black has played the middlegame very poorly", "code": null, "text": false },
	{ "meaning": "White has played the middlegame poorly", "code": null, "text": false },
	{ "meaning": "Black has played the middlegame poorly", "code": null, "text": false },
	{ "meaning": "White has played the middlegame well", "code": null, "text": false },
	{ "meaning": "Black has played the middlegame well", "code": null, "text": false },
	{ "meaning": "White has played the middlegame very well", "code": null, "text": false },
	{ "meaning": "Black has played the middlegame very well", "code": null, "text": false },
	{ "meaning": "White has played the ending very poorly", "code": null, "text": false },
	{ "meaning": "Black has played the ending very poorly", "code": null, "text": false },
	{ "meaning": "White has played the ending poorly", "code": null, "text": false },
	{ "meaning": "Black has played the ending poorly", "code": null, "text": false },
	{ "meaning": "White has played the ending well", "code": null, "text": false },
	{ "meaning": "Black has played the ending well", "code": null, "text": false },
	{ "meaning": "White has played the ending very well", "code": null, "text": false },
	{ "meaning": "Black has played the ending very well", "code": null, "text": false },
	{ "meaning": "White has slight counterplay", "code": null, "text": false },
	{ "meaning": "Black has slight counterplay", "code": null, "text": false },
	{ "meaning": "White has moderate counterplay", "code": null, "text": false },
	{ "meaning": "Black has moderate counterplay", "code": null, "text": false },
	{ "meaning": "White has decisive counterplay", "code": null, "text": false },
	{ "meaning": "Black has decisive counterplay", "code": null, "text": false },
	{ "meaning": "White has moderate time control pressure", "code": null, "text": false },
	{ "meaning": "Black has moderate time control pressure", "code": null, "text": false },
	{ "meaning": "White has severe time control pressure", "code": null, "text": false },
	{ "meaning": "Black has severe time control pressure", "code": null, "text": false }
];