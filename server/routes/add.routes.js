import express from "express";
const router = express.Router();

router.post("/address/:id", async (req, res) => {
  await res.locals.db.query(
    "INSERT INTO address (address_name,address,cust_id) VALUES ($1,$2,$3)",
    [req.body.AddressName, req.body.Address, req.params.id]
  );
});

router.post("/toCart/:id", async (req, res) => {
  const id = req.params.id;
  const cust_id = req.body.cust_id;

  const result = await res.locals.db.query(
    "SELECT * FROM cart WHERE cust_id = $1",
    [cust_id]
  );

  if (result.rows.length === 0) {
    const cart = {
      [id]: "1",
    };

    await res.locals.db.query(
      "INSERT INTO cart(cust_id, cart) VALUES ($1, $2)",
      [cust_id, JSON.stringify(cart)]
    );
  } else {
    const cart = JSON.parse(result.rows[0].cart);
    var found = false;

    for (var key in cart) {
      if (key == id) {
        let temp = +cart[key];
        temp = +temp + 1;
        cart[key] = `${temp}`;
        found = true;
        break;
      }
    }

    if (found === false) {
      cart[`${id}`] = "1";
    }

    await res.locals.db.query("UPDATE cart SET cart = $1 WHERE id = $2", [
      JSON.stringify(cart),
      result.rows[0].id,
    ]);
  }
  res.sendStatus(200);
});

router.post("/toWishlist/:id", async (req, res) => {
  const id = req.params.id;
  const cust_id = req.body.cust_id;

  const result = await res.locals.db.query(
    "SELECT * FROM wishlist WHERE cust_id = $1",
    [cust_id]
  );

  if (result.rows.length === 0) {
    const items = {
      products: [id],
    };

    await res.locals.db.query(
      "INSERT INTO wishlist(cust_id, products) VALUES ($1, $2)",
      [cust_id, JSON.stringify(items)]
    );
  } else {
    const items = JSON.parse(result.rows[0].products);

    if (items.indexOf(`${id}`) >= 0) {
      res.json({
        message: "Already Wishlist-ed",
      });
    } else {
      items.push(id);

      await res.locals.db.query(
        "UPDATE wishlist SET products = $1 WHERE id = $2",
        [JSON.stringify(items), result.rows[0].id]
      );
      res.sendStatus(200);
    }
  }
});

export default router;
