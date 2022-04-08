"use strict";

const { ORDER_TABLE } = require("../models/orders.model");
const { CUSTOMER_TABLE } = require("./../models/customers.model");
const { DataTypes, Sequelize } = require("sequelize");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "customer_id",
        references: {
          model: CUSTOMER_TABLE,
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
  },
};
