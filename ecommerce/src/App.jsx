import { Route, Routes } from "react-router";
import "./App.css";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { Tracking } from "./pages/Tracking";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { HomePage } from "./pages/home/HomePage";
import { OrdersPage } from "./pages/order/OrdersPage";

function App() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    };
    getData();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<Tracking />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
