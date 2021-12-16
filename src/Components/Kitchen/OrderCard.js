import { useEffect, useState } from 'react';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { CardActions } from '@mui/material';
import axios from 'axios';

const apiUrl = "http://localhost:8080/api";

const OrderCard = ({order, FinishOrder}) => {


    const ChangeStatusColor = () => {
        switch(orderStatus) {
            case 0: setStatusColor('Red');
            break;
            case 1: setStatusColor('Yellow');
            break;
            case 2: setStatusColor('Green');
            break;
            default: setStatusColor('Purple');
        }
    }

    const [orderStatus, setOrderStatus] = useState(order.status);
    const [statusColor, setStatusColor]= useState();


    useEffect(() => {
        ChangeStatusColor();
    })

    const UpdateStatus = (status) => {
        axios
        .put(`${apiUrl}/public/orders/${order.id}`, {status: status})
        .then((response) => {
            console.log(response);
            var old_data = JSON.parse(localStorage.getItem('orders'));
            old_data.find((element) => {
            if(element.id === order.id){
                element.status = response.data.status;
            }})
            localStorage.setItem('orders', JSON.stringify(old_data));
            order.status = response.data.status;
        })
    }


    const ChangeStatus = (order) => {
        switch(orderStatus) {
            case 0: setOrderStatus(1);
                    ChangeStatusColor();
                    UpdateStatus(1);
            break;
            case 1: setOrderStatus(2)
                    ChangeStatusColor();
                    UpdateStatus(2);
            break;
            case 2: FinishOrder(order);
            break;
            default: setOrderStatus(0)
                     ChangeStatusColor();
        }

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
                Table: {order.tableId} | Order: {order.id} | Status: {orderStatus}
            </Typography>
            {order.orderItems.map(dish => ( 
                <Typography key={dish.id} variant="h6" component="div">
                     {dish.quantity} x {dish.product.name} 
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