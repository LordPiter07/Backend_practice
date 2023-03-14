import "dotenv/config";
import express from "express";
import { Server, Socket } from "socket.io";
import { getManagerMessage } from "./dao/daoManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const server = app.listen(process.env.PORT || 5000, () => console.log('Server on port'))

const io = new Server(server);

io.on("connection", async (socket) => {
    socket.on("mensaje", async (info) => {
        const data = await getManagerMessage();
        const managerMessage = new data.ManagerMessageMongoDB
        managerMessage.addElements([info].then(() => {
            managerMessage.getElements().then((mensajes) => {
                console.log(mensajes);
                socket.emit("Todos los Mensajes", mensajes);
            })
        }))
    })
})