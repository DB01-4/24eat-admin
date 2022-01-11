import { useEffect, useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "../../Style/kitchen.css"
import OrderCard from './OrderCard';
import axios from 'axios';

const client = new WebSocket('ws://websocket-server-mediaan.herokuapp.com');
const apiUrl = "https://db01-4-menuservice.herokuapp.com/api"

export default function Order() {

    //create new empty array if localstorage is not already set
    if(localStorage.getItem('orders') == null) { localStorage.setItem('orders', '[]') }

    const [newOrders, setNewOrders] = useState(JSON.parse(localStorage.getItem('orders')));



    const SetLocalStorageArray = (array) => {
        localStorage.setItem('orders', JSON.stringify(array));
        setNewOrders(JSON.parse(localStorage.getItem('orders')));
    }

    const FinishOrder = (order) => {
        //get all orders
        var array = JSON.parse(localStorage.getItem('orders'));
        //delete order from index
        const index = array.indexOf(order)
        array.splice(index - 1, 1);
        //set new array to localstorage
        SetLocalStorageArray(array)
    }

    const GetOrderFromId = (orderId) => {
        axios
        .get(`${apiUrl}/private/orders/${orderId}`)
        .then((response) => {
            const newOrder = response.data;
            console.log(response);
            setNewOrders([...newOrders, newOrder]);
            var old_data = JSON.parse(localStorage.getItem('orders'));
            old_data.push(newOrder);
            localStorage.setItem('orders', JSON.stringify(old_data));
            setNewOrders(JSON.parse(localStorage.getItem('orders')));
            console.log(newOrders);
        })
    }


    useEffect(() =>  {
        client.onopen = () => {
            console.log('WebSocket client connected!');
        };
        client.onmessage = function (event) {
            console.log("incoming order: " + event.data);
            const orderId = event.data;
            GetOrderFromId(orderId);
          };

    });

    const test = () => {
    client.send(1);
    console.log("check")
    };


    return (
    <>
    <div class="orders">
        <h1>Incoming orders:</h1>
            {newOrders.map(order => (
                <OrderCard order = {order} FinishOrder = {FinishOrder}/>
            ))}
            <button onClick={() => test()}>SEND</button>
    </div>
    </>
    )
}