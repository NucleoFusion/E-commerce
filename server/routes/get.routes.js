import express from "express";
const router = express.Router();

async function getProducts(arr) {
  var array = [];
  for (let i = 0; i < arr.length; i++) {
    const result = await db.query("SELECT * FROM products WHERE id = $1", [
      parseInt(arr[i]),
    ]);
    var data = result.rows[0];
    array.push(data);
  }
  return array;
}

router.get("/wishlist/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  var wishlist = await res.locals.db.query(
    "SELECT * FROM wishlist WHERE cust_id = $1",
    [id]
  );
  let wishlistItems = wishlist.rows[0].products.split(":");
  var wishlistData = await getProducts(wishlistItems);
  res.json(wishlistData);
});

router.get("/cart/:id", async (req, res) => {
  const result = await res.locals.db.query(
    "SELECT * FROM cart WHERE cust_id = $1",
    [parseInt(req.params.id)]
  );
  const cartItems = result.rows[0].cart.split(":");
  const prodArray = await getProducts(cartItems);
  res.send(prodArray);
});

router.get("/user/:id", async (req, res) => {
  var id = parseInt(req.params.id);
  const result = await res.locals.db.query(
    "SELECT email, username FROM users WHERE id = $1",
    [id]
  );
  const address = await res.locals.db.query(
    "SELECT address_name,address FROM address WHERE cust_id = $1",
    [id]
  );
  res.json({
    userData: result.rows[0],
    address: address.rows,
  });
});

export default router;
