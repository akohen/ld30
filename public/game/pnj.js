BasicGame.Pnj = function(game, x, y, sprite, frame) {
    Phaser.Sprite.call(this, game, x, y, sprite, frame);
    BasicGame.groups['pnjs'].add(this);
    this.body.immovable = true;
    this.anchor.setTo(0.5,0.5);
};

BasicGame.Pnj.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Pnj.prototype.constructor = BasicGame.Pnj;