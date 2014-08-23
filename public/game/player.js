BasicGame.Player = function(game, x, y, sprite, syncId, controllable) {
    Phaser.Sprite.call(this, game, x, y, sprite);
    BasicGame.groups['players'].add(this);
    this.inventory = [];
    if (typeof controllable === 'undefined') { controllable = false; }
    this.controllable = controllable; 
    this.hittingCd = 300;
    this.nextHit = 0;
    this.damageOnHit = 0.4;
    this.knockback = 50;
    this.syncId = syncId;
    this.pickup = [];
    this.direction = "bot";


    this.animations.add("move_down",[0]);
    this.animations.add("move_left",[3]);
    this.animations.add("move_up",[6]);
    this.animations.add("move_right",[9]);
    this.animations.add("hit_down",[1,2,0]);
    this.animations.add("hit_left",[4,5,3]);
    this.animations.add("hit_up",[7,8,6]);
    this.animations.add("hit_right",[10,11,9]);
};

BasicGame.Player.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Player.prototype.constructor = BasicGame.Player;

BasicGame.Player.prototype.update = function() {
	while( this.pickup.length > 0) {
		var item = this.pickup.pop();

		if(item.inventory) {
			this.inventory.push(item);
			if( this.controllable ) {
				BasicGame.sounds['pickup'].play('pickup');
				BasicGame.groups['inventory'].add(item);
				item.reset(75, BasicGame.groups['inventory'].countLiving()*25);
			}
		}

		if( item.effect != '') {
			item.effect(this);
		}
	}

	this.body.velocity.x = 0;
    this.body.velocity.y = 0;
	if( this.controllable ) {
		BasicGame.messaging.updatePosition(this);

        //FIGHT!
        if (BasicGame.activePointer.isDown){
            BasicGame.Fighting.hitWithAxe(this);
        }

        //Movement
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

        //Face cursor
        var angle = BasicGame.physics.angleToPointer(this);
        this.faceDirection(BasicGame.Utils.angleToDirection(angle));
    }
	
};

BasicGame.Player.prototype.faceDirection = function(direction) {
    if (direction != this.direction){
        this.animations.play("move_"+direction);
        this.direction = direction;
    }
};

BasicGame.Player.prototype.hitDirection = function(direction) {
    this.animations.play("hit_"+direction, 3);
};
