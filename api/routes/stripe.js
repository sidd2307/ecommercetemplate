const e = require("express");

const router = require("express").Router();
const stripe = require('stripe')('sk_test_51Jg2rkSGwd9scym90pE0oHpihDmjN4LPjDcCj7pCiMoRjjdGjQe0PvYD5VHdpISmZMzwvPwg7fANofdA6UMoPs2h005gXYn71x')
const uuid = require("uuid").v4;

router.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT", product);
  console.log("PRICE", product.price);
  const idempontencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

module.exports = router;
