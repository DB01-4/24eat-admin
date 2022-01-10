import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import OrderItems from "./OrderItems";

export default function BillList({ bill, props }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {bill.map((bill) => (
          <CardContent>
            <Typography key={bill.id} gutterBottom variant="h5" component="div">
              {bill.id}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {bill.total_price}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {bill.billitems.id}
            </Typography>
          </CardContent>
        ))}
      </CardActionArea>
    </Card>
  );
}
