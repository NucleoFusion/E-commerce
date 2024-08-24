import express from "express";
const router = express.Router();

router.get("/cart/:id", async (req, res) => {
  let id = +req.params.id;
  const cart_res = await res.locals.db.query(
    "SELECT * FROM cart WHERE cust_id = $1",
    [id]
  );
  const cartData = JSON.parse(cart_res.rows[0].cart);

  var data = [];

  for (let key in cartData) {
    const result = await res.locals.db.query(
      "SELECT * FROM products WHERE id = $1",
      [+key]
    );
    data.push({
      prodData: result.rows[0],
      qty: +cartData[key],
    });
  }

  res.send(data);
});

// router.get("/cart/:id", async (req, res) => {
//   const result = await res.locals.db.query(
//     "SELECT * FROM cart WHERE cust_id = $1",
//     [parseInt(req.params.id)]
//   );
//   const cartItems = result.rows[0].cart.split(":");
//   const prodArray = await getProducts(cartItems, res.locals.db);
//   res.send(prodArray);
// });

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
