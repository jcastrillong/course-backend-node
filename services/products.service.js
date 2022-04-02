const faker = require("faker");
const boom = require("@hapi/boom");

const getConnection = require("../libs/postgres");

class ProductsService {
  constructor() {
    this.productsList = [];
    this.generate();
  }

  generate() {
    const limit = 50;
    // generando informacion aleatoria
    for (let index = 0; index < limit; index++) {
      this.productsList.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.random.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = { id: faker.datatype.uuid(), ...data };
    this.productsList.push(newProduct);
    return newProduct;
  }

  async find() {
    const client = await getConnection();
    const products = await client.query("SELECT * FROM tasks");
    return products.rows;
  }

  async findOne(id) {
    const product = this.productsList.find((item) => item.id === id);
    if(!product) {
      throw boom.notFound("Product not found");
    }
    if(product.isBlock) {
      throw boom.forbidden("Product is blocked");
    }
    return product;
  }

  async update(id, changes) {
    const index = this.productsList.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("Product not found");
    }
    const product = this.productsList[index];
    this.productsList[index] = { ...product, ...changes };
    return this.productsList[index];
  }

  async delete(id) {
    const index = this.productsList.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("Product not found");
    }
    this.productsList.splice(index, 1);
    return { message: "Deleted", id };
  }
}

module.exports = ProductsService;
