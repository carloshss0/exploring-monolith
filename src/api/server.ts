import express from "express";
import dotenv from "dotenv";


dotenv.config();

const port: number = Number(process.env.Port) || 3000;
const app = express();


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});