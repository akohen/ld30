BasicGame.Groups = function() {
	
	this.maps = BasicGame.add.group();
	
	this.players = BasicGame.add.group();
	this.players.enableBody = true;
	this.players.physicsBodyType = Phaser.Physics.ARCADE;

	this.items = BasicGame.add.group();
	this.items.enableBody = true;
	this.items.physicsBodyType = Phaser.Physics.ARCADE;

	this.labels = BasicGame.add.group();

	this.inventory = BasicGame.add.group();
	this.inventory.fixedToCamera = true;

	this.otherItems = BasicGame.add.group();
	this.otherItems.visible = false;

	this.clear = function() {
		this.players.removeAll(true);
		this.items.removeAll(true);
		this.labels.removeAll(true);
		this.inventory.removeAll(true);
		this.otherItems.removeAll(true);
	}
};

