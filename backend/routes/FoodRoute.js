import express from "express";
import {addFood,listFood,removeFood,menuList, getMenuList, removeMenu} from "../controllers/FoodControllers.js";
import multer from "multer";
import cloudinary from "../config/clodinary.js";

const foodRouter = express.Router();

//image storage ingine

 const storage=multer.diskStorage({
    destination: "uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`);
    }
})

export  const clodinary_upload = async (file)=>{
    return new Promise((resolve,reject)=>{
       const stream =  cloudinary.uploader.upload_stream(
        {folder:"foodimage"},
        (error,result)=>{
            if(error){
                return reject(error)
            }else{
                return resolve(result)
            }

        }
       )
       stream.end(file.buffer)
    })

}

const upload=multer({storage:storage}); 
console.log(upload);


foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.post('/menulist',upload.single('image'),menuList);
foodRouter.get('/all',getMenuList);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);
foodRouter.post('/removeMenu',removeMenu);













export default foodRouter;