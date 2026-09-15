import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import authRouter from "./Routes/auth.js";



const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/",
    authRouter
);


 
app.listen(port, "0.0.0.0", () => {
    console.log(`app listening on port http://localhost:${port}`)
})