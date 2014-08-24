BasicGame.Player = function(game, x, y, sprite, syncId, controllable) {
    Phaser.Sprite.call(this, game, x, y, sprite);
    BasicGame.groups['players'].add(this);
    this.anchor.setTo(0.5,0.5);

    this.inventory = [];
    if (typeof controllable === 'undefined') { controllable = false; }
    this.controllable = controllable; 
    this.hittingCd = 300;
    this.nextHit = 0;
    this.damageOnHit = 0.4;
    this.knockback = 50;
    this.syncId = syncId;
    this.pickup = [];
    this.direction = "down";
    this.attackAnimation = null;
    this.name = "Pseudo";
    this.label = BasicGame.game.add.text(x, y, this.name, { font: "10px Arial"});
    this.label.anchor.setTo(0.5,0.5);
    this.body.collideWorldBounds = true;
    BasicGame.groups.labels.add(this.label);

    this.animations.add("move_down",[0,1,2]);
    this.animations.add("move_left",[5,6,7]);
    this.animations.add("move_up",[10,11,12]);
    this.animations.add("move_right",[15,16,17]);
    this.animations.add("hit_down",[3,4,3,4]);
    this.animations.add("hit_left",[8,9,8,9]);
    this.animations.add("hit_up",[13,14,13,14]);
    this.animations.add("hit_right",[18,19,18,19]);
};

BasicGame.Player.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Player.prototype.constructor = BasicGame.Player;

BasicGame.Player.prototype.update = function() {
    this.label.x = this.x;
    this.label.y = this.y - 25;

    this.healthBar.x = this.x;
    this.healthBar.y = this.y + 40;
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
    if (direction != this.direction && (this.attackAnimation == undefined || this.attackAnimation.isFinished)){
        this.animations.play("move_"+direction);
        this.direction = direction;
    }
};

BasicGame.Player.prototype.hitDirection = function(direction) {
    this.attackAnimation = this.animations.play("hit_"+direction, 10);
};

BasicGame.Player.prototype.updateHealthBar = function(){
    if (this.healthBar != undefined){
        this.healthBar.kill();
    }
    var tmp = BasicGame.add.bitmapData(80 * this.health, 10);
    tmp.fill(0, 255, 0, 1 );
    this.healthBar = BasicGame.add.sprite(this.x, this.y, tmp);

    this.healthBar.anchor.setTo(0.5,0.5);
    BasicGame.groups.labels.add(this.healthBar);
};
