BasicGame.Player = function(game, x, y, sprite, controllable) {
    Phaser.Sprite.call(this, game, x, y, sprite);
    BasicGame.groups['players'].add(this);
    this.inventory = [];
    if (typeof controllable === 'undefined') {
        controllable = false;
    } else {
    	this.controllable = controllable; 
    }
};

BasicGame.Player.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Player.prototype.constructor = BasicGame.Player;

BasicGame.Player.prototype.update = function() {
	if( this.controllable ) {
		var x = 0, y = 0;
		if (BasicGame.cursors.up.isDown) {
			y = -300;
		} else if (BasicGame.cursors.down.isDown) {
			y = 300;
		}

		if (BasicGame.cursors.left.isDown) {
			x = -300;
		} else if (BasicGame.cursors.right.isDown) {
			x = 300;
		}
		this.body.velocity.x = x;
    	this.body.velocity.y = y;
	} else {
		this.body.velocity.x = 0;
    	this.body.velocity.y = 0;
	}
	
}

BasicGame.Player.prototype.addItem = function(item) {
	BasicGame.groups['inventory'].add(item);
	item.reset(100,100);
}
