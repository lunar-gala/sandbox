
/*const port = process.env.PORT || 80;
var server = require('https').Server();
var io = require('socket.io')(server);
var app = require('express')();
*/

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

/*
var http = require('http').createServer(app);
*/

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/update', (req, res) => {
	res.sendFile(__dirname + '/update.html');
});

io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
	socket.on('chat message', (msg) => {
		io.emit('chat message', msg);
	});
	socket.on('change image', (url, size) => {
		io.emit('change image', url, size);
	})
	socket.on('change video', (url) => {
		io.emit('change video', url);
	})
	socket.on('change mode', (mode) => {
		io.emit('change mode', mode);
	})

	socket.on('change vidvis', (visibility) => {
		io.emit('change vidvis', visibility);
	})
});

/*
server.listen(port, 'ec2-54-145-225-18.compute-1.amazonaws.com', () => {
	console.log('listening on *:aws ec2');
});
*/

http.listen(3000, () => {
	console.log('listening on *:3000');
});