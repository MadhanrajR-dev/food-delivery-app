import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  image: String,
  category: String,
});

const orderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:[itemSchema],required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Food processing"},
    date:{type:Date,default:Date.now},
    payment:{type:Boolean,default:false},
    razorpay_order_id:{type:String},
    paymentId:{type:String}
})


const OrderModel= mongoose.models.order || mongoose.model("order",orderSchema);

export default OrderModel;