import { Route, Routes } from "react-router";
import "./App.css";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { Tracking } from "./pages/TrackingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { HomePage } from "./pages/home/HomePage";
import { OrdersPage } from "./pages/order/OrdersPage";

function App() {
  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };
  const [cart, setCart] = useState([]);
  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route
        path="checkout"
        element={<CheckoutPage cart={cart} loadCart={loadCart} />}
      />
      <Route
        path="orders"
        element={<OrdersPage cart={cart} loadCart={loadCart} />}
      />
      <Route
        path="tracking/:orderId/:productId"
        element={<Tracking cart={cart} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
