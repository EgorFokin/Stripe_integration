import ProductGrid from "./Components/ProductGrid";
import NavTab from "./Components/NavTab";
import Cart from "./Components/Cart";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";

const App = () => {
  const [currentTab, setCurrentTab] = useState("Catalog");
  const [showMessage, setShowMessage] = useState(true);

  const queryParameters = new URLSearchParams(window.location.search);
  const message = queryParameters.get("message");

  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    return () => {
      clearTimeout(messageTimer);
    };
  }, []);

  return (
    <>
      <>
        {showMessage && message === "success" && (
          <Alert severity="success">
            Success! Your transaction went through
          </Alert>
        )}
        {showMessage && message === "fail" && (
          <Alert severity="warning">Your transaction wasn't comlete</Alert>
        )}
      </>
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
