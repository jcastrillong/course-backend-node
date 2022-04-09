const { Router } = require("express");

// requiriendo el servicio
const OrdersService = require("../services/orders.service");
// requiriendo el middleware
const validatorHandler = require("../middlewares/validator.handler");
// requiriendo el schema
const { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema } = require("../schemas/orders.schema");

// inicializando el router
const router = Router();
// inicializando el servicio
const service = new OrdersService();

router.get("/", async (req, res) => {
  const orders = await service.find();
  res.json(orders);
});

router.get("/:id", 
  validatorHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    try {
      const {id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (e) {
      next(e);
    }
});

router.post("/", 
  validatorHandler(createOrderSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json({
        message: "Created",
        data: newOrder,
      });
    } catch (e) {
      next(e);
    }
});

router.post("/add-item", 
  validatorHandler(addItemSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json({
        message: "Created",
        data: newItem,
      });
    } catch (e) {
      next(e);
    }
});

router.patch("/:id", async (req, res, next) => {
  
});

router.delete("/:id", 
  validatorHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    const user = await service.delete(id);
    res.json({
      message: "Deleted",
      data: user,
    });
});

module.exports = router;
