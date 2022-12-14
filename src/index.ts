import express, { query, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import {Database} from './db/database' ;
import * as bodyParser from 'body-parser';
import { Match } from './types/match';
import cors from 'cors';
const app = express();
dotenv.config();
const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));
app.use(bodyParser.json())
app.use(cors())
const database = new Database();
app.get("/all",async (req:Request,res:Response)=>{
    const data = await database.getAll();
    //await delay(5000)
    res.status(200).json(data)
})
app.get("/:id",async (req:Request,res:Response)=>{
    const data = await database.getById(Number(req.params.id));
    res.status(200).json(data)
})
app.post("/add",async (req:Request,res:Response)=>{
    const match:Match = req.body.match
    const data = await database.insertQuery(match);
    if (data == true){
        res.status(200).json({"status":"success"})
    }
})
app.put("/update/:id",async (req:Request,res:Response)=>{
    const hometeam:string = req.body.hometeam;
    const id:number = Number(req.params.id);
    const data = await database.updateQuery(hometeam,id);
    if (data == true){
        res.status(200).json({"status":"success"})
    }
})
app.delete(`/delete/:id`,async (req:Request,res:Response)=>{
    const data = await database.deleteQuery(Number(req.params.id));
    if (data == true){
        res.status(200).json({"status":"success"})
    }
})

app.listen(process.env.PORT || 5000,()=> console.log(`App listening on port ${process.env.PORT}`))