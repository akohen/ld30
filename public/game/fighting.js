BasicGame.Fighting = (function () {
    var hitWithAxe = function(game, body) {
        var tmp = game.add.bitmapData(20, 20);
        var range = 50;
        //tmp.fill( 200, 100, 0, 1 );

        var angle = game.physics.arcade.angleToPointer(body);
        var x = body.x + (Math.cos(angle) * range);
        var y = body.y + (Math.sin(angle) * range);

        var zone = game.add.sprite(x, y, tmp);
        game.physics.arcade.enable( zone );
        zone.body.allowGravity   = false;
        zone.body.immovable      = true;

        game.physics.arcade.overlap(zone, BasicGame.groups["players"], function(){
            console.log("touché!")
        }, null, this);
        zone.kill();
    };

    return {
        hitWithAxe : hitWithAxe
    };
}());