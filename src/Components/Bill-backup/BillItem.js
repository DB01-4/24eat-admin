import React from 'react'
import OrderItems from './OrderItems';

export default function BillItem({ bill }) {
    return (
        <div>
                {bill.billitems.map(orderItems => {
                    return(
                        <OrderItems orderItems={orderItems} key={orderItems.id}/>
                    )
                })}
        </div>
    )
}
