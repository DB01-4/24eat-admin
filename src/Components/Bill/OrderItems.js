import React from 'react'
import { List } from "@mui/material";
import Product from "./Product";

export default function OrderItems({orderItems}) {
    return (
        <div>
            <List>
                <div style={{textAlign: "center"}}>Table number {orderItems.order.tableId}</div>
                <hr/>
                {orderItems.order.orderItems.map(product => {
                    console.log("product is: ", product)
                    return(
                        
                        <Product product={product} key={orderItems.id}/>
                    )
                })}
            </List>
        </div>
    )
}