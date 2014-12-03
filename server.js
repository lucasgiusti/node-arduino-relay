var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var rest = require('restler');

var statusRele = 0;
var arduinoIp = 'http://192.168.0.177';

app.get('/', function (req, res) {
    res.sendfile('index.html');
});


app.get('/rele/:id', function (req, res) {
    var id = req.params.id;
	if(id == 'btnOn')
	{
		//rest.get(arduinoIp + "?releOn").on('complete', function (data) {
        		statusRele = 1;
			io.sockets.emit('statusRele', statusRele);
		//});
	}
	else if(id == 'btnOff')
	{
		//rest.get(arduinoIp + "?releOff").on('complete', function (data) {
        		statusRele = 0;
			io.sockets.emit('statusRele', statusRele);
		//});
	}
	res.send();
	
});




io.on('connection', function (socket) {
    io.emit('statusRele', statusRele);
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
