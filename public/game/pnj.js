BasicGame.Pnj = function(game, x, y, sprite, frame) {
    Phaser.Sprite.call(this, game, x, y, sprite, frame);
    BasicGame.groups['pnjs'].add(this);
    this.body.immovable = true;
    this.anchor.setTo(0.5,0.5);
};

BasicGame.Pnj.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Pnj.prototype.constructor = BasicGame.Pnj;

BasicGame.Pnj.prototype.talk = function() {
	var speech = BasicGame.game.add.text(this.x-120, this.y-75, "Bring me 4 colors of the same item will ya'", 
		{ font: "18px Arial", align: "center", wordWrap: 'true', wordWrapWidth: '250'} );
	setTimeout(function() {speech.destroy();}, 5000);
};