import { useEffect, useState } from "react";

const API_HOST = "http://localhost:8000";

let _csrfToken: string = "";

async function getCsrfToken() {
  if (!_csrfToken) {
    const response = await fetch(`${API_HOST}/csrf/`, {
      credentials: "include",
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;
  }
  return _csrfToken;
}

const App = () => {
  const [basket, setBasket] = useState("");
  async function getBasket() {
    const response = await fetch(`${API_HOST}/api/basket/`, {
      method: "GET",
      headers: {},
      credentials: "include",
    });
    const data = await response.json();
    setBasket(JSON.stringify(data));
  }
  useEffect(() => {
    getBasket();
  });
  return <>{basket}</>;
};

export default App;
