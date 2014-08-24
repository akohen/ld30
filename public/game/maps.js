BasicGame.Map = function(mapId, offsetX, offsetY, width, height) {
    this.mapId = mapId;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.width = width;
    this.height = height;

    //BasicGame.maps[mapId] = this;
    this.enterMap = function(player, x, y) {
        player.x = this.offsetX + x;
        player.y = this.offsetY + y;
        BasicGame.game.world.setBounds(this.offsetX, this.offsetY, this.width, this.height);
    };

    this.getSpawnPoint = function() {
        
    }

};
