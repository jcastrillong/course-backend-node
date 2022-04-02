const faker = require("faker");

const { models } = require("./../libs/sequelize");

class UsersService {
  constructor() {
    this.usersList = [];
    this.generate();
  }

  generate() {
    const limit = 20;
    for (let index = 0; index < limit; index++) {
      this.usersList.push({
        id: faker.datatype.uuid(),
        limit: parseInt(faker.commerce.price()),
        offset: parseInt(faker.commerce.price()),
      });
    }
  }

  async find() {
    const users = await models.User.findAll();
    return users;
  }

  async findOne(id) {
    return this.usersList.find((item) => item.id === id);
  }
}

module.exports = UsersService;
