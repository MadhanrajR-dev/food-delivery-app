import express from "express";
import {addFood,listFood,removeFood,menuList, getMenuList, removeMenu} from "../controllers/FoodControllers.js";
import multer from "multer";

const foodRouter= express.Router();

//image storage ingine

 const storage=multer.diskStorage({
    destination: "uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`);
    }
})

const upload=multer({storage:storage}); 

foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.post('/menulist',upload.single('image'),menuList);
foodRouter.get('/all',getMenuList);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);
foodRouter.post('/removeMenu',removeMenu);













export default foodRouter;