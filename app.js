var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)

io.set('log level', 1);

app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function (socket) {
    socket.on('connect', function(data) {
        console.log("Nouvelle connection de : "+ JSON.stringify(data));
        //pseudo = ent.encode(pseudo);
        socket.broadcast.emit('new_connection', data);
    });

    socket.on('message', function (message) {
        console.log(message);
    });
});

server.listen(8080);
