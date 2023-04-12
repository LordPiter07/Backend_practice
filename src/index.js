import "dotenv/config.js";
import express, { urlencoded } from "express";
import routerProducts from "./routes/products.js";
import routerCarts from "./routes/carts.js";
import routerRealTime from "./routes/realTimeProducts.js";
import { __dirname } from "./path.js";
import { engine } from "express-handlebars";
import * as path from "path";
import { ProductManager } from "./dao/FileSystem/ProductManager.js";
import { Server } from "socket.io";
import { getManagerMessages } from "./dao/daoManager.js";

const app = express();
const productManager = new ProductManager('src/models/productos.json');

//Middlewares
app.use(express.json()); //Mi app va a entender JSON.
app.use(urlencoded({extended: true})); //Esta funcion es la que permite busquedas de URL complejas.
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", path.resolve(__dirname, './views'));
app.set("port", process.env.PORT || 4000);

//Routes
app.use('/', express.static(__dirname + '/public'));
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use('/', routerRealTime);// saque --> realtimeproducts de la url


const server = app.listen(app.get('port'), () =>{
    console.log(`Server On Port ${app.get('port')}`);
})
const io = new Server(server);

io.on("connection", async (socket) => {
    socket.on("message", async(info) => {
        const data = await getManagerMessages();
        const managerMessage = new data.managerMenssageMongoDB;
        managerMessage.addElements([info]).then(() => {
            managerMessage.getElements().then((mensaje) => {
                console.log(mensaje);
                socket.emit("allMessage", mensaje);
            })
        })
    })
})






