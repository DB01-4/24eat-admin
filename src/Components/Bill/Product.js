import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";


export default function Product({product}) {
    return (
        <div className='productdiv'>
            <h4 style={{textAlign: "center"}}>{product.quantity}x {product.product.name} €{product.product.price}</h4>
        </div>
        
    )
}
