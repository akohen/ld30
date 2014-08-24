BasicGame.Utils = function() {

    var angleToDirection = function(angle){
        if (angle < - (3 * Math.PI) / 4){
            return "left";
        } else if (angle < - ((Math.PI / 4))){
            return "up";
        } else if (angle <  (Math.PI / 4)){
            return "right";
        } else if (angle < (3 * Math.PI) / 4){
            return "down";
        } else{
            return "left";
        }
    };

    var lignePolaire = function(x,y, angle, norme){
        var x2 = x + norme * Math.cos(angle);
        var y2 = y + norme * Math.sin(angle);
        return new Phaser.Line(x,y,x2,y2);
    };

    return {
        angleToDirection : angleToDirection,
        lignePolaire : lignePolaire
    }
}();
