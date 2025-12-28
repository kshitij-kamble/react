import { DeliveryDate } from "./DeliveryDate";

export function OrderSummary({ cart, deliveryOptions }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && (
        <DeliveryDate cart={cart} deliveryOptions={deliveryOptions} />
      )}
    </div>
  );
}
