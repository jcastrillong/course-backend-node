const Joi = require("joi");

const id = Joi.string();
const t_name = Joi.string().min(3).max(30);
const description = Joi.string().min(3).max(30);

const createProductSchema = Joi.object({
  t_name: t_name.required(),
  description: description.required(),
});

const updateProductSchema = Joi.object({
  t_name: t_name,
  description: description,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};
