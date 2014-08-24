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
			game.load.spritesheet('character', '../asset/Characters/Sprite_Charac.png', 64, 64, 12);
			game.load.tilemap('prairie', 'asset/Flora/carte_prairie2.json', null, Phaser.Tilemap.TILED_JSON);
			game.load.image('carte_prairie_2', 'asset/Flora/carte_prairie_2.png');
			game.load.audio('pickup', 'asset/Pickup.wav');
			game.load.audio('hit', 'asset/Hit.wav');
		},

		create: function() {

			game.physics.startSystem(Phaser.Physics.ARCADE);

			var map = game.add.tilemap('prairie');
			map.addTilesetImage('carte_prairie_2', 'carte_prairie_2');
			
			var layer = map.createLayer('layer');
			layer.resizeWorld();			
			map.setCollisionBetween(110,140, 'layer');

			BasicGame.cursors = game.input.keyboard.createCursorKeys();
            BasicGame.activePointer = game.input.activePointer;
            BasicGame.physics = game.physics.arcade;
            BasicGame.time = game.time;
            BasicGame.add = game.add;
            BasicGame.game = game;

            BasicGame.groups = new BasicGame.Groups();
            BasicGame.messaging = new BasicGame.Messaging();


           
			BasicGame.groups.maps.add(layer);
			BasicGame.layer = layer;


            BasicGame.sounds = [];
            var fx = game.add.audio('pickup');
			fx.addMarker('pickup', 0, 0.2);
			BasicGame.sounds['pickup'] = fx;
            fx = game.add.audio('hit');
			fx.addMarker('hit', 0, 0.2);
			BasicGame.sounds['hit'] = fx;		
		},

		createCustom: function() {

		},

		update: function() {
			game.physics.arcade.collide(BasicGame.groups['players']);
			game.physics.arcade.overlap(
				BasicGame.groups['items'], 
				BasicGame.groups['players'], 
				this.collisionHandler
			);
			game.physics.arcade.collide(
				BasicGame.layer, 
				BasicGame.groups.players
			);
		},

		collisionHandler: function(item, player) {
			player.pickup.push(item);
		}
	};

	var state1 = new BasicGame.DefaultState();

	state1.createCustom = function() {
		var mummy = game.add.sprite(800, 900, 'mummy');
		mummy.animations.add('walk');
		mummy.animations.play('walk', 20, true);

		//new BasicGame.Item(game, 1000, 1000, 'green',1, function(player){player.game.state.start('state2');});
		new BasicGame.Item(game, 100, 150, 'blue', 2, false, 
			function() { BasicGame.messaging.entermap(512,150,250); } );
		new BasicGame.Item(game, 200, 200, 'blue',2);
		new BasicGame.Item(game, 1000, 1150, 'blue',2);
		new BasicGame.Item(game, 1000, 1200, 'red',2);
		new BasicGame.Item(game, 1100, 1100, 'red',3);
	};

	game.state.add('state1', state1);
	game.state.start('state1');

})();