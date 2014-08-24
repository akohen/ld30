BasicGame.Item = function(game, syncId, x, y, sprite, itemId, inventory, effect, frame) {
    Phaser.Sprite.call(this, game, x, y, sprite, frame);
    BasicGame.groups['items'].add(this);
    this.itemId = itemId;
    this.syncId = syncId;
    if (typeof inventory === 'undefined') { inventory = true; }
    this.inventory = inventory;
    if (typeof effect === 'undefined') { effect = ''; }
    this.effect = effect;

};

BasicGame.Item.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Item.prototype.constructor = BasicGame.Item;