import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await res.locals.db.query("SELECT * FROM products");
  res.json({
    products: result,
  });
});

router.get("/:type", async (req, res) => {
  const type = req.params.type;
  const result = await res.locals.db.query(
    "SELECT * FROM products WHERE product_type = $1 LIMIT 6",
    [type]
  );
  res.send(await result.rows);
});

router.get("/byId/:id", async (req, res) => {
  const result = await res.locals.db.query(
    "SELECT * FROM products WHERE id = $1",
    [req.params.id]
  );
  res.json(result.rows[0]);
});

export default router;
