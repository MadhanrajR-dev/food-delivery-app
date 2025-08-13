import mongoose, { Schema } from 'mongoose'

const menuShema = new Schema({
    menu_name: String,
    menu_image: String
})


export const MenuModel = mongoose.model("menu",menuShema)