import 'dotenv/config'
import mongoose from 'mongoose';
import express from "express";
import { envSanitisedSchema } from './lib/validation';


const app = express();


app.get("/", (req, res) => {
    res.send("Hello World!!!!");
});

mongoose.connect(envSanitisedSchema.MONGO_DB_CONNECTION_STRING)
    .then(() => {
        console.log("Connected to MongoDB Successfully!")
        app.listen(envSanitisedSchema.PORT, () => {
            console.log("Server successfully started on port:" + envSanitisedSchema.PORT);
        })
    }
    )

