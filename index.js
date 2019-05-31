const path = require('path'); // PARA TRABAJAR CON LAS RUTAS
const express = require('express'); // OBTENEMOS EXPRESS
const app = express(); // EJECUTAMOS EXPRESS

const socketIO = require('socket.io'); // OBTENEMOS SOCKET

// STATIC FILES 
app.use(express.static(path.join(__dirname, 'public')));

// SETTINGS
app.set('port', process.env.PORT || 3000) // CONFIGURAMOS PUERTO, TOMA EL CONFIGURADO O 3000

// START SERVER
server = app.listen(app.get('port'), () => {
    console.log('Server On Port', app.get('port'));
})

const io = socketIO(server); // SOCKETIO NECESITA UN SERVIDOR (APP)

// WEBSOCKETS
// connection: Evento que permite ejecutar la función interna.
// socket: Socket del cliente.
io.on('connection', (socket) => {
    console.log('new connection', socket.id);
    
    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
        console.log(data);
    });
});// CUANDO CONECTA CLIENTE => PRIMIMOS EN CONSOLA