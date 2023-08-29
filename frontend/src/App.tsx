import ProductGrid from "./Components/ProductGrid";
import NavTab from "./Components/NavTab";
import Cart from "./Components/Cart";
import { useEffect, useState } from "react";

const App = () => {
  const [currentTab, setCurrentTab] = useState("Catalog");

  return (
    <>
      <NavTab
        onTabChange={(newTab) => {
          setCurrentTab(newTab);
        }}
      />
      {currentTab === "Catalog" ? <ProductGrid /> : <Cart />}
    </>
  );
};

export default App;
