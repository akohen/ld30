var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)

io.set('log level', 1);

app.use(express.static(__dirname + '/public'));


var mainLoop = function() {
    if( io.rooms ) {
        for (var room in io.rooms){
            if( room != '' ) {
                //console.log("room: " + room + " clients: " + io.rooms[room]);
                //console.log(maps);
            }
        }
    }
    setTimeout(mainLoop, 1500);
}

//mainLoop();

var lastId = 0;
var maps = {};

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
};


// new client connection
io.sockets.on('connection', function (socket) {
    addPlayer(socket);
    console.log('player ' + socket.playerId + ' connected');

    //TODO: remove and replace in main loop
    socket.on('updatePlayer', function (x, y) {
        socket.x = x;
        socket.y = y;
        socket.broadcast.emit('updatePlayer', socket.playerId, x, y);
        //socket.to(socket.mapId).broadcast.emit('updatePlayer', socket.playerId, x, y);

    });

    //Client request to change map
    socket.on('entermap', function (mapId,x,y) {
        enterMap(socket, mapId, x, y);
    });

    socket.on('disconnect', function () {
        socket.broadcast.emit('removePlayer', socket.playerId);
    });

});
var port = process.env.PORT || 8080;
server.listen(port);