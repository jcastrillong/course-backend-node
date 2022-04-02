const { User, UserSchema } = require("../models/users.model");

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
}

module.exports = setupModels;
