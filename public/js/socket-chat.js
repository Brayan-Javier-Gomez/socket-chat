var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')){
    window.location = "index.html";
    throw new Error("El nombre y sala son obligatorios");
}

var usuario = {
    nombre: params.get("nombre"),
    sala : params.get('sala')
}




socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit("entrarChat", usuario , function (resp){
        console.log("usuarios conectados" , resp)
    })


});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'El trollface',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});



// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});


//cuando un usuario entra o sale del chat

socket.on('listaPersonas', function(usuarios) {

    console.log('listaPersonas:', usuarios);

});


//mensajes privados

socket.on('mensajePrivado' , function(mensaje){
    console.log("Mensaje Privado: ", mensaje)
})