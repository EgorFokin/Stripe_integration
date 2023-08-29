import { useEffect, useReducer, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import CartItem from "./CartItem";
import Button from "@mui/material/Button";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  async function retrivecartItems() {
    let response = await fetch(`${import.meta.env.VITE_API_HOST}/api/basket/`, {
      method: "GET",
      headers: {},
      credentials: "include",
    });
    const basket = await response.json();
    setTotalAmount(basket["total_incl_tax"]);
    setCurrency(basket["currency"]);
    response = await fetch(`${basket["lines"]}`, {
      method: "GET",
      headers: {},
      credentials: "include",
    });
    const lines = await response.json();
    setCartItems(lines);
  }

  async function checkout() {
    const response = await fetch(
      `${import.meta.env.VITE_API_HOST}/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      }
    );
    if (response.ok) {
      window.location.href = (await response.json())["url"];
    }
  }

  useEffect(() => {
    retrivecartItems();
  }, []);

  return (
    <>
      <Box
        m={1}
        p={2}
        //margin
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{ width: "100%" }}
      >
        <div style={{ marginLeft: "auto" }}>
          <Button variant="contained" onClick={checkout}>
            Checkout
          </Button>
          <h4>Total amount: {totalAmount + (currency ?? "")}</h4>
        </div>
      </Box>
      <Box sx={{ width: "100%" }}>
        <h1>{cartItems.length === 0 ? "Your cart is empty" : ""}</h1>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {cartItems.map((item, index) => (
            <Grid xs={6} key={index}>
              <CartItem
                url={item["url"]}
                product_url={item["product"]}
                quantity={item["quantity"]}
                total={item["price_incl_tax"]}
                currency={currency}
                onDeleteItem={retrivecartItems}
              ></CartItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Cart;
