window.onload = function() {

        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
        var player;
        var blue;

        function preload () {

            game.load.image('red', '../asset/redCube.png');
            game.load.image('blue', '../asset/blueCube.png');
            game.load.image('green', '../asset/greenCube.png');
            game.load.image('logo', '../asset/phaser.png');

        }

        function create () {
        	game.world.setBounds(0, 0, 1920, 1920);
            game.physics.startSystem(Phaser.Physics.ARCADE);
            var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);

            blue = game.add.sprite(game.world.centerX, game.world.centerY-200, 'blue');
           	this.game.physics.enable(blue, Phaser.Physics.ARCADE);
			blue.body.immovable = true;

			player = game.add.sprite(game.world.centerX, game.world.centerY, 'red');
			this.game.physics.enable(player, Phaser.Physics.ARCADE);
			
	        var groundBlock = this.game.add.sprite(1000, 1000, 'green');
	        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
	        
			cursors = game.input.keyboard.createCursorKeys();
			game.camera.follow(player);
        }


        function update () {
        	player.body.velocity.x = 0;
        	player.body.velocity.y = 0;

			if (cursors.up.isDown) {
				player.body.velocity.y = -300;
			} else if (cursors.down.isDown) {
				player.body.velocity.y = 300;
			}

			if (cursors.left.isDown) {
				player.body.velocity.x = -300;
			} else if (cursors.right.isDown) {
			player.body.velocity.x = 300;
			}
			game.physics.arcade.collide(player,blue);		
        }

    };