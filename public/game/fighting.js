BasicGame.Fighting = (function () {
    var hitWithAxe = function(player) {

        if (BasicGame.time.now > player.nextHit){

            var tmp = BasicGame.add.bitmapData(20, 20);
            var range = 30;
            //tmp.fill( 200, 100, 0, 1 );

            var angle = BasicGame.physics.angleToPointer(player);
            var x = player.x + (Math.cos(angle) * range);
            var y = player.y + (Math.sin(angle) * range);

            player.hitDirection(BasicGame.Utils.angleToDirection(angle));

            var zone = BasicGame.add.sprite(x, y, tmp);
            BasicGame.physics.enable( zone );
            zone.body.allowGravity   = false;
            zone.body.immovable      = true;
            zone.anchor.setTo(0.5,0.5);

            BasicGame.physics.overlap(zone, BasicGame.groups["players"], function(circle,target){
                if (target != player){
                    target.damage(player.damageOnHit);
                    target.body.x = target.body.x + (Math.cos(angle) * player.knockback);
                    target.body.y = target.body.y + (Math.sin(angle) * player.knockback);
                    console.log("touché!");
                    BasicGame.sounds['hit'].play('hit')
                }
            }, null, this);

            player.nextHit = BasicGame.time.now + player.hittingCd;

            zone.kill();
        }

    };

    return {
        hitWithAxe : hitWithAxe
    };
}());