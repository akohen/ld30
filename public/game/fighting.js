BasicGame.Fighting = (function () {
    var hitWithAxe = function(player) {

        if (player.axeSelected && BasicGame.time.now > player.nextHit){

            var range = 150;
            var angleDegats = Math.PI / 4;

            var angleSouris = BasicGame.physics.angleToPointer(player);

            BasicGame.groups["players"].forEachAlive(function(target){
                if (target != player && BasicGame.physics.distanceBetween(player, target) < range){
                    if (Math.abs(angleSouris - BasicGame.physics.angleBetween(player, target)) < (angleDegats / 2)){
                        target.damage(player.damageOnHit);
                        target.updateHealthBar();
                        BasicGame.sounds['hit'].play('hit');
                        BasicGame.messaging.hit(target, player.damageOnHit);
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