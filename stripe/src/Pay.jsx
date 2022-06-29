import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const KEY =
  "pk_test_51Jg2rkSGwd9scym97pxWpiXAdMV62uDcLSc2osrz8albt8BcsTQnXHFbgspnD16G1WrwC12MIz16GrLw7D4HziGD00SddTPFG7";

export default function Pay() {
  const [product, setProduct] = useState({
    name: "React fom FB",
    price: 10,
    productBy: "facebook",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`http://localhost:5000/api/checkout/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE ", response);
        const { status } = response;
        console.log("STATUS ", status);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
          stripeKey="pk_test_51Jg2rkSGwd9scym97pxWpiXAdMV62uDcLSc2osrz8albt8BcsTQnXHFbgspnD16G1WrwC12MIz16GrLw7D4HziGD00SddTPFG7"
          token={makePayment}
          name="Buy React"
          amount={product.price * 100}
        >
          <button className="btn-large blue">
            Buy React in just $ {product.price}
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}
