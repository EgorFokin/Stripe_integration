import { useEffect, useReducer, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import CartItem from "./CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  async function retrivecartItems() {
    let response = await fetch(`${import.meta.env.VITE_API_HOST}/api/basket/`, {
      method: "GET",
      headers: {},
      credentials: "include",
    });
    const basket = await response.json();
    response = await fetch(`${basket["lines"]}`, {
      method: "GET",
      headers: {},
      credentials: "include",
    });
    const lines = await response.json();
    setCartItems(lines);
  }
  useEffect(() => {
    retrivecartItems();
  }, []);

  return (
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
              currency={item["price_currency"]}
              onDeleteItem={retrivecartItems}
            ></CartItem>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Cart;
