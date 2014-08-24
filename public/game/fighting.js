BasicGame.Fighting = (function () {
    var hitWithAxe = function(player) {

        if (BasicGame.time.now > player.nextHit){

            var range = 150;
            var angleDegats = Math.PI / 4;

            var angleSouris = BasicGame.physics.angleToPointer(player);

            BasicGame.groups["players"].forEachAlive(function(target){
                if (target != player && BasicGame.physics.distanceBetween(player, target) < range){
                    if (Math.abs(angleSouris - BasicGame.angleBetween(player, target)) < (angleDegats / 2)){
                        target.damage(player.damageOnHit);
                        target.body.x = target.body.x + (Math.cos(angleSouris) * player.knockback);
                        target.body.y = target.body.y + (Math.sin(angleSouris) * player.knockback);
                        console.log("touché!");
                        BasicGame.sounds['hit'].play('hit');
                        target.updateHealthBar();
                    }
                }
            }, this);

            player.animateAttack(BasicGame.Utils.angleToDirection(angleSouris));
            player.nextHit = BasicGame.time.now + player.hittingCd;
        }

    };

    return {
        hitWithAxe : hitWithAxe
    };
}());