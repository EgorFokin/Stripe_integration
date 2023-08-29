import { useEffect, useReducer, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import CartItem from "./CartItem";
import LoadingButton from "@mui/lab/LoadingButton";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
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
    retrivecartItems();
    if (cartItems.length === 0) return;
    setCheckoutLoading(true);
    let response = await fetch(`${import.meta.env.VITE_API_HOST}/api/basket/`, {
      method: "GET",
      headers: {},
      credentials: "include",
    });
    const basket_data = await response.json();
    const data = {
      basket: basket_data["url"],
      guest_email: "foo@example.com",
      total: basket_data["total_incl_tax"],
      shipping_method_code: "free-shipping",
      shipping_address: {
        country: "http://127.0.0.1:8000/api/countries/NL/",
        first_name: "Henk",
        last_name: "Van den Heuvel",
        line1: "Roemerlaan 44",
        line2: "",
        line3: "",
        line4: "Kroekingen",
        notes: "",
        phone_number: "+31 26 370 4887",
        postcode: "7777KK",
        state: "Gerendrecht",
        title: "Mr",
      },
    };

    response = await fetch(`${import.meta.env.VITE_API_HOST}/api/checkout/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": localStorage.getItem("csrf") ?? "",
      },
      body: JSON.stringify(data),
    });

    response = await fetch(
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
          <LoadingButton
            loading={checkoutLoading}
            variant="contained"
            onClick={checkout}
          >
            Checkout
          </LoadingButton>
          <h4>Total amount: {totalAmount + (currency ?? "")}</h4>
        </div>
      </Box>
      <Box sx={{ width: "100%" }}>
        <h1 style={{ margin: 10 }}>
          {cartItems.length === 0 ? "Your cart is empty" : ""}
        </h1>
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
