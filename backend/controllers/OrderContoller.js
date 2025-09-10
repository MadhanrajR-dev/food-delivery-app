import dot from 'dotenv';
dot.config();
import orderModel from "../models/OrderModel.js";
import userModel from "../models/userModel.js";
import mongoose from 'mongoose';
import twilio from 'twilio'
import Razor from 'razorpay';
import handleNotification from "../firebaseAdmin.js";





const razor = new Razor({
  key_id: process.env.RAZOR_ID,
  key_secret: process.env.RAZOR_SECRET_KEY
});


/* const  account_sid=process.env.ACCOUNT_SID
const  auth_token=process.env.AUTH_TOKEN */


//placing user order for frontend

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
      console.log("fire base token",req.body.tokenfcm);
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
        status:req.body.status,
      })
      await newOrder.save();
    const updatedUser =  await userModel.findByIdAndUpdate(req.body.userId,{
        $set:{
      cartData:{},
      tokenfcm:req.body.tokenfcm,
      }
    },
    { new: true },
    );
      
      if (req.body.tokenfcm) {
      await handleNotification(
        "Order Placed Successfully 🎉",
        `Your order is confirmed!`,
        req.body.tokenfcm
      );
    }
     
      
     res.json({ success: true, order: razorPay , dbOrderId: newOrder._id,user:updatedUser});//chnaged razorPay.id

   
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
    const orders = await orderModel.find({userId:req.body.userId})//
    res.json({success:true,data:orders});
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

const userComments = async (req,res)=>{
  try{
       const {comment} = req.body;
       const {userId} = req.body;
       const data = await orderModel.findOneAndUpdate(
       {userId:userId},
        {
          $push:{
            rating:{comment,userId}
          } //comments ,
      },
     {new:true});
      console.log("comment",data);
      const someOne = await orderModel.findOne({userId:new mongoose.Types.ObjectId(userId)});
      if(!someOne){
      console.log("The user One Who comment",someOne);
      }
      if(!data){
        return res.json({success:false, message:"comments is not found"})
      }
  res.json({success:true,message:"comment succefully",data:data})
  }catch(error){
    console.log(error);
    res.json({success:false,message:"failed to uplaod comment"})
    
  }
}

const deleteComment = async (req,res)=>{
  try{
      const {userId,comment} = req.body;
  const someOne = await orderModel.findOneAndUpdate(
    {userId:userId},
    {
      $push:{
        rating:{
          comment:comment
        }
      }
    },
    {new:true})
  console.log(someOne);
  res.json({success:true,message:"comment delete succefully",data:someOne})
  }catch(error){
console.log(error);
res.json({success:false,message:"comment failed to delte"})
  }
}

const sendSms = async (req,res)=>{
  try{
    const {phone,name,orderId} = req.body;
    const client =  twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);
  const sms =  await client.messages.create({
     body:`Hi${name} order for ${orderId}`,
     from:process.env.TWILIO_PHONE_NUMBER,//twilio phone number,
     to:`+91${phone}`
    })
    console.log("send sms",sms);
    
    res.json({success:true,message:"message send successfully"})
    
  }catch(error){
    console.log(error);
    res.json({success:false,message:"fail to send sms"})
  }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus,userComments,deleteComment,sendSms}