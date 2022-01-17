import React from 'react'
import { List } from "@mui/material";
import OrderItems from './OrderItems';

export default function BillItem({ bill }) {
    return (
        <div>
            <List>
                {bill.billitems.map(orderItems => {
                    console.log("orderItems is: ", orderItems)
                    return(
                        <OrderItems orderItems={orderItems} key={orderItems.id}/>
                    )
                })}
            </List>
        </div>
    )
}
