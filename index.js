console.log('starting chat server...');

const http = require('http');

const hostname = '10.0.0.101';
const port = '8000';

 console.log('creating server...')
const server = http.createServer().listen(port, hostname);

console.log('chat server running on '+ hostname + ':' + port);



var socketList = require('socket.io').listen(server);

// detect every new socket connection
socketList.sockets.on('connection', function(socket){
	console.log('new connection received');

	// detect disconnect of this socket
	socket.on('disconnect', function(){
		console.log('disconnected socket');
	});


	socket.on('join_room', function(data){
		socket.join(data.chatroom);


		socketList.in(data.chatroom).emit('user_joined', {
			user_email: data.user_email,
			chatroom: data.chatroom
		});

	});


	socket.on('send_message', function(data){
		console.log(data.message, data.user_email);

		socketList.in(data.chatroom).emit('receive_message', {
			message: data.message,
			user_email: data.user_email
		});
	});








});























