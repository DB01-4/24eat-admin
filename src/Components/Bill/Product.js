import React from 'react'

export default function Product({product}) {
    return (
        <div className='productdiv'>
            <h4 style={{textAlign: "center"}}>{product.quantity}x {product.product.name} €{product.product.price}</h4>
        </div>
    )
}
