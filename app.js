import express from 'express';
import allRoutes from './routes/allRoutes.js';
import cors from 'cors'
import upload from 'express-fileupload'
import path from 'path';





const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.resolve()+"/assets"));
app.use(cors());
app.use(upload());
/* this code for deployment ---- start -----*/
const root = path.join(path.resolve(), "dist");
app.use(express.static(root));
/* this code for deployment ---- end -----*/
// app.get("/demo", (req, res)=>{
//     console.log("req.body-----",req.body)
//     console.log("req.params-----",req.params)
//     console.log("req.file-----",req.files)
//     console.log("req.cookie-----",req.cookies)
//     console.log("req.headers-----",req.headers)
// })

app.use(allRoutes);

/* this code for deployment ---- start -----*/
app.get("*", (req, res)=>{
    res.sendFile("index.html", {root});
})
/* this code for deployment ---- end -----*/


const port = process.env.PORT;
app.listen(port, ()=>{
    console.log("Server Running with port ", port);
})