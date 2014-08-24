BasicGame.Interaction = (function () {
    var range = 150;
    var angleDegats = Math.PI / 4;

    var interact = function(player) {
        var angleSouris = BasicGame.physics.angleToPointer(player);

        if (player.axeSelected && BasicGame.time.now > player.nextHit){

            BasicGame.groups["players"].forEachAlive(function(target){
                if (target != player && BasicGame.physics.distanceBetween(player, target) < range){
                    if (Math.abs(angleSouris - BasicGame.physics.angleBetween(player, target)) < (angleDegats / 2)){
                        target.damage(player.damageOnHit);
                        target.updateHealthBar();
                        BasicGame.sounds['hit'].play('hit');
                        BasicGame.messaging.hit(target, player.damageOnHit);
                        if( target.health <= 0 ) {
                            BasicGame.groups.blood.add( BasicGame.game.add.sprite(target.x, target.y,'blood', Math.floor(Math.random() * 4) ));
                            BasicGame.messaging.blood(target.x, target.y);
                        }
                    }
                }
            }, this);

            player.animateAttack(BasicGame.Utils.angleToDirection(angleSouris));
            player.nextHit = BasicGame.time.now + player.hittingCd;

        }
        else if (BasicGame.time.now > player.nextHit){
            BasicGame.groups["pnjs"].forEachAlive(function(target) {
                if (target != player && BasicGame.physics.distanceBetween(player, target) < range) {
                    if (Math.abs(angleSouris - BasicGame.physics.angleBetween(player, target)) < (angleDegats / 2)) {
                        target.talk(player);
                    }
                }
            }, this);
            player.nextHit = BasicGame.time.now + player.hittingCd;
        }

    };

    return {
        interact : interact
    };
}());