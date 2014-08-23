var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)

io.set('log level', 1);

app.use(express.static(__dirname + '/public'));

var lastId = 0;
var maps = {};



var addMap = function() {
    var map = {};
    maps['test'] = 'test';
    console.log(maps.test);

};

var addToMap = function(entity, mapId) {
    if( !(mapId in maps)) {
        this.maps.mapId = [];
    } else {
        this.maps.mapId.push(entity);
    }
};

var enterMap = function(socket) {
    socket.join(socket.mapId);
    socket.emit('entermap', socket.mapId);
};

var addPlayer = function(socket) {
    socket.playerId = ++lastId;
    socket.mapId = 1;
    socket.x = 100;
    socket.y = 100;
    socket.inventory = [];
    enterMap(socket);
    socket.emit('connected', socket.playerId, socket.x, socket.y);
};

// new client connection
io.sockets.on('connection', function (socket) {
    addPlayer(socket);
    //changeMap(client);
    //socket.emit('update', 'player', x, y)

    console.log('player ' + socket.playerId + ' connected');

    socket.on('message', function (message) {
        console.log(message);
    });

    socket.on('updatePosition', function (x, y) {
        socket.x = x;
        socket.y = y;
        socket.broadcast.emit('updatePlayer', socket.playerId, x, y);
    });

});

server.listen(8080);