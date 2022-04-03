const { Router } = require("express");

const CustomerService = require("../services/customers.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require("./../schemas/customers.schema");

const router = Router();
const service = new CustomerService();

router.get("/", async (req, res) => {
  const customers = await service.find();
  res.json(customers);
});

router.get("/:id", 
  validatorHandler(getCustomerSchema, "params"),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await service.findOne(id);
    res.json(customer);
  } catch (e) {
    next(e);
  }
});

router.post("/", 
  validatorHandler(createCustomerSchema, "body"),
  async (req, res, next) => {
  try {
    const body = req.body;
    const newCustomer = await service.create(body);
    res.status(201).json({
      message: "Created",
      data: newCustomer,
    });
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", 
  validatorHandler(getCustomerSchema, "params"),
  validatorHandler(updateCustomerSchema, "body"),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const customer = await service.update(id, body);
    res.json({
      message: "Updated",
      data: customer,
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", 
  validatorHandler(getCustomerSchema, "params"),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await service.delete(id);
    res.json({
      message: "Deleted",
      data: customer,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;