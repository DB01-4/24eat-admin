import { useEffect, useState } from 'react'
import "../../Style/kitchen.css"
import OrderCard from './OrderCard';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

var client = new WebSocket('wss://websocket-server-mediaan.herokuapp.com');
const apiUrl = "https://db01-4-menuservice.herokuapp.com/api"

export default function Order() {

    const [newOrders, setNewOrders] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const [isLoading, setIsLoading] = useState(true)
    const [first, setFirst] = useState(true)


    const sendMSG = () => {
        if(client.readyState === WebSocket.OPEN){
            var object = {"message":"ARandonMessage"};
            object = JSON.stringify(object);
            client.send(object);
        }
        if(client.readyState === WebSocket.CLOSED){
            client = new WebSocket('ws://websocket-server-mediaan.herokuapp.com');
        }
    }

    if(first){   
        console.log("first")
        setInterval(sendMSG, 40000)
        setFirst(false)
    }

    const GetAllOpenOrders = async () => {
        const token = await getAccessTokenSilently();
        axios
          .get(`${apiUrl}/private/orders`, {
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
            try{          
                console.log("incoming order: " + event.data);
                GetAllOpenOrders();
            }
            catch{

            }

        };
    });
    
    useEffect(() => {
        if(newOrders == null) {
            GetAllOpenOrders();
        }
    /* eslint-disable */
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