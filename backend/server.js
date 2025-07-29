import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/UserRoute.js";
import dotenv from "dotenv";
import cartRouter from "./routes/CartRoute.js";
import orderRouter from "./routes/OrderRoute.js";





dotenv.config();








const app=express();
const port=4000;

//middleware

app.use(express.json());
app.use(cors());


//db connection
connectDB();

//api endpoints

app.use('/api/food',foodRouter);
app.use("/image",express.static('uploads'));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get('/',(req,res)=>{
    res.send("API WORKING");
});

app.listen(port,()=>{
    console.log(`server stardet on http://localhost:${port}`);
});

//mongodb+srv://masa:<db_password>@cluster0.4ckvd.mongodb.net/?