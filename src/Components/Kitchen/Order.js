import { useEffect, useState } from 'react'
import "../../Style/kitchen.css"
import OrderCard from './OrderCard';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const client = new WebSocket('ws://websocket-server-mediaan.herokuapp.com');
const apiUrl = "https://db01-4-menuservice.herokuapp.com/api"

export default function Order() {

    const [newOrders, setNewOrders] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const [isLoading, setIsLoading] = useState(true);

    const GetAllOpenOrders = async () => {
        const token = await getAccessTokenSilently();
        axios
          .get(`${apiUrl}/public/orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(function (response) {
            setNewOrders(response.data);
            setIsLoading(false);
          })
          .catch(function (error) {});
      };


    useEffect(() =>  {
        client.onopen = () => {
            console.log('WebSocket client connected!');
        };
        client.onmessage = function (event) {
            console.log("incoming order: " + event);
            GetAllOpenOrders();
        };
    });

    
    useEffect(() => {
        if(newOrders == null) {
            GetAllOpenOrders();
        }
    }, [newOrders]);




    if (isLoading) {
        return <div>loading...</div>;
      }
    
    if (!isLoading) {
    return (
        <div class="orders">
        <h1>Incoming orders:</h1>
            {newOrders.sort((a, b) => a.id - b.id).map(order => { if(order.status !== 3) return <OrderCard order = {order} GetOrders = {GetAllOpenOrders}/>})}
    </div>
    );
    }
}