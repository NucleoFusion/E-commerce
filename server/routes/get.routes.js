import express from "express";
const router = express.Router();

router.get("/cart/:id", async (req, res) => {
  let id = +req.params.id;
  const cart_res = await req.db.query("SELECT * FROM cart WHERE cust_id = $1", [
    id,
  ]);
  const cartData = JSON.parse(cart_res.rows[0].cart);

  var data = [];

  for (let key in cartData) {
    const result = await req.db.query("SELECT * FROM products WHERE id = $1", [
      +key,
    ]);
    data.push({
      prodData: result.rows[0],
      qty: +cartData[key],
    });
  }

  res.send(data);
});

router.get("/wishlist/:id", async (req, res) => {
  let id = +req.params.id;
  const wishlist_res = await req.db.query(
    "SELECT * FROM wishlist WHERE cust_id = $1",
    [id]
  );
  const wishlistData = JSON.parse(wishlist_res.rows[0].products);

  var data = [];

  for (let i = 0; i < wishlistData.length; i++) {
    const result = await req.db.query("SELECT * FROM products WHERE id = $1", [
      +wishlistData[i],
    ]);
    data.push(result.rows[0]);
  }
  res.send(data);
});

router.get("/user/:id", async (req, res) => {
  var id = parseInt(req.params.id);
  const result = await req.db.query(
    "SELECT email, username FROM users WHERE id = $1",
    [id]
  );
  const address = await req.db.query(
    "SELECT address_name,address FROM address WHERE cust_id = $1",
    [id]
  );
  res.json({
    userData: result.rows[0],
    address: address.rows,
  });
});

export default router;
