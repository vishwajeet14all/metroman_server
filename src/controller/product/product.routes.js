import express from "express";
import ProductController from "./product.controller.js";

const productController = new ProductController();

const productRouter = express.Router();

productRouter.get("/", productController.getAllProducts);

export default productRouter;
