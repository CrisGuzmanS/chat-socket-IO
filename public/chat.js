const  socket = io(); // COMUNICACION CLIENTE A SERVIDOR

// DOM ELEMENTS
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send'); // BOTON PARA ENVIAR MENSAJES
let output = document.getElementById('output'); // MUESTRA LOS MENSAJES
let actions = document.getElementById('actions');

btn.addEventListener('click', function(){
    socket.emit(
        'chat:message',
        {
            username: username.value,
            message: message.value
        }
    ); // ENVIA LOS DATOS AL SERVIDOR
    console.log();
});

message.addEventListener('keypress', function(){
    socket.emit('chat:typing', username.value);
    console.log(username.value);
});

socket.on('chat:message', function(data){
    console.log(data);
    actions.innerHTML = '';
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`;
});

socket.on('chat:typing', (data) => {
    actions.innerHTML = `<p><em>${data} is typing</em></p>`;
    console.log('typing:',data);
});