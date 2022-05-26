const { io } = require('../server');
const {Usuarios} = require('../classes/Usuarios');
const {crearMensaje} = require("../Utils/utils");
const usuarios = new Usuarios();


io.on('connection', (client) => {

    
    client.on("entrarChat", (usuario, callback) => {

    if(!usuario.nombre || !usuario.sala){
        return callback({
            ok:false,
            message: "el nomnre es obligatorio"
        })
    }
        // console.log(usuario);


        //para unir un usuario a una sala
    client.join(usuario.sala)



    // let personas = usuarios.agregarPersona(client.id, usuario.nombre)
    usuarios.agregaPersonas(client.id, usuario.nombre, usuario.sala)

    client.broadcast.to(usuario.sala).emit('listaPersonas' , usuarios.getPersonasPorSala(usuario.sala));


    callback(usuarios.getPersonasPorSala(usuario.sala));
    
    } )

    client.on('crearMensaje' , (data)=>{

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)

    })

    client.on("disconnect", () =>{

        let personaBorradda = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorradda.sala).emit('crearMensaje' , crearMensaje("El admin" , `${personaBorradda.nombre} Ha abandonado el chat `))
        client.broadcast.to(personaBorradda.sala).emit('listaPersonas' , usuarios.getPersonasPorSala(personaBorradda.sala));

    
    })

//mensajes privados

    client.on('mensajePrivado' , data =>{
        let persona = usuarios.getPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado' , crearMensaje(persona.nombre , data.mensaje))
    })




}




);







// console.log('Usuario conectado');

// client.emit('enviarMensaje', {
//     usuario: 'Administrador',
//     mensaje: 'Bienvenido a esta aplicación'
// });



// client.on('disconnect', () => {
//     console.log('Usuario desconectado');
// });

// // Escuchar el cliente
// client.on('enviarMensaje', (data, callback) => {

//     console.log(data);

//     client.broadcast.emit('enviarMensaje', data);


//     // if (mensaje.usuario) {
//     //     callback({
//     //         resp: 'TODO SALIO BIEN!'
//     //     });

//     // } else {
//     //     callback({
//     //         resp: 'TODO SALIO MAL!!!!!!!!'
//     //     });
//     // }



// });