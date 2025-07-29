import orderModel from "../models/OrderModel.js";
import userModel from "../models/userModel.js";
import Razor from 'razorpay';
import dot from 'dotenv';

dot.config();



const razor = new Razor({
  key_id: process.env.RAZOR_ID,
  key_secret: process.env.RAZOR_SECRET_KEY
});

//placing user order for fronend

const placeOrder=async (req,res )=>{
  const frontend = 'http://localhost:5174';

    try{
 

      const paise = req.body.amount * 100
      const data = new Date()
      const readable = data.toISOString().slice(0,10);
      const receipt = "receipt" + readable;
      
      const options = {
        amount: paise,
        currency: "INR",
        receipt:receipt,
        payment_capture:1,
      };
      console.log(options);
      const razorPay = await razor.orders.create(options);
      console.log("Received Order Request:", req.body);

      const newOrder=new orderModel({
        userId:req.body.userId,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address,
        payment:true,
        razorpay_order_id:razorPay.id,
        status:req.body.status
      })
      await newOrder.save();
      await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
      


     /* const item = req.body.item;
    

     let total = item.reduce((acc,item)=>{
      return acc+item.price*item.quantity;

     },0)
     

     const deliverCharge = 2*80;
      total +=deliverCharge;
 */
     
     
     
      
     res.json({ success: true, order: razorPay , dbOrderId: newOrder._id});//chnaged razorPay.id

   
    }catch (error){
       console.log(error)
    }

}

const verifyOrder = async (req,res)=>{
  const {success,paymentId,orderId} = req.body;
  try{
      if(success === "true"){
           await orderModel.findOneAndUpdate({razorpay_order_id:orderId}, {
          payment: true,
          razorpay_payment_id: paymentId
        });
           res.json({success:true,message:"paid"})
      }
      else{
        await orderModel.findOneAndDelete({razorpay_order_id:orderId},paymentId);
        res.json({success:false,message:"not paid"})
      }
  }catch(error){
    console.log(error)
    res.json({success:false,message:"error"})
  }

}

//user orders for frontend

const userOrders = async (req,res)=>{

  try{
    const orders = await orderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})
  }catch(error){
      console.log(error);
      res.json({sucess:false,message:"error"})
  }

}
 
//lisitin orders fro admin panel

const listOrders = async (req,res)=>{
    try{
     const orders = await orderModel.find({})
     res.json({success:true,data:orders})
    }catch(error){
         console.log(error);
         res.json({success:false,message:"error"})
    }
}
//api for updating order status

const updateStatus = async (req,res)=>{
  try{
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"status update"})
  }catch(error){
    console.log(error);
    res.json({success:false,message:"update failed"})
  }

}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}