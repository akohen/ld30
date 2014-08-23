var Input = function(cursors) {
	this.cursors = cursors;

	var updateVelocity = function(body) {
		body.velocity.x = 0;
    	body.velocity.y = 0;

		if (cursors.up.isDown) {
			body.velocity.y = -300;
		} else if (cursors.down.isDown) {
			body.velocity.y = 300;
		}

		if (cursors.left.isDown) {
			body.velocity.x = -300;
		} else if (cursors.right.isDown) {
			body.velocity.x = 300;
		}
	}

	return {
		updateVelocity : updateVelocity
	};
};
