BasicGame.Pnj = function(game, x, y, sprite, frame) {
    Phaser.Sprite.call(this, game, x, y, sprite, frame);
    BasicGame.groups['pnjs'].add(this);
    this.body.immovable = true;
    this.anchor.setTo(0.5,0.5);
};

BasicGame.Pnj.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Pnj.prototype.constructor = BasicGame.Pnj;

BasicGame.Pnj.prototype.talk = function(player) {
	var goal = {};
	for(item in player.inventory) {
		goal[player.inventory[item].itemId] = true;
	}

	for (i = 0; i < 4; i++) {
		var total = 0;
		for (j = 0; j < 4; j++) {
			if( goal[i*4+j] ) {
				total += 1;
			}
		}
		if( total > 2 ) {
			var success = true;
			var speech = BasicGame.game.add.text(this.x-40, this.y-40, "Thank you!", 
			{ font: "18px Arial", align: "center", wordWrap: 'true', wordWrapWidth: '250'} );
			setTimeout(function() {speech.destroy();}, 10000);
		}
	}
	if( !success ) {
		var speech = BasicGame.game.add.text(this.x-120, this.y-75, "Bring me 3 colors of the same item will ya'", 
		{ font: "18px Arial", align: "center", wordWrap: 'true', wordWrapWidth: '250'} );
		setTimeout(function() {speech.destroy();}, 5000);
	}
};