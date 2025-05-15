import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import dataconnect from './database/Dataconnection.js';
import adminRouter from './AdminRouter/Router.js';


const app = express();
const port = process.env.PORT || 8000;

// setting midleware

app.use(express.json());
app.use(cors());
dataconnect();

// setting Routers

app.use('/api/admin' , adminRouter)

// setting off req , res 

app.get('/' , (req , res)=> {
    res.send("API Running successfully.");
    res.end();
})
// creating Api for server

app.listen(port , ()=> console.log(`Running Api on localhost :${port}`))
