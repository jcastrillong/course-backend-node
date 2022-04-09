"use strict";

const { USER_TABLE } = require("../../db/models/users.model");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, "recovery_token", {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      field: "recovery_token",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, "recovery_token");
  },
};
