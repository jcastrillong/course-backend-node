const { Router } = require("express");

const UsersService = require("../services/users.service");

const router = Router();
const service = new UsersService();

/* Tipo query
  * son parámetros opcionales, en el navegador se usan 
  de la sigte manera "/users?limit=10&offset=200" */
router.get("/", async (req, res) => {
  const { limit, offset } = req.query;
  const data = await service.find(limit, offset);
  res.json(data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await service.findOne(id);
  res.json(user);
})

module.exports = router;
