export default class ProductController {
    getAllProducts(req, res) {
        const products = ProductModel.getAll();
        res.status(200).send(products);
      }
}