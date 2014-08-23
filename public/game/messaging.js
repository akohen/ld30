BasicGame.Messaging = function() {
	var socket = io.connect();
	var playerId, mapId;
	var entities = {};
	socket.emit('connect');

	socket.on('connected', function(playerId, x, y) {
		console.log('connceted as player ' + playerId);
		this.playerId = playerId;
		this.mapId = playerId;
		var player = new BasicGame.Player(BasicGame.game, x, y, 'character', playerId, true);
		entities.playerId = player;
		BasicGame.game.camera.follow( player );
	});

	socket.on('updatePlayer', function(syncId, x, y) {
		if (syncId in entities) {
			entities[syncId].x = x;
			entities[syncId].y = y;
		} else {
			entities[syncId] = new BasicGame.Player(BasicGame.game, x, y, 'blue', syncId);
		}
		
	});

	this.updatePosition = function(player) {
		socket.emit('updatePlayer', player.x, player.y);
	};

	this.entermap = function(mapId, x, y) {
		socket.emit('entermap', mapId, x, y);
		this.mapId = mapId;
		entities.playerId.x = x;
		entities.playerId.y = y;
	};
};

