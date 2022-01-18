import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";


export default function BillList({ bills }) {
  return (
    <>
        {bills.map(bill => {
          console.log("bill is: ", bill)
          return(
            <div style={{margin: "20px 0"}} key={bill.id}>
             <Card style={{margin: "0 auto"}} sx={{ maxWidth: 2000,  border: 1, borderRadius: 3 }} >
              <CardContent style={{textAlign: "center"}}>
                <h1 style={{display: "inline-block", marginRight: "20%"}}>Order time: {bill.orderTime}</h1>
                <h1 style={{display: "inline-block", marginRight: "20%"}}>Table number: {bill.tableId}</h1>
                <h1 style={{display: "inline-block", marginRight: "20%"}}>Bill number: {bill.id}</h1>
              </CardContent>
             </Card>
           </div>
          )
        })}
    </>
  );
}

