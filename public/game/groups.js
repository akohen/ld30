BasicGame.Groups = (function () {
	var init = function(game) {
		BasicGame.groups = [];
		BasicGame.groups["players"] = game.add.group();
		BasicGame.groups["players"].enableBody = true;
		BasicGame.groups["players"].physicsBodyType = Phaser.Physics.ARCADE;

		BasicGame.groups["items"] = game.add.group();
		BasicGame.groups["items"].enableBody = true;
		BasicGame.groups["items"].physicsBodyType = Phaser.Physics.ARCADE;

		BasicGame.groups["inventory"] = game.add.group();
		BasicGame.groups["inventory"].fixedToCamera = true;
	}

	return {
		init : init
	};
}());