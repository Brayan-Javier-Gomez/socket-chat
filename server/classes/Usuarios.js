class Usuarios{

    constructor(){
        this.personas = [];
    }

    agregaPersonas(id,nombre,sala){

        let persona = {id,nombre,sala}

        this.personas.push(persona);

        return this.personas;

    }

    getPersona(id){

        let persona = this.personas.filter(data => data.id === id)[0];

        return persona;
    
    }

    getAllPersonas(){
        return this.personas;
    }
    getPersonasPorSala(sala){

        let personaPorSala = this.personas.filter(data =>{
            return data.sala === sala
        })

        return personaPorSala;
        //sala
    }
    borrarPersona(id){

        let eliminado = this.getPersona(id)
        this.personas = this.personas.filter(data => data.id != id);
        return eliminado;
    }
    

}


module.exports = {Usuarios};