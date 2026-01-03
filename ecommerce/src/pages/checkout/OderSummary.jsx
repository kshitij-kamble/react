import { DeliveryDate } from "./DeliveryDate";

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && (
        <DeliveryDate
          cart={cart}
          deliveryOptions={deliveryOptions}
          loadCart={loadCart}
        />
      )}
    </div>
  );
}
