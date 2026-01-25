import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/UserRoute.js";
import cartRouter from "./routes/CartRoute.js";
import orderRouter from "./routes/OrderRoute.js";
import axios from "axios";
import http from "http";
import { Server } from "socket.io";
import dot from "dotenv";
dot.config();

const app = express();

//middleware

app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"] }));


//db connection
connectDB();

//api endpoints

app.use("/api/food", foodRouter);
app.use("/api/menu", foodRouter);
app.use("/image/uploads", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.use((err,req,res,next)=>{
  console.log("error",err.message);
  res.json({success:false,message:err.message})
  
})
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("new client connected", socket.id);
  socket.on("joinRoom", (orderId) => {
    socket.join(orderId);
    console.log(`${socket.id} joined room ${orderId}`);
  });
  socket.on(
    "deliverylocation",
    async ({ orderId, location, name, customerLocation }) => {
      //location changed here as interval

      const { lng, lat } = location;
      const { lng: clng, lat: clat } = customerLocation;

      try {
        const API_KEY =
          "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImY2YzVhNmM5Yjk1MzRiMDc5MzExZGQ3Y2QwYmIzMGExIiwiaCI6Im11cm11cjY0In0=";
        const url = `https://api.openrouteservice.org/v2/directions/driving-car`;
        const body = {
          coordinates: [
            [lng, lat], //delivery person location
            [clng, clat], // customerLocation
          ],
        };
        const response = await axios.post(url, body, {
          headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json",
          },
        });
        const data = await response.data;

        const durationInSeconds = data.routes[0].summary.duration;
        const eta = Math.round(durationInSeconds / 60);
        let etaText;
        if (eta < 60) {
          etaText = `${eta} : mins`;
        } else {
          const hour = Math.floor(eta / 60);
          const mins = eta % 60;
          if (mins === 0) {
            etaText = `${hour} hr`;
          } else {
            etaText = `${hour}hr${mins}min`;
          }
        }

        io.to(orderId).emit("location", {
          location,
          name,
          eta,
          etaText,
          customerLocation,
        });
      } catch (error) {
        console.error(error);
      }
    }
  );

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`server stardet on http://localhost:${PORT}`);
});

//mongodb+srv://masa:<db_password>@cluster0.4ckvd.mongodb.net/?
