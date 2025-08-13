import dotenv from 'dotenv'
dotenv.config();
import {v2 as cloudinary} from 'cloudinary'


import {CloudinaryStorage} from 'multer-storage-cloudinary';
import multer from 'multer';


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

console.log(
       process.env.CLOUDINARY_CLOUD_NAME,
     process.env.CLOUDINARY_API_KEY,
    process.env.CLOUDINARY_API_SECRET,
);



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder:'food-images',
        allowed_formats:['png','jpg','jpeg']
    }
})

const upload = multer({storage});

export {cloudinary,upload};