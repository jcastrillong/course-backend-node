const { Router } = require("express");
const productsRouter = require("./products.router");
const usersRouter = require("./users.router");
const categoriesRouter = require("./categories.router");

function routerApi(app) {
  const router = Router();

  app.use("/api", router);

  router.use("/products", productsRouter);
  router.use("/users", usersRouter);
  router.use("/categories", categoriesRouter);
}

module.exports = routerApi;
