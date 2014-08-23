BasicGame.Item = function(game, x, y, sprite, itemId, effect) {
    Phaser.Sprite.call(this, game, x, y, sprite);
    BasicGame.groups['items'].add(this);
    this.itemId = itemId;
    if (typeof effect === 'undefined') { effect = ''; }
    this.effect = effect;
};

BasicGame.Item.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Item.prototype.constructor = BasicGame.Item;