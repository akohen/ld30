var Items = function () {
	var items, players, game;

	this.init = function( game, players ) {
		this.game = game;
		this.players = players;
		this.items = game.add.group();
		this.items.enableBody = true;
		this.items.physicsBodyType = Phaser.Physics.ARCADE;
	};

	this.addItem = function(itemId, sprite, x, y) {
		var item = this.items.create(x,y,sprite);
		item.itemId = itemId;
		return item;
	};


	this.update = function() {
		this.game.physics.arcade.overlap(this.items, this.players, this.collisionHandler);
	}

	this.collisionHandler = function(item, player) {
		console.log("item collision");
	}

};

BasicGame.Items = new Items();