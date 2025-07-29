import express from "express";
import authMiddleware from "../mideleware/auth.js"
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/OrderContoller.js";


const orderRouter=express.Router();


orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post('/userOrder',authMiddleware,userOrders)
orderRouter.get('/listOrder',listOrders);
orderRouter.post('/status',updateStatus)



export default orderRouter;