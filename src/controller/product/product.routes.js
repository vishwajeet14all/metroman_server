import express from "express";
import ProductController from "./product.controller.js";

const productController = new ProductController();

const productRouter = express.Router();

//*------------------
//Get all Products
//*------------------
productRouter.get("/getproducts", (req, res) => {
  productController.getAllProducts(req, res);
});

export default productRouter;
