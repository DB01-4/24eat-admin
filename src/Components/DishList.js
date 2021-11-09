import React from 'react';
import { useEffect, useState } from 'react';
import {Card, CardContent, CardActionArea, Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from "axios";
import Dialog from './DishEdit';


const DishList = ({ dishes }) => {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState();

  
  useEffect(() => {
  }, [selectedCard]); // Only re-run the effect if count changes

  const handleDelete = data => 
  axios.delete(`http://localhost:8080/products/${data.id}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
  });

  const handleClickOpen = (value) => {
    setSelectedCard(value)
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {dishes.map(dish => (
        <div title='card' key={dish.id} >
                <Card onClick={() => handleClickOpen(dish)}>
                    <CardActionArea>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        { dish.name }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        { dish.description }
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            <Button onClick={() => handleDelete(dish)}>X</Button>
          </div>
      ))}
        <Dialog
        selectedCard={selectedCard}
        open={open}
        onClose={handleClose}
        />
    </div>
  );
}
 
export default DishList;