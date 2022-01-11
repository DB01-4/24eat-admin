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
             <Card sx={{ maxWidth: 345 }}>
             <CardActionArea>
               <h1>{bill.id}</h1>
                 <CardContent>
                   <Typography gutterBottom variant="h5" component="div">
                      <BillItem bill={bill} key={bill.id}/>
                   </Typography>
                 </CardContent>
             </CardActionArea>
           </Card>
           </div>
          )
        })}
    </List>
  );
}

