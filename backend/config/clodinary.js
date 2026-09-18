import {v2 as cloudinary} from "cloudinary"


cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   cloud_api_key:process.env.CLODINARY_API,
   cloud_secret_key:process.env.CLODINARY_SECRET
})

export default cloudinary ;