import { useEffect, useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8000');

export default function Order() {

    const [newOrder, setNewOrder] = useState(null);


    useEffect(() =>  {
        client.onopen = () => {
            console.log('WebSocket client connected!');
        };
        client.onmessage = (newOrder) => {
            const data = JSON.parse(newOrder.data);
            setNewOrder(data);
            console.log("You ordered: ", data);
        }
    });
    
    return (
    <>
    <h1>Incoming orders:</h1>
    <h2>{newOrder===null? "":newOrder.name}</h2>
    </>
    )

    
}