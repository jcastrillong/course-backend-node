const faker = require("faker");

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

  async find(limit, offset) {
    if (limit && offset) {
      return this.usersList;
    } else {
      return "No hay parámetros";
    }
  }

  async findOne(id) {
    return this.usersList.find((item) => item.id === id);
  }
}

module.exports = UsersService;
