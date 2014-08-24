(function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

	BasicGame = {
    	score: 0
	};

	BasicGame.DefaultState = function (game) {
	};

	BasicGame.DefaultState.prototype = {
		preload: function() {
			// Debug images
			game.load.image('red', '../asset/redCube.png');
			game.load.image('blue', '../asset/blueCube.png');
			game.load.image('green', '../asset/greenCube.png');
			game.load.image('logo', '../asset/phaser.png');

			// Objects
			game.load.image('portal', '../asset/Objets/Mirror.png');
			game.load.spritesheet('items', '../asset/Objets/morceaux.png', 32, 32);
			game.load.spritesheet('blood', '../asset/Objets/Sang.png', 32, 32);

			game.load.spritesheet('character', '../asset/Characters/Sprite_Charac_New.png', 64, 50);
			game.load.spritesheet('character2', '../asset/Characters/Sprite_Charac_New3.png', 64, 50);

            game.load.image('pnj', '../asset/Characters/PNJ.png');

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
			map.setCollisionBetween(111,114, 'layer');
			map.setCollisionBetween(121,140, 'layer');
			
			BasicGame.cursors = game.input.keyboard.createCursorKeys();
            BasicGame.activePointer = game.input.activePointer;
            BasicGame.physics = game.physics.arcade;
            BasicGame.time = game.time;
            BasicGame.add = game.add;
            BasicGame.game = game;

            BasicGame.groups = new BasicGame.Groups();
            BasicGame.messaging = new BasicGame.Messaging();

            BasicGame.maps = {};
            BasicGame.maps['1'] = new BasicGame.Map(1, 0,0,1280,1280);
            BasicGame.maps['2'] = new BasicGame.Map(2, 0,1280,1280,1280);
            BasicGame.maps['3'] = new BasicGame.Map(3, 1280,0,1280,1280);
            BasicGame.maps['4'] = new BasicGame.Map(4, 1280,1280,1280,1280);
            BasicGame.maps['5'] = new BasicGame.Map(5, 2560,0,2560,1280);
            BasicGame.maps['6'] = new BasicGame.Map(6, 3840,0,576,1280);
            BasicGame.maps['7'] = new BasicGame.Map(7, 3840,1280,576,1280);
           
			BasicGame.groups.maps.add(layer);
			BasicGame.layer = layer;


            BasicGame.sounds = [];
            var fx = game.add.audio('pickup');
			fx.addMarker('pickup', 0, 0.2);
			BasicGame.sounds['pickup'] = fx;
            fx = game.add.audio('hit');
			fx.addMarker('hit', 0, 0.2);
			BasicGame.sounds['hit'] = fx;	

			new BasicGame.Item(game, -1, 400, 200, 'portal', 2, false, 
				function(player) { BasicGame.maps['5'].enterMap(player,200,200); } );

            new BasicGame.Pnj(game, 400, 400, 'pnj', 2);

			/*new BasicGame.Item(game, 300, 150, 'blue', 2, false, 
			function(player) { player.x = 500; player.y = 500;  } );*/

			/*new BasicGame.Item(game, 500, 400, 'items', 2, true, '', 0);
			new BasicGame.Item(game, 500, 450, 'items', 2, true, '', 1);
			new BasicGame.Item(game, 500, 500, 'items', 2, true, '', 8);
			new BasicGame.Item(game, 500, 550, 'items', 2, true, '', 4);
			new BasicGame.Item(game, 400, 500, 'items', 2, true, '', 13);*/
		},

		createCustom: function() {

		},

		update: function() {
			game.physics.arcade.collide(BasicGame.groups['players']);
			game.physics.arcade.collide(BasicGame.groups['players'], BasicGame.groups["pnjs"]);
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
			BasicGame.messaging.pickup(item, player);
		},

        render: function(){
            if (BasicGame.player != undefined){
                game.debug.body(BasicGame.player);
                var x = BasicGame.player.x;
                var y = BasicGame.player.y;
                var range = 150;
                var angleDegats = Math.PI / 4;
                var cercle = new Phaser.Circle(x,y, range ) ;
                game.debug.geom( cercle, 'rgba(255,255,255,0.2)' ) ;

                var angleSouris = BasicGame.physics.angleToPointer(BasicGame.player);
                var toPointer = BasicGame.Utils.lignePolaire(x,y, angleSouris, range / 2);
                var limiteHaute = BasicGame.Utils.lignePolaire(x,y, angleSouris + (angleDegats / 2), range / 2);
                var limiteBasse = BasicGame.Utils.lignePolaire(x,y, angleSouris - (angleDegats / 2), range / 2);
                game.debug.geom( toPointer, 'rgba(255,255,255,0.6)' ) ;
                game.debug.geom( limiteHaute, 'rgba(255,255,255,0.6)' ) ;
                game.debug.geom( limiteBasse, 'rgba(255,255,255,0.6)' ) ;

                /*var point = new Phaser.Point( BasicGame.player.x, BasicGame.player.y ) ;
                game.debug.geom( point, 'rgba(255,255,255,1)' ) ;*/
            }
        }
	};

	var state1 = new BasicGame.DefaultState();
	game.state.add('state1', state1);
	game.state.start('state1');

})();