import "./OrdersPage.css";
import { Header } from "../../components/header";
import { OrdersGrid } from "./OrdersGrid";

export function OrdersPage({ cart }) {
  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid />
      </div>
    </>
  );
}
