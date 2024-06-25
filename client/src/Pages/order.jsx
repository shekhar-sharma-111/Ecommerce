import React from "react";

export default function Order({ orderId, product, quantity, totalPrice }) {
  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {orderId}</p>
      <p>Product: {product}</p>
      <p>Quantity: {quantity}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      {/* Add more details based on your order information */}
      <button onClick={() => handleCancelOrder(orderId)}>Cancel Order</button>
    </div>
  );
}

const handleCancelOrder = (orderId) => {
  // Add logic to handle order cancellation
  console.log(`Cancel Order with ID: ${orderId}`);
  // You can make an API call to the server to cancel the order, update the UI, etc.
};
