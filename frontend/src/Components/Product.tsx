import { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Box from "@mui/material/Box";

interface Props {
  id: number;
  url: string;
}

const Product = ({ id, url }: Props) => {
  const [metadata, setMetadata] = useState(null);
  const [price, setPrice] = useState(null);

  async function retrivePrice() {
    if (metadata) {
      const response = await fetch(metadata["price"], {
        method: "GET",
        headers: {},
        credentials: "include",
      });
      const data = await response.json();
      setPrice(data);
    }
  }

  async function retriveMetadata() {
    const response = await fetch(url, {
      method: "GET",
      headers: {},
      credentials: "include",
    });
    const data = await response.json();

    setMetadata(data);
  }

  async function moveToCart() {
    await fetch(`${import.meta.env.VITE_API_HOST}/api/basket/add-product/`, {
      method: "POST",
      cache: "default",
      body: JSON.stringify({
        url: url,
        quantity: "1",
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  useEffect(() => {
    retriveMetadata();
  }, []);
  useEffect(() => {
    if (metadata) retrivePrice();
  }, [metadata]);
  const labelId = `checkbox-list-label-${id}`;
  return (
    <Box
      sx={{
        border: "1px solid",
        p: 1,
        borderRadius: 2,
        borderColor: "grey.300",
      }}
    >
      <ListItem
        disableGutters
        secondaryAction={
          <IconButton aria-label="comment" onClick={moveToCart}>
            <AddShoppingCartIcon></AddShoppingCartIcon>
          </IconButton>
        }
      >
        <ListItemText
          id={labelId}
          primary={metadata ? metadata["title"] : ""}
          secondary={price ? price["incl_tax"] + price["currency"] : ""}
        />
      </ListItem>
    </Box>
  );
};

export default Product;
