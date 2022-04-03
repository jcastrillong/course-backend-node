const { Router } = require("express");

const validatorHandler = require("./../middlewares/validator.handler");


const router = Router();

router.get("/", async (req, res) => {
  res.json({
    message: "Hello World",
  });
});

router.get("/:id", async (req, res) => {
  res.json({
    message: "Hello World",
  });
});

router.post("/", async (req, res) => {
  res.json({
    message: "Hello World",
  });
});

router.patch("/:id", async (req, res) => {
  res.json({
    message: "Hello World",
  });
});

router.delete("/:id", async (req, res) => {
  res.json({
    message: "Hello World",
  });
});