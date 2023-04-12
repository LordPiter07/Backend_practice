import { Schema } from "mongoose";
import { ManagerMongoDB } from "../../../db/mongoDBManager";


const messageSchema = new Schema({
    nombre: String,
    email: {
        type: String,
        unique: true
    },
    message: String
})

export class managerMenssageMongoDB extends ManagerMongoDB {
    
    constructor() {
        super(process.env.MONGODBURL, "Messages", messageSchema);
    }

    //A futuro, aqui ire definiendo los metodos propios de esta clase
}