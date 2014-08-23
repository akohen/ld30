BasicGame.Player = function(game, x, y, sprite, controllable) {
    Phaser.Sprite.call(this, game, x, y, sprite);
    BasicGame.groups['players'].add(this);
    this.inventory = [];
    if (typeof controllable === 'undefined') {
        controllable = false;
    } else {
    	this.controllable = controllable; 
    }
    this.hittingCd = 300;
    this.nextHit = 0;
    this.damageOnHit = 0.4;
    this.knockback = 50;
};

BasicGame.Player.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Player.prototype.constructor = BasicGame.Player;

BasicGame.Player.prototype.update = function() {
	if( this.pickup != null ) {
		this.inventory.push(this.pickup);		
		if( this.controllable ) {
			BasicGame.sounds['pickup'].play('pickup');
			BasicGame.groups['inventory'].add(this.pickup);
			this.pickup.reset(75, BasicGame.groups['inventory'].countLiving()*25);
		} else {
			BasicGame.groups['otherItems'].add(this.pickup);
		}
		this.pickup = null;
	}

	this.body.velocity.x = 0;
    this.body.velocity.y = 0;

	if( this.controllable ) {

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
	}
	
};

BasicGame.Player.prototype.addItem = function(item) {
	this.pickup = item;
	
};

