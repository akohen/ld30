BasicGame.Item = function(game, x, y, sprite, itemId) {
    Phaser.Sprite.call(this, game, x, y, sprite);
    BasicGame.groups['items'].add(this);
    this.itemId = itemId;
};

BasicGame.Item.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Item.prototype.constructor = BasicGame.Item;
/*
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
*/