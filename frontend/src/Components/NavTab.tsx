import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { SyntheticEvent, useState } from "react";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface Props {
  onTabChange: (newTab: string) => void;
}

const NavTab = ({ onTabChange }: Props) => {
  const [value, setValue] = useState(0);

  const tabs = ["Catalog", "Cart"];

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onTabChange(tabs[newValue]);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
      <Tabs value={value} onChange={handleChange} aria-label="tab selection">
        <Tab label={tabs[0]} {...a11yProps(0)} />
        <Tab label={tabs[1]} {...a11yProps(1)} />
      </Tabs>
    </Box>
  );
};

export default NavTab;
