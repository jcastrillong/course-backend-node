const { Router } = require("express");
const faker = require("faker");

const router = Router();

// enviando json
router.get("/", (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  // generando informacion aleatoria
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});

// Específico
router.get("/filter", (req, res) => {
  res.send("Yo soy un filter");
});

/* Rutas que reciben parámetros
 * Tipo params
 * Solo un parámetro => "/nameRoute/:param" */
// Dinámico
router.get("/:id", (req, res) => {
  const { id } = req.params; // obteniendo los parametros
  res.json({
    id,
    name: "Product 2",
    price: 10000,
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: "Created",
    data: body,
  });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "Updated",
    id,
    data: body,
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    message: "Deleted",
    id,
  });
});

module.exports = router;
