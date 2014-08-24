BasicGame.Messaging = function() {
	var socket = io.connect();
	var playerId, mapId;
	var entities = {};
	socket.emit('connect');

	var entermap = function(mapId, x, y) {
		socket.emit('entermap', mapId, x, y);
		this.mapId = mapId;
		BasicGame.groups.clear();
		var player = new BasicGame.Player(BasicGame.game, x, y, 'character', playerId, true);
		entities.playerId = player;
		BasicGame.game.camera.follow( player );
	};


	socket.on('connected', function(playerId, mapId, x, y) {
		console.log('connceted as player ' + playerId);
		this.playerId = playerId;
		this.mapId = mapId;
		entermap(this.mapId, x, y);
	});

	socket.on('debug', function(message) {
		console.log('debug: ' + message);
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
		entermap(mapId, x, y);
	}
};

