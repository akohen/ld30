BasicGame.Pnj = function(game, x, y, sprite, frame) {
    Phaser.Sprite.call(this, game, x, y, sprite, frame);
    BasicGame.groups['pnjs'].add(this);
    this.body.immovable = true;
};

BasicGame.Pnj.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Pnj.prototype.constructor = BasicGame.Pnj;