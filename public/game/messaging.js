BasicGame.Messaging = function() {
	var socket = io.connect();
	var playerId, mapId;
	var entities = {};
	socket.emit('connect');
	

	var entermap = function(mapId, x, y) {
		socket.emit('entermap', mapId, x, y);
		
		
		//BasicGame.groups.clear();
		//entities = {};
		//BasicGame.game.world.setBounds(offsetx, offsety, width, height);
	};


	socket.on('connected', function(playerId, mapId, x, y) {
		console.log('connceted as player ' + playerId);
		this.playerId = playerId;
		this.mapId = mapId;

		var p = new BasicGame.Player(BasicGame.game, 200, 200, 'character', playerId, true);

		entities[playerId] = p;
		this.player = p;
		BasicGame.player = p;

		BasicGame.game.camera.follow( this.player );
		
		entermap(mapId, x, y);
		console.log(playerId);
		console.log(entities[playerId]);
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

	socket.on('hit', function(syncId, damage) {
		entities[syncId].damage(damage);
		entities[syncId].updateHealthBar();
	});

	socket.on('updatePlayer', function(syncId, x, y, h) {
		if (syncId in entities) {
			entities[syncId].x = x;
			entities[syncId].y = y;
		} else {
			entities[syncId] = new BasicGame.Player(BasicGame.game, x, y, 'character2', syncId);
			entities[syncId].health = h;
			entities[syncId].updateHealthBar();
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
		socket.emit('updatePlayer', player.x, player.y, player.health);
	};

	this.entermap = function(mapId, x, y) {
		this.mapId = mapId;
		BasicGame.maps[mapId].enterMap(this.player, x, y);
	};

	this.pickup = function(item, player) {
		socket.emit('itemPickup', item.syncId, player.syncId);
	};

	this.hit = function(player, damage) {
		socket.emit('hit', player.syncId, damage);
	};
};

