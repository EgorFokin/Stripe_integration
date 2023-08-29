import { useEffect, useState } from "react";
import Product from "./Product";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  async function retriveProducts() {
    const response = await fetch(
      `${import.meta.env.VITE_API_HOST}/api/products/`,
      {
        method: "GET",
        headers: {},
        credentials: "include",
      }
    );
    const data = await response.json();
    setProducts(data);
  }
  useEffect(() => {
    retriveProducts();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {products.map((item) => (
          <Grid xs={6}>
            <Product id={item["id"]} url={item["url"]}></Product>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;
