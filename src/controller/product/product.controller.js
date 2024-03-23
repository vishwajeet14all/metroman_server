import ProductModel from "./product.schema.js";
import ProductRepository from "./product.repository.js";
export default class ProductController {

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (error) {
      console.log("Error while fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  
}
