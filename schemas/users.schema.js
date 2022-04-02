const Joi = require("joi");

const id = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(3).max(80);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};