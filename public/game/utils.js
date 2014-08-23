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

    return {
        angleToDirection : angleToDirection
    }
}();
