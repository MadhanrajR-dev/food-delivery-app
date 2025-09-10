import mongoose, { Schema } from 'mongoose'

const menuShema = new Schema({
    image: String,
    name: String
})


export const MenuModel = mongoose.model("menu",menuShema)