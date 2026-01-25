import foodModel from "../models/foodModel.js";
import fs from "fs";
import { MenuModel } from "../models/MenuModel.js";

//add food item

const addFood = async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    console.log("Uploaded File:", req.file);
    if (!req.file) {
      return res.json({ success: false, message: "Image file is required!" });
    }
    
    let image_filename = req.file.path.replace(/\\/g, "/");
    console.log("gettin image info",image_filename);
    // directly from cloudinry path;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "food added", data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//all food list

const listFood = async (req, res) => {
  console.log(req.body);

  try {
    const food = await foodModel.find({});

    res.json({ success: true, data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

//remove food item

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "food removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeMenu = async (req,res)=>{
  try{
    const menu = await MenuModel.findById(req.body.id);
    fs.unlink(`uploads/${menu.image}`,()=>{});

    await MenuModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"food deleted successFully"})

  }catch(error){
    console.log(error);
    res.json({success:false,message:'error'})
    
  }
}

const menuList = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  if (!req.file) {
    res.status(203).json({ success: false, message: "file is required" });
  }
  const file_name = req.file.path.replace(/\\/g, "/");
  const menu = new MenuModel({
    name: req.body.name,
    image: file_name,
    // directly from cloudinary
  });
  try {
    await menu.save();
     res.json({
      success: true,
      data: menu,
    });
  } catch (error) {
    res.json({ success: false, message: "menu failde to added" });
  }
};

const getMenuList = async (req, res) => {
  console.log(req.body);
  
    try{
    const data = await MenuModel.find({});
  res.json({ success: true, message: "menu added success fully",data:data });
}catch(error){
    console.log("file to get menu",error);
    
   res.json({success:false,message:"not menu added"})
    }
}


export { addFood, listFood, removeFood, menuList, getMenuList,removeMenu };
