import mongoose from "mongoose";


const userSchema=new mongoose.Schema({                                                                                                                                                  
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true,lowercase:true,trim:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}},
    tokenfcm:{type:String}
},{minimize:false,timestamps:true})


const userModel=mongoose.models.user || mongoose.model("user",userSchema);


export default userModel;