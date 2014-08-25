var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)

io.set('log level', 1);

app.use(express.static(__dirname + '/public'));

var lastId = 0;
var maps = {};
var items = {};

var spawnPoints = [];
var spawnPoint = function(x,y) {
    this.x = x*32+16;
    this.y = y*32+16;
    this.available = true;
}

var getAvailableSpawn = function() {
    var point = '';
    while( point == '') {
        var i = Math.floor(Math.random()*spawnPoints.length);
        if( spawnPoints[i].available ) {
            point = spawnPoints[i];
        }
    }
    return point;
}


// for testing
/*
spawnPoints.push(new spawnPoint(13,9));
spawnPoints.push(new spawnPoint(15,9));
spawnPoints.push(new spawnPoint(17,9));*/


spawnPoints.push(new spawnPoint(7,11));
spawnPoints.push(new spawnPoint(17,9));
spawnPoints.push(new spawnPoint(28,8));
spawnPoints.push(new spawnPoint(32,28));
spawnPoints.push(new spawnPoint(18,35));
spawnPoints.push(new spawnPoint(8,31));
spawnPoints.push(new spawnPoint(11,29));
spawnPoints.push(new spawnPoint(30,36));
spawnPoints.push(new spawnPoint(37,11));

spawnPoints.push(new spawnPoint(7,51));
spawnPoints.push(new spawnPoint(17,49));
spawnPoints.push(new spawnPoint(28,48));
spawnPoints.push(new spawnPoint(32,68));
spawnPoints.push(new spawnPoint(18,75));
spawnPoints.push(new spawnPoint(8,101));
spawnPoints.push(new spawnPoint(11,69));
spawnPoints.push(new spawnPoint(8,52));
spawnPoints.push(new spawnPoint(18,73));
spawnPoints.push(new spawnPoint(30,76));
spawnPoints.push(new spawnPoint(37,41));

spawnPoints.push(new spawnPoint(42,26));
spawnPoints.push(new spawnPoint(77,36));
spawnPoints.push(new spawnPoint(52,29));
spawnPoints.push(new spawnPoint(70,6));
spawnPoints.push(new spawnPoint(49,7));
spawnPoints.push(new spawnPoint(61,7));
spawnPoints.push(new spawnPoint(64,10));
spawnPoints.push(new spawnPoint(77,25));
spawnPoints.push(new spawnPoint(67,34));
spawnPoints.push(new spawnPoint(46,30));
spawnPoints.push(new spawnPoint(70,30));
spawnPoints.push(new spawnPoint(74,16));

spawnPoints.push(new spawnPoint(62,70));
spawnPoints.push(new spawnPoint(73,61));
spawnPoints.push(new spawnPoint(50,64));
spawnPoints.push(new spawnPoint(54,45));
spawnPoints.push(new spawnPoint(49,64));
spawnPoints.push(new spawnPoint(73,66));
spawnPoints.push(new spawnPoint(46,73));
spawnPoints.push(new spawnPoint(68,63));
spawnPoints.push(new spawnPoint(77,66));
spawnPoints.push(new spawnPoint(55,72));
spawnPoints.push(new spawnPoint(48,72));
spawnPoints.push(new spawnPoint(48,65));
spawnPoints.push(new spawnPoint(58,61));
spawnPoints.push(new spawnPoint(68,61));

spawnPoints.push(new spawnPoint(86, 8));
spawnPoints.push(new spawnPoint(96, 10));
spawnPoints.push(new spawnPoint(116, 7));
spawnPoints.push(new spawnPoint(83,17));
spawnPoints.push(new spawnPoint(102, 21));
spawnPoints.push(new spawnPoint(114, 26));
spawnPoints.push(new spawnPoint(117, 31));
spawnPoints.push(new spawnPoint(95, 35));
spawnPoints.push(new spawnPoint(84,40));
spawnPoints.push(new spawnPoint(86,62));
spawnPoints.push(new spawnPoint(115, 48));
spawnPoints.push(new spawnPoint(98,58));
spawnPoints.push(new spawnPoint(11,44));
spawnPoints.push(new spawnPoint(114,72));
spawnPoints.push(new spawnPoint(88,75));
spawnPoints.push(new spawnPoint(107,48));
spawnPoints.push(new spawnPoint(90,49));
spawnPoints.push(new spawnPoint(83,52));
spawnPoints.push(new spawnPoint(116,65));

var spawnItem = function() {
    var itemId = Math.floor(Math.random()*16);
    var spawnPoint = getAvailableSpawn();
    var syncId = ++lastId;
    items[syncId] = { x: spawnPoint.x, y:spawnPoint.y, itemId: itemId, spawn: spawnPoint};
    spawnPoint.available = false;
    io.sockets.emit('addItem', syncId, itemId, spawnPoint.x, spawnPoint.y);
}

for (i = 0; i < 20; i++) { 
    spawnItem();
}



var syncItems = function(socket) {
    for( item in items ) {
        socket.emit('addItem', item, items[item].itemId, items[item].x, items[item].y);
    }
}

var enterMap = function(socket, mapId, x, y) {
    socket.leave(socket.mapId);
    socket.mapId = mapId;
    socket.x = x;
    socket.y = y;
    socket.join(socket.mapId);
};

var addPlayer = function(socket) {
    socket.playerId = ++lastId;
    socket.mapId = 6;
    socket.x = 200;
    socket.y = 400;
    socket.inventory = [];
    socket.emit('connected', socket.playerId, socket.mapId, socket.x, socket.y);
    syncItems(socket);
};


// new client connection
io.sockets.on('connection', function (socket) {
    addPlayer(socket);
    console.log('player ' + socket.playerId + ' connected');

    //TODO: remove and replace in main loop
    socket.on('updatePlayer', function (x, y, h) {
        socket.x = x;
        socket.y = y;
        socket.h = h;
        socket.broadcast.emit('updatePlayer', socket.playerId, x, y, h);
    });

    socket.on('itemPickup', function (item, player) {   
        spawnItem();
        items[item].spawn.available = true;
        delete items[item];
        socket.broadcast.emit('removeItem', item);
    });

    //Client request to change map
    socket.on('entermap', function (mapId,x,y) {
        enterMap(socket, mapId, x, y);
    });

    //Client request to change map
    socket.on('hit', function (player, damage) {
        socket.broadcast.emit('hit', player, damage);
    });

    socket.on('blood', function (x, y) {
        socket.broadcast.emit('blood', x, y);
    });

    socket.on('disconnect', function () {
        socket.broadcast.emit('removePlayer', socket.playerId);
    });

});
var port = process.env.PORT || 8080;
server.listen(port);