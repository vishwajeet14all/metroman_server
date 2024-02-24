import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    description:String,
    video:String,
    image:String
})




