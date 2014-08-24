BasicGame.Map = function(mapId, offsetX, offsetY, width, height) {
    this.mapId = mapId;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.width = width;
    this.height = height;

    //BasicGame.maps[mapId] = this;

    this.resizeWorld = function() {
        BasicGame.game.world.setBounds(this.offsetX, this.offsetY, this.width, this.height);
    }

};
