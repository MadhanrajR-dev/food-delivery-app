import express from "express";
import authMiddleware from "../mideleware/auth.js"
import { deleteComment, listOrders, placeOrder, sendSms, updateStatus, userComments, userOrders, verifyOrder} from "../controllers/OrderContoller.js";


const orderRouter=express.Router();


orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post('/userOrder',authMiddleware,userOrders)
orderRouter.get('/listOrder',listOrders);
orderRouter.post('/status',updateStatus)
orderRouter.post('/comment',authMiddleware,userComments);
orderRouter.post('/deleteComment',authMiddleware,deleteComment);
orderRouter.post('/sms',sendSms);


export default orderRouter;