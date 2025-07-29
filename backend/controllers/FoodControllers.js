import foodModel from "../models/foodModel.js";
import fs from 'fs';

//add food item

const addFood= async(req,res)=>{
    console.log("Received Data:", req.body);  
    console.log("Uploaded File:", req.file);  
    
    if (!req.file) {
        return res.json({ success: false, message: "Image file is required!" });
    }
 let image_filename= `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:Number(req.body.price),
        category:req.body.category,
        image:image_filename
})
try{
    await food.save();
    res.json({success:true,message:"food added",data:food})
}catch(error){
    console.log(error)
    res.json({success:false,message:"error"})
}

}
//all food list

const listFood=async (req,res)=>{
    try{
        const food=await foodModel.find({});
        res.json({success:true,data:food})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"error"})
    }

}

//remove food item

const removeFood= async (req,res)=>{
    try{
        const food =await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
         
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"food removed"})
    }catch (error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }

    

}

export {addFood,listFood,removeFood};