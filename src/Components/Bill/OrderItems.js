import React from 'react'
import Product from "./Product";

export default function OrderItems({orderItem}) {
    return (
        <div>
                <div style={{textAlign: "center"}}>Table number {orderItem.order.tableId}</div>
                <hr/>
                {orderItem.order.orderItems.map(product => {
                    console.log("product is: ", product)
                    return(
                        <Product product={product} key={product.productId}/>
                    )
                })}
        </div>
    )
}