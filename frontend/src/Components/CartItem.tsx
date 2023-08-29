import { useEffect, useReducer, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  url: string;
  product_url: string;
  quantity: number;
  total: string;
  currency: string;
  onDeleteItem: () => void;
}

const CartItem = ({
  url,
  product_url,
  quantity,
  total,
  currency,
  onDeleteItem,
}: Props) => {
  const [metadata, setMetadata] = useState(null);
  async function retriveMetadata() {
    const response = await fetch(product_url, {
      method: "GET",
      headers: {},
      credentials: "include",
    });
    const data = await response.json();

    setMetadata(data);
  }

  async function removeFromCart() {
    await fetch(`${url}`, {
      method: "DELETE",
      cache: "default",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    onDeleteItem();
  }

  useEffect(() => {
    retriveMetadata();
  }, []);

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
          <IconButton aria-label="comment" onClick={removeFromCart}>
            <CloseIcon></CloseIcon>
          </IconButton>
        }
      >
        <ListItemText
          primary={
            <>
              {metadata ? metadata["title"] : ""}
              <b>{quantity === 1 ? "" : " x" + quantity}</b>
            </>
          }
          secondary={total + currency}
        />
      </ListItem>
    </Box>
  );
};

export default CartItem;
