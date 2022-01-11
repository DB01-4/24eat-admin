import * as React from "react";
import { List } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import BillItem from "./BillItem";

export default function BillList({ bills }) {
  return (
    <List>
        {bills.map(bill => {
          console.log("bill is: ", bill)
          return(
            <div>
             <Card sx={{ maxWidth: 345,  border: 1, borderRadius: 3 }}>
             <CardActionArea>
               <h1 style={{marginTop: "20px"}}>Bill number: {bill.id}</h1>
               <hr style={{width: "75%"}}/>
                 <CardContent>
                   <Typography gutterBottom variant="h5" component="div">
                      <BillItem bill={bill} key={bill.id}/>
                   </Typography>
                 </CardContent>
                 <h1 style={{marginTop: "20px"}}>Total price: €{bill.total_price}</h1>
             </CardActionArea>
           </Card>
           </div>
          )
        })}
    </List>
  );
}

