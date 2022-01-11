import { useEffect, useState } from 'react';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { CardActions } from '@mui/material';
import axios from 'axios';

const apiUrl = "https://db01-4-menuservice.herokuapp.com/api";

const OrderCard = ({order, GetOrders}) => {

    const [orderStatus, setOrderStatus] = useState(order.status);
    const [statusColor, setStatusColor] = useState();

    const UpdateStatusColor = () => {
        switch(orderStatus) {
            case 0: setStatusColor('Red');
            break;
            case 1: setStatusColor('Yellow');
            break;
            case 2: setStatusColor('Green');
            break;
            default: setStatusColor('Grey');
        }
    }

    const UpdateDB = (status) => {
        axios.put(`${apiUrl}/public/orders/${order.id}`, {status: status})
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

    const UpdateStatus = () => {
        UpdateDB(orderStatus + 1);
        setOrderStatus(orderStatus + 1);
        GetOrders();
        GetOrders();
    }

    useEffect(() => {
        UpdateStatusColor();
    })

    return (
    <Card sx={{ minWidth: 275 }} style={{ display: 'inline-block', margin: '15px', border: '5px solid', borderColor: statusColor}} variant="outlined">
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Table: {order.tableId} | Order: {order.id} | Status: {orderStatus}
            </Typography>
            {order.orderItems.map(dish => ( 
                <Typography key={dish.id} variant="h6" component="div">
                     {dish.quantity} x {dish.product.name} 
                </Typography>
             ))}
        </CardContent>
        <CardActions sx={{ float: 'right'}}>
            <Button onClick={() => UpdateStatus()} size="small">{GetNextStatusText()}</Button>
        </CardActions>
    </Card>
    )
}

export default OrderCard;