import { Router } from "express";
import { productController } from "../controllers/product.controller.js";

const routerProducts = Router();

//Routes

//Lista de productos
routerProducts.get("/", productController.getAllProducts);   

//Productos filtrados por ID
routerProducts.get('/:pid', productController.getProductById);

//Agregar un nuevo producto a la lista (RAIZ POST)
routerProducts.post('/', productController.addProduct);

//Borrar un producto de la lista
routerProducts.delete('/:pid', productController.deleteProduct);

//actualizar un producto de la lista
routerProducts.put('/:pid', productController.updateProduct);


export default routerProducts;