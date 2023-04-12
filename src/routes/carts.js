import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";

const routerCarts = Router();

//routes

//Lista de carritos
routerCarts.get('/', cartController.getCarts);

//Listar productos del carrito con el parametro ID carrito.
routerCarts.get('/:cid', cartController.getCartById);

//Crea un nuevo objeto carrito (RAIZ POST/)
routerCarts.post('/', cartController.addCart);

//Agregar producto a un carrito
routerCarts.post('/:cid/product/:pid',cartController.addProductToCart);

//Borrar un producto de un carrito determinado
routerCarts.delete('/:cid/product/:pid', cartController.deleteProductFromCart);

//Borrar un carrito
routerCarts.delete('/:cid', cartController.deleteCart);

routerCarts.put('/:cid/product/:pid', cartController.updateProductQuantity);

routerCarts.put('/:cid', cartController.updateCartProducts);



export default routerCarts;