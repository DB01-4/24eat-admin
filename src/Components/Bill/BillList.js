import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from './Bill';
import { useState } from 'react';


export default function BillList({ bills }) {


  const [open, setOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState();

  const handleClose = () => {
    setOpen(false);

  };

  const handleClickOpen = (value) => {
    setSelectedBill({...value, value})
    setOpen(true);
  };


  return (
    <>
        {bills.map(bill => {
          console.log("bill is: ", bill)
          return(<div>
                        <Dialog
            selectedBill={selectedBill}
            open={open}
            onClose={handleClose}
            />
            <div style={{margin: "20px 0"}} key={bill.id}>

             <Card style={{margin: "0 auto"}} sx={{ maxWidth: 2000,  border: 1, borderRadius: 3 }} >
              <CardContent style={{textAlign: "center"}}>
                <CardActionArea onClick={() => handleClickOpen(bill)}>
                <h1 style={{display: "inline-block", marginRight: "10%"}}>Order time: {bill.orderTime}</h1>
                <h1 style={{display: "inline-block", marginRight: "10%"}}>Table number: {bill.tableId}</h1>
                <h1 style={{display: "inline-block", marginRight: "10%"}}>Bill number: {bill.id}</h1>
                </CardActionArea>
              </CardContent>
             </Card>
           </div>
           </div>
          )
        })}
    </>
  );
}

