import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/UserRoute.js";
import cartRouter from "./routes/CartRoute.js";
import orderRouter from "./routes/OrderRoute.js";
import http from 'http';
import {Server} from 'socket.io'
import dot from 'dotenv'
dot.config();
import axios from 'axios';
import { MenuModel } from "./models/MenuModel.js";












const app=express();


//middleware

app.use(express.json());
app.use(cors({origin:['https://vercel.com/madhanrajs-projects-cb58f251/mern-project-admin',
  'https://mern-project-sigma-jet.vercel.app/'],
   methods: ["GET", "POST"],
  credentials: true
}));


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


const server = http.createServer(app);

const io = new Server(server,{
    cors:{origin:"*"}
})

io.on("connection",(socket)=>{
    console.log("new client connected",socket.id);
    socket.on("joinRoom",(orderId)=>{
        socket.join(orderId);
        console.log(`${socket.id} joined room ${orderId}`);
        

      /*   let lat=12.9716;
        let lng = 77.5946;

        const interval = setInterval(()=>{
            lat += 0.0001;
            lng += 0.0001;
            io.to(orderId).emit('location',{lat,lng})
        },5000)

        socket.on("disconnect",()=>{
            clearInterval(interval);
            console.log(socket.id);
        }) */
        
    })
      socket.on("deliverylocation", async ({ orderId, location,name,customerLocation}) => { //location changed here as interval
 
        const {lat,lng} = location;
        const { lat:clat,lng:clng } = customerLocation;

        try{
            const API_KEY =process.env.API_KEY;

            const url = `https://api.openrouteservice.org/v2/directions/driving-car`;

            const body = {
              coordinates:[ [lat,lng],//delivery person location
              [clat,clng] // customerLocation
            ]  
            }
        
            const response = await axios.post(url,body,
                {
                    headers:{
                        'Authorization':API_KEY,
                        'Content-Type':'application/json'
                    }
                }
            )

              const durationInSeconds = response.data.features[0].properties.summary.duration;
    const eta = Math.round(durationInSeconds / 60);               
        
  io.to(orderId).emit("location", {
    location,
    name:"madhan",
    eta,
    customerLocation,
  });
}catch(error){
console.error(error);
} 
 });
 
   socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

    



const PORT = process.env.PORT || 4000;

server.listen(PORT,()=>{
    console.log(`server stardet on http://localhost:${PORT}`);
});

//mongodb+srv://masa:<db_password>@cluster0.4ckvd.mongodb.net/?