var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Client = require('node-rest-client').Client;
client = new Client();

var statusRele = 0;



//client.get("http://nodeclinica.azurewebsites.net/patients", function (data, response) {
//    var obj = JSON.parse(data);
//    if (obj.status == '401') {
//        io.emit('statusRele', '0');
//    }
//    else {
//        io.emit('statusRele', '1');
//    }

//});


app.get('/', function (req, res) {
    res.sendfile('index.html');
});

io.on('connection', function (socket) {
    socket.on('btnOn', function () {
        statusRele = 1;
        emitStatus();
    });

    socket.on('btnOff', function () {
        statusRele = 0;
        emitStatus();
    });

    socket.on('reloadStatusRele', function () {
        emitStatus();
    });
});

function emitStatus() {
    io.emit('statusRele', statusRele);
}

http.listen(3000, function(){
  console.log('listening on *:3000');
});
