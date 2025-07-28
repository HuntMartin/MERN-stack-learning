import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import projectRoute from './routes/projectsRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to capstone showcases')    
});

//Middleware for handling CORS policy
//Option 1: Allow all origins with default of Cors(*)
app.use(cors());
//Option 2: Allow Custom Origins
/*app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);
*/

app.use('/projects', projectRoute);

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to the Database');
        app.listen(PORT, ()=>{
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });



