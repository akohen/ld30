BasicGame.Item = function(game, x, y, sprite, itemId, inventory, effect, frame) {
    Phaser.Sprite.call(this, game, x, y, sprite, frame);
    BasicGame.groups['items'].add(this);
    this.itemId = itemId;
    if (typeof inventory === 'undefined') { inventory = true; }
    this.inventory = inventory;
    if (typeof effect === 'undefined') { effect = ''; }
    this.effect = effect;

};

BasicGame.Item.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Item.prototype.constructor = BasicGame.Item;