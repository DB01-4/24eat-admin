import { useEffect, useState } from 'react';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { CardActions } from '@mui/material';


const OrderCard = ({order, FinishOrder}) => {

    const [orderStatus, setOrderStatus] = useState(order.status);
    const [statusColor, setStatusColor]= useState('Red');

    const ChangeStatus = (order) => {
        switch(orderStatus) {
            case 0: setOrderStatus(1)
                    setStatusColor('Yellow');
            break;
            case 1: setOrderStatus(2)
                    setStatusColor('Green');
            break;
            case 2: FinishOrder(order);
            break;
            default: setOrderStatus(0)
                     setStatusColor('Purple');
        }
        order.status = orderStatus;
    }

    const GetNextStatusText = () => {
        const defaultText = 'Change to: '
        switch(orderStatus) {
            case 0: return defaultText + 'In Progress';
            case 1: return defaultText + 'Done';
            case 2: return 'Finish';
            default: return '';
        }
    }
 

    return (
    <Card sx={{ minWidth: 275 }} style={{ display: 'inline-block', margin: '15px', border: '5px solid', borderColor: statusColor}} variant="outlined">
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Table {order.tableNr} Order 1
            </Typography>
            {order.dishes.map(dish => (
                <Typography variant="h6" component="div">
                    {dish.quantity} x {dish.name}
                </Typography>
            ))}
        </CardContent>
        <CardActions sx={{ float: 'right'}}>
            <Button onClick={() => ChangeStatus(order)} size="small">{GetNextStatusText()}</Button>
        </CardActions>
    </Card>
    )
}

export default OrderCard;