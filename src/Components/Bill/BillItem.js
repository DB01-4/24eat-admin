import React from 'react'
import OrderItems from './OrderItems';

export default function BillItem({ bill }) {
    return (
        <div>
                {bill.orderItems.map(orderItem => {
                    console.log("orderItems is: ", orderItem)
                    return(
                        <div className='productdiv'>
                        <h4 style={{textAlign: "center"}}>{orderItem.quantity}x {orderItem.product.name} €{orderItem.product.price}</h4>
                    </div>
                    )
                })}
        </div>
    )
}
