BasicGame.Messaging = function() {
	var socket = io.connect();
	var playerId, mapId;
	var entities = {};
	socket.emit('connect');
	var player = new BasicGame.Player(BasicGame.game, 200, 200, 'character', playerId, true);
	entities.playerId = player;
	BasicGame.game.camera.follow( player );
    BasicGame.player = player;

	var entermap = function(mapId, x, y) {
		socket.emit('entermap', mapId, x, y);
		this.mapId = mapId;
		BasicGame.maps[mapId].enterMap(BasicGame.player, x, y);
		//BasicGame.groups.clear();
		//entities = {};
		//BasicGame.game.world.setBounds(offsetx, offsety, width, height);
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

	socket.on('addItem', function(syncId, itemId, frame, x, y) {
		entities[syncId] = new BasicGame.Item(BasicGame.game, syncId, x, y, 'items', itemId, true, '', frame);
	});

	socket.on('removeItem', function(syncId) {
		entities[syncId].destroy();
	});

	socket.on('updatePlayer', function(syncId, x, y) {
		if (syncId in entities) {
			entities[syncId].x = x;
			entities[syncId].y = y;
		} else {
			entities[syncId] = new BasicGame.Player(BasicGame.game, x, y, 'character2', syncId);
		}
		
	});

	socket.on('removePlayer', function(syncId) {
		if (syncId in entities) {
			entities[syncId].destroy();
			entities[syncId].healthBar.destroy();
			entities[syncId].label.destroy();
		}
	});

	this.updatePosition = function(player) {
		socket.emit('updatePlayer', player.x, player.y);
	};

	this.entermap = function(mapId, x, y) {
		entermap(mapId, x, y);
	};

	this.pickup = function(item, player) {
		socket.emit('itemPickup', item.syncId, player.syncId);
	};
};

