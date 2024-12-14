import express from "express";
import bodyParser from "body-parser";
import initApiRoutes from './route/api';
import connectDB from './config/connectDB';
import configCors from './config/cors';
require('dotenv').config();


let app = express();
// app.use(cors({ credentials: true, origin: true }));

configCors(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))



initApiRoutes(app);

connectDB();
// app.use((req, res) => {
//     console.log("check new request");
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);

// })
app.use((req, res) => {
    return res.send('404 not found')
})

let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port)
})