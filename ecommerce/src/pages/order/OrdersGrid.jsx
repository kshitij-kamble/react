import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { OrderHeader } from "./OrderHeader";
import { OrderDetailsGrid } from "./OrderDetailsGrid";

export function OrdersGrid() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrdersData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    getOrdersData();
  }, []);
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <OrderHeader order={order} />
            <OrderDetailsGrid order={order} />
          </div>
        );
      })}
    </div>
  );
}
