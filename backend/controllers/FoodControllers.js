import foodModel from "../models/foodModel.js";
import fs from 'fs';
import { MenuModel } from "../models/MenuModel.js";

//add food item

const addFood= async(req,res)=>{
    console.log("Received Data:", req.body);  
    console.log("Uploaded File:", req.file);  
    
    if (!req.file.path){
        return res.json({ success: false, message: "Image file is required!" });
    }
 let image_filename= req.file.path;// directly from cloudinry path;

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
    console.log(req.body);
    
    try{
        const food=await foodModel.find({});
        console.log(food);
        
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

 const menuList = async (req,res)=>{
console.log(req.file);

const menu = new MenuModel({
  menu_name:req.body.menu_name,
  menu_item:req.file.path,     // directly from cloudinary
})
console.log("menu",menu);


 await menu.save();
 res.json({success:true,menu})

}

 const getMenuList = async(req,res)=>{
 
  const data = await MenuModel.find({});
  res.json({success:true,message:'menu added success fully',data:data});
}

export {addFood,listFood,removeFood,menuList,getMenuList};