const boom = require("@hapi/boom");

// requiriendo los modelos
const { models } = require("../libs/sequelize");

class OrdersService {
  constructor() {}

  // crear una orden
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  // obtener todas las ordenes
  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  // obtener una orden por id
  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: "customer",
          include: ["user"],
        }
      ]
    });
    if (!order) {
      throw boom.notFound("Order not found");
    }
    return order;
  }

  // actualizar una orden
  async update(id, changes) {
    const order = await this.findOne(id);
    const orderUpdated = await order.update(changes);
    return orderUpdated;
  }

  // borrar una orden
  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy(id);
    return { id };
  }
}

// exportando el servicio
module.exports = OrdersService;