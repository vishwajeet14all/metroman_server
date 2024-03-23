import ProductModel from "./product.schema.js";

export default class ProductRepository {
  
  //*------------------
  //getting all product
  //*------------------
  async getAll() {
    try {
      return await ProductModel.find();
    } catch (error) {
      console.log("Error in userRepository login", error);
    }
  }
}
