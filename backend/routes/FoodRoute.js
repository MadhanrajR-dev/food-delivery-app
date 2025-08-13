import express from "express";
import {addFood,listFood,removeFood,menuList, getMenuList} from "../controllers/FoodControllers.js";
import multer from "multer";
import { upload } from "../cloudinaryConfig.js";


const foodRouter= express.Router();

//image storage ingine

/* const storage=multer.diskStorage({
    destination: "uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`);
    }
})

const upload=multer({storage:storage}); */
 

foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.post('/menulist',upload.single('menu_item'),menuList);
foodRouter.get('/getMenulist',getMenuList);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);













export default foodRouter;