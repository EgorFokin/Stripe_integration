import { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";
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
  const [checked, setChecked] = useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  async function retrivePrice() {
    if (metadata) {
      const response = await fetch(metadata["price"], {
        method: "GET",
        headers: {},
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
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
        key={id}
        disableGutters
        secondaryAction={
          <IconButton aria-label="comment">
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
