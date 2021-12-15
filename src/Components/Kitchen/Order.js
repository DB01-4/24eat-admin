import { useEffect, useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "../../Style/kitchen.css"
import OrderCard from './OrderCard';

const client = new W3CWebSocket('ws://127.0.0.1:8000');

export default function Order() {

    if(localStorage.getItem('orders') == null) { localStorage.setItem('orders', '[]') }
    const [newOrders, setNewOrders] = useState(JSON.parse(localStorage.getItem('orders')));


    useEffect(() =>  {
        client.onopen = () => {
            console.log('WebSocket client connected!');
        };
        client.onmessage = (newOrder) => {
            const data = JSON.parse(newOrder.data);
            //setNewOrders([...newOrders, data]);
            var old_data = JSON.parse(localStorage.getItem('orders'));
            old_data.push(data);
            localStorage.setItem('orders', JSON.stringify(old_data));
            setNewOrders(JSON.parse(localStorage.getItem('orders')));
        }
       
    });

    const FinishOrder = (order) => {
        var array = JSON.parse(localStorage.getItem('orders'));
        const index = array.indexOf(order)
        array.splice(index - 1, 1);
        localStorage.setItem('orders', JSON.stringify(array));
        setNewOrders(JSON.parse(localStorage.getItem('orders')));
    }

    return (
    <>
    <div class="orders">
        <h1>Incoming orders:</h1>
            {newOrders.map(order => (
                <OrderCard order = {order} FinishOrder = {FinishOrder}/>
            ))}
    </div>
    </>
    )
}