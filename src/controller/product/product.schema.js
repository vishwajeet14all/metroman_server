import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    _id:Number,
    name:String,
    description:String,
    price:Number,
    category:String,
    video:String,
    image:String
})

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
