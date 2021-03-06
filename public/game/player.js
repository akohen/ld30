BasicGame.Player = function(game, x, y, sprite, syncId, controllable) {
    var nicks = ['Alex', 'Gabi', 'Tibo', 'Flo', 'Val', 'Max', 'Bob', 'Jack', 'Tim', 'Rachel', 'Notch', 'Blue', 'Olav', 'Mike', 'Phil', 'Seth', 'Peter'];
    Phaser.Sprite.call(this, game, x, y, sprite);
    BasicGame.groups['players'].add(this);
    this.anchor.setTo(0.5,0.5);
    this.body.setSize(24,30,0,10);

    this.inventory = [];
    if (typeof controllable === 'undefined') { controllable = false; }
    this.controllable = controllable; 
    this.axeSelected = false;
    this.hittingCd = 300;
    this.nextHit = 0;
    this.damageOnHit = 0.4;
    this.syncId = syncId;
    this.pickup = [];
    this.direction = null;
    this.attackAnimation = null;
    this.currentAnimationName = null;
    this.currentAnimationFramerate = null;
    this.name = nicks[Math.floor(Math.random()*nicks.length)];
    this.label = BasicGame.game.add.text(x, y, this.name, { font: "12px Arial"});
    this.label.anchor.setTo(0.5,0.5);
    
    BasicGame.groups.labels.add(this.label);

    this.updateHealthBar();

    var spritePerLine = 7;
    var anims = {
        hidle : [0],
        hidle_axe : [5],
        move : [0,1,2],
        move_axe : [3,4,5],
        hit : [5,6,5,6,5]
    };
    var orientations = ["down", "left", "up", "right"];
    for (var i = 0; i < orientations.length; i++){
        for (var anim in anims){
            var animD = anims[anim].slice().map(function(elem){return elem + i * spritePerLine});
            this.animations.add("" + anim + "_" + orientations[i], animD);
        }
    }
    var outer = this;
    if (this.controllable){
        BasicGame.game.input.keyboard.addKey(Phaser.Keyboard.E).onDown.add(function(){
            outer.axeSelected = !outer.axeSelected;
            outer.updateAnimation();
        });
    }
};

BasicGame.Player.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Player.prototype.constructor = BasicGame.Player;

BasicGame.Player.prototype.update = function() {
    this.label.x = this.x;
    this.label.y = this.y - 35;

    this.healthBar.x = this.x;
    this.healthBar.y = this.y + 40;
	while( this.pickup.length > 0) {
		var item = this.pickup.pop();

		if(item.inventory) {
			this.inventory.push(item);
			if( this.controllable ) {
				BasicGame.sounds['pickup'].play('pickup');
				BasicGame.groups['inventory'].add(item);
				item.reset(40, BasicGame.groups['inventory'].countLiving()*25);
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
        if (BasicGame.activePointer.isDown || BasicGame.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown){
            BasicGame.Interaction.interact(this);
        }

        //Movement
		var x = 0, y = 0;
		if (BasicGame.cursors.up.isDown
            || BasicGame.game.input.keyboard.addKey(Phaser.Keyboard.Z).isDown
            || BasicGame.game.input.keyboard.addKey(Phaser.Keyboard.W).isDown) {
			y = -300;
		} else if (BasicGame.cursors.down.isDown
            || BasicGame.game.input.keyboard.addKey(Phaser.Keyboard.S).isDown) {
			y = 300;
		}

		if (BasicGame.cursors.left.isDown
            || BasicGame.game.input.keyboard.addKey(Phaser.Keyboard.A).isDown
            || BasicGame.game.input.keyboard.addKey(Phaser.Keyboard.Q).isDown) {
			x = -300;
		} else if (BasicGame.cursors.right.isDown
            || BasicGame.game.input.keyboard.addKey(Phaser.Keyboard.D).isDown) {
			x = 300;
		}
		this.body.velocity.x = x;
    	this.body.velocity.y = y;

        this.updateAnimation();
    }
	
};

BasicGame.Player.prototype.updateAnimation = function () {
    if (this.attackAnimation == undefined || this.attackAnimation.isFinished){
        var direction = BasicGame.Utils.angleToDirection(BasicGame.physics.angleToPointer(this));
        var moving = this.body.velocity.x != 0 || this.body.velocity.y != 0;
        this.currentAnimationName = (moving ? "move_" : "hidle_") + (this.axeSelected ? "axe_" : "") + direction;
        this.currentAnimationFramerate = 10;
        this.animations.play(this.currentAnimationName, this.currentAnimationFramerate);
    }
};

BasicGame.Player.prototype.animateAttack = function(direction) {
    this.currentAnimationName = "hit_" + direction;
    this.currentAnimationFramerate = 10;
    this.attackAnimation = this.animations.play(this.currentAnimationName, this.currentAnimationFramerate);
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
