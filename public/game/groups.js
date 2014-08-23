BasicGame.Groups = function() {
	
	this.players = BasicGame.add.group();
	this.players.enableBody = true;
	this.players.physicsBodyType = Phaser.Physics.ARCADE;

	this.items = BasicGame.add.group();
	this.items.enableBody = true;
	this.items.physicsBodyType = Phaser.Physics.ARCADE;

	this.inventory = BasicGame.add.group();
	this.inventory.fixedToCamera = true;

	this.otherItems = BasicGame.add.group();
	this.otherItems.visible = false;
};

