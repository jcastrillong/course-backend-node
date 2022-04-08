'use strict';

const { CUSTOMER_TABLE } = require('./../models/customers.model');
const { USER_TABLE } = require("./../models/users.model");
const { DataTypes, Sequelize } = require("sequelize");

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CUSTOMER_TABLE, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name",
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
        defaultValue: Sequelize.NOW,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
        references: {
          model: USER_TABLE,
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
