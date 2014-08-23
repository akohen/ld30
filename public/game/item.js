BasicGame.Item = function(game, x, y, sprite, itemId) {
    Phaser.Sprite.call(this, game, x, y, sprite);
    BasicGame.groups['items'].add(this);
    this.itemId = itemId;
};

BasicGame.Item.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Item.prototype.constructor = BasicGame.Item;