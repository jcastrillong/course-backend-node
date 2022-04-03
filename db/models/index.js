const { User, UserSchema } = require("../models/users.model");
const { Customer, CustomerSchema } = require("../models/customers.model");

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
}

module.exports = setupModels;
