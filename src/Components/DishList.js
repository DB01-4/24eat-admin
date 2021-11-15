import React from 'react';
import { useState } from 'react';
import {Card, CardContent, CardActionArea, Button, Typography} from '@mui/material';
import Dialog from './DishEdit';


export default function DishList  (props) {

  const { dishes, url, onDelete } = props
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState();


  const handleClickOpen = (value) => {
    setSelectedCard({...value, value})
    console.log(selectedCard)
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);

  };

  const handleDelete = (data) => {
    onDelete(data);
  }

  return (
    <div>
      <p>selected card: {(typeof selectedCard !== 'undefined')? selectedCard.name:null}</p>
      <Dialog
        selectedCard={selectedCard}
        open={open}
        onClose={handleClose}
        url={url}
        />
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
    </div>

  );
}


