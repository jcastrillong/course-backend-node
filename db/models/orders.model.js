const { Model, DataTypes, Sequelize } = require("sequelize");

const { CUSTOMER_TABLE } = require("./customers.model");

const ORDER_TABLE = "orders";

const OrderSchema = {
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
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items.length > 0) {
        return this.items.reduce((acc, item) => {
          return acc + (item.price * item.OrderProduct.amount);
        }, 0);
      }
      return 0;
    },
  },
};

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: "customer" });
    this.belongsToMany(models.Product, {
      as: "items",
      through: models.OrderProduct,
      foreignKey: "orderId",
      otherKey: "productId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: "Order",
      timestamps: false,
    };
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };
