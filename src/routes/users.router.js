const { Router } = require("express");

const router = Router();

/* Tipo query
  * son parámetros opcionales, en el navegador se usan 
  de la sigte manera "/users?limit=10&offset=200" */
router.get("/", (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send("No hay parámetros");
  }
});

module.exports = router;