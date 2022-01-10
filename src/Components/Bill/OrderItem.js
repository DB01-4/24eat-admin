import * as React from "react";

export default function OrderItem({ item, props }) {
  return (
    <div>
      <h1>{item.product.id}</h1>
      <h1>{item.product.name}</h1>
    </div>
  );
}
