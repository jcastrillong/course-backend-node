const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class ProductsService {
  constructor() {}

  // crear un producto
  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    const products = await models.Product.findAll({
      include: ["category"],
    });
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound("Product not found");
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const productUpdated = await product.update(changes);
    return productUpdated;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy(id);
    return { id };
  }
}

module.exports = ProductsService;
