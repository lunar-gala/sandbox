const port = process.env.PORT || 80;
var server = require('https').Server();
var io = require('socket.io')(server);
var app = require('express')();

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
		console.log('message: ' + msg);
	});
	socket.on('change image', (url, size) => {
		io.emit('change image', url, size);
		console.log(url);
	})
	socket.on('change video', (url) => {
		io.emit('change video', url);
		console.log(url);
	})
});


server.listen(port, 'ec2-54-145-225-18.compute-1.amazonaws.com', () => {
	console.log('listening on *:aws ec2');
});
