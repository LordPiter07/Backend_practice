import mongoose from "mongoose";
import { ManagerMongoDB } from "../../../db/mongoDBManager.js";

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            id_prod: {
                type: mongoose.type.objectId,
                ref: "Products"
            },
            cant: Number
        }],
        default: []
    }
});

export class ManagerCartMongoDB extends ManagerMongoDB {

    constructor() {
        super(process.env.MONGODBURL, "cart", cartSchema)
    }

    //Agregar producto al carrito
    async addProductCart(id, idProd, cant) {
        super.setConnection()
        let carrito = await this.model.findById(id)
        let prodId = new mongoose.Types.ObjectId(idProd)
        carrito.products.push({ prodId, cant })
        const respuesta = await this.model.findByIdAndUpdate(id, carrito)
        return respuesta
    }

    //Consultar los elementos del carrito
    async getProductsCart() {
        super.setConnection()
        const prods = await this.model.find().populate({
            path: "products.id_prod"
        })
        return prods
    }

    //Borrar un elemento del carrito
    async deleteProductCart(id) {
        super.setConnection()
        const respuesta = await this.model.products.findByIdAndDelete(id)
        return respuesta
    }

    //Actualizar un elemento del carrito
    async updateProductCart(id, cart) {
        super.setConnection()
        return await this.model.findByIdAndUpdate(id, cart);
    }

}