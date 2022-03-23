const faker = require("faker");

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
      });
    }
  }

  async create(data) {
    const newProduct = { id: faker.datatype.uuid(), ...data };
    this.productsList.push(newProduct);
    return newProduct;
  }

  find() {
    // Emulando
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.productsList);
      }, 3000);
    });
  }

  async findOne(id) {
    return this.productsList.find((item) => item.id === id);
  }

  async update(id, changes) {
    const index = this.productsList.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    const product = this.productsList[index];
    this.productsList[index] = { ...product, ...changes };
    return this.productsList[index];
  }

  async delete(id) {
    const index = this.productsList.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    this.productsList.splice(index, 1);
    return { message: "Deleted", id };
  }
}

module.exports = ProductsService;
