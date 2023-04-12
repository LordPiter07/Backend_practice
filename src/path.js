import { fileURLToPath } from 'url';
import { dirname } from "path";
import dotenv from 'dotenv';


export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);


dotenv.config({path:`${__dirname}/.env`});

console.log(__filename);
console.log(__dirname);
