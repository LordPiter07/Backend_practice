import mongoose from "mongoose";

export class ManagerMongoDB {

    #url
    constructor(url, coleccion, esquema) {
        this.#url = url;
        this.coleccion = coleccion;
        this.esquema = new mongoose.Schema(esquema);
        this.modelo = mongoose.model(this.coleccion, this.esquema);
    }

    async #setConexion() {
        try{
            await mongoose.connect(this.#url);
        } catch(error) {
            return error;
        }
    }

    async getElements(){
        this.#setConexion()
        try{
            const elementos = await this.modelo.find();
            return elementos;

        } catch(error) {
            console.log('Error en consulta de todos los elementos en Mongo DB', error);
        }
    }

    async getElementByID(id){
        this.#setConexion()
        try{
            const elementos = await this.modelo.findById(id);
            return elementos;

        } catch(error) {
            console.log('Error en consulta de elemento en Mongo DB', error);
        }
    }

    async addElement(elemento){ //agrega uno o varios elementos
        this.#setConnection();
        try{
            const mensaje = await this.modelo.insertMany(elemento) //la funcion 'insertMany' inserta un ARRAY a diferencia de 'insertOne'
            return mensaje;

        } catch(error) {
            console.log('Error en Agregar elemento en Mongo DB', error);
        }
    }

    async updateElement(id, info){
        this.#setConexion()
        try{
            const mensaje = await this.modelo.findByIdAndUpdate(id, info);
            return mensaje;

        } catch(error) {
            console.log('Error en Actualizar de elemento en Mongo DB', error);
        }
    }

    async deleteElement(id){
        this.#setConexion()
        try{
            const respuesta = await this.modelo.findByIdAndRemove(id);
            return respuesta;

        } catch(error) {
            console.log('Error en Eliminar de elemento en Mongo DB', error);
        }
    }
    
}