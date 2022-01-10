import * as React from "react";
import OrderItem from "./OrderItem";

export default function OrderItems({ bill }) {
  return (
    <div>
      {bill.map((item) => {
        return <OrderItem key={OrderItem.id} item={item}></OrderItem>;
      })}
    </div>
  );
}
