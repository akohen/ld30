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
items[++lastId] = { x: 300, y:500, itemId: 1, frame: 1};
items[++lastId] = { x: 300, y:600, itemId: 1, frame: 4};
items[++lastId] = { x: 300, y:700, itemId: 1, frame: 12};

var syncItems = function(socket) {
    for( item in items ) {
        socket.emit('addItem', item, items[item].itemId, items[item].frame, items[item].x, items[item].y);
    }
}

var enterMap = function(socket, mapId, x, y) {
    /*if( !maps[mapId] ) {
        maps[mapId] = {};
        maps[mapId].players = [];
    }
    maps[mapId].players.push(socket);*/
    socket.leave(socket.mapId);
    socket.mapId = mapId;
    socket.x = x;
    socket.y = y;
    socket.join(socket.mapId);
};

var addPlayer = function(socket) {
    socket.playerId = ++lastId;
    socket.mapId = 1;
    socket.x = 100;
    socket.y = 100;
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
        //socket.to(socket.mapId).broadcast.emit('updatePlayer', socket.playerId, x, y);

    });

    socket.on('itemPickup', function (item, player) {
        delete items[item];
        socket.broadcast.emit('removeItem', item);
        //socket.to(socket.mapId).broadcast.emit('updatePlayer', socket.playerId, x, y);
    });

    //Client request to change map
    socket.on('entermap', function (mapId,x,y) {
        enterMap(socket, mapId, x, y);
    });

    //Client request to change map
    socket.on('hit', function (player, damage) {
        console.log("hit: " + player);
        socket.broadcast.emit('hit', player, damage);
    });

    socket.on('disconnect', function () {
        socket.broadcast.emit('removePlayer', socket.playerId);
    });

});
var port = process.env.PORT || 8080;
server.listen(port);