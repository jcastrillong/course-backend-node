const boom = require("@hapi/boom");

const { models } = require("./../libs/sequelize");

class UsersService {
  constructor() {}

  async create(body) {
    const newUser = await models.User.create(body);
    return newUser;
  }

  async find() {
    const users = await models.User.findAll({
      include: ["customer"],
    });
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user) {
      throw boom.notFound("User not found");
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const userUpdated = await user.update(changes);
    return userUpdated;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy(id);
    return { id };
  }
}

module.exports = UsersService;
