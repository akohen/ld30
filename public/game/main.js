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
			game.load.spritesheet('mummy', '../asset/metalslug_mummy37x45.png', 37, 45, 18);
			game.load.tilemap('prairie', 'asset/Flora/carte_prairie.json', null, Phaser.Tilemap.TILED_JSON);
			game.load.image('carte_prairie', 'asset/Flora/carte_prairie.png');
		},

		create: function() {
			
			map = game.add.tilemap('prairie');
			map.addTilesetImage('carte_prairie', 'carte_prairie');
			layer = map.createLayer('Fond de carte');
			layer.resizeWorld();
			game.world.setBounds(0, 0, 1520, 1520);
			

			game.physics.startSystem(Phaser.Physics.ARCADE);
			var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
			logo.anchor.setTo(0.5, 0.5);

			BasicGame.Groups.init(game);
			BasicGame.cursors = game.input.keyboard.createCursorKeys();

			this.player = new BasicGame.Player(game, game.world.centerX, game.world.centerY, 'red', true);
			new BasicGame.Player(game, game.world.centerX, game.world.centerY-200, 'blue');

			BasicGame.groups["inventory"].create(100, 50, 'green');

			var mummy = game.add.sprite(800, 900, 'mummy');
			mummy.animations.add('walk');
			mummy.animations.play('walk', 20, true);

			game.camera.follow(this.player);
			
			BasicGame.groups["items"].create(game.world.centerX-100, game.world.centerY-100, 'green');
		},

		update: function() {

            if (game.input.activePointer.isDown){
                BasicGame.Fighting.hitWithAxe(game, this.player.body);
            }

			game.physics.arcade.collide(BasicGame.groups['players']);
			game.physics.arcade.overlap(
				BasicGame.groups['items'], 
				BasicGame.groups['players'], 
				this.collisionHandler
			);
		},

		collisionHandler: function(item, player) {
			console.log("test item");
			player.addItem(item);
		}
	};

	var state1 = new BasicGame.DefaultState();

	game.state.add('state1', state1);
	game.state.start('state1');
})();