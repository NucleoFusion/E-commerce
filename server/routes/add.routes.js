import express from "express";
const router = express.Router();

router.post("/address/:id", async (req, res) => {
  await res.locals.db.query(
    "INSERT INTO address (address_name,address,cust_id) VALUES ($1,$2,$3)",
    [req.body.AddressName, req.body.Address, req.params.id]
  );
});

router.post("/toCart/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  res.sendStatus(200);
});

export default router;
