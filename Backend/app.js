import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import authRouter from "./Routes/auth.js";
import farmRouter from "./Routes/farm.js";
import fieldRouter from "./Routes/field.js";
import cropRouter from "./Routes/crop.js";
import adminRouter from "./Routes/admin.js";



const app = express();
const port = env.procces.PORT || 3000;


app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.use("/",
    authRouter,
    farmRouter,
    fieldRouter,
    cropRouter,
    adminRouter
   );


 console.log("Starting server on port:", port);
app.listen(port, "0.0.0.0", () => {
    console.log(`app listening on port http://localhost:${port}`)
})