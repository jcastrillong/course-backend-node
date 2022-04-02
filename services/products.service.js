const faker = require("faker");
const boom = require("@hapi/boom");

const sequelize = require("../libs/sequelize");

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
    const query = `INSERT INTO tasks (t_name, description) VALUES ('${data.t_name}', '${data.description}')`;
    const product = await this.pool.query(query);

    return product.rows[0];
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const [products, metadata] = await sequelize.query(query);
    return products;
  }

  async findOne(id) {
    const query = `SELECT * FROM tasks WHERE id = '${id}'`;
    const product = await this.pool.query(query);
    return product.rows[0];
  }

  async update(id, changes) {
    const query = `UPDATE tasks SET name = '${changes.name}' WHERE id = '${id}'`;
    const product = await this.pool.query(query);
    return product.rows[0];
  }

  async delete(id) {
    const query = `DELETE FROM tasks WHERE id = '${id}'`;
    const product = await this.pool.query(query);
    return product.rows[0];
  }
}

module.exports = ProductsService;
