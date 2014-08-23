(function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

	BasicGame = {
    	score: 0
	};

	BasicGame.DefaultState = function (game) {
	};

	BasicGame.DefaultState.prototype = {
		preload: function() {
			game.load.image('red', '../asset/redCube.png');
			game.load.image('blue', '../asset/blueCube.png');
			game.load.image('green', '../asset/greenCube.png');
			game.load.image('logo', '../asset/phaser.png');
		},

		create: function() {
			game.world.setBounds(0, 0, 1920, 1920);
			game.physics.startSystem(Phaser.Physics.ARCADE);
			var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
			logo.anchor.setTo(0.5, 0.5);
			BasicGame.Groups.init(game);

			this.player = BasicGame.groups["players"].create(game.world.centerX, game.world.centerY, 'red');
			var test = new BasicGame.Player(this.player);
			test.foo();
			this.blue = BasicGame.groups["players"].create(game.world.centerX, game.world.centerY-200, 'blue');
			this.blue.body.immovable = true;

			var groundBlock = this.game.add.sprite(150, 100, 'green');
			this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
			groundBlock.fixedToCamera = true;

			this.cursors = new Input(game.input.keyboard.createCursorKeys());
			game.camera.follow(this.player);

			BasicGame.groups["items"].create(game.world.centerX-100, game.world.centerY-100, 'green');
		},

		update: function() {
			this.cursors.updateVelocity(this.player.body);
			game.physics.arcade.collide(BasicGame.groups['players']);
			this.game.physics.arcade.overlap(
				BasicGame.groups['items'], 
				BasicGame.groups['players'], 
				this.collisionHandler
			);
		},

		collisionHandler: function(item, player) {
			console.log("test item");
		}
	}

	var state1 = new BasicGame.DefaultState();

	game.state.add('state1', state1);
	game.state.start('state1');
})();