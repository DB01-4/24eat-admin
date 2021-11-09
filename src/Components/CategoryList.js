import React from 'react';
import { useState } from 'react';
import {Card, CardContent, CardActionArea, Button, Typography} from '@mui/material';
import Dialog from './CategoryEdit';


export default function CategoryList  (props) {

  const { categories, url, onDelete } = props
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
      {categories.map(category => (
        <div title='card' key={category.id} >
                <Card onClick={() => handleClickOpen(category)}>
                    <CardActionArea>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        { category.name }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        { category.description }
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            <Button onClick={() => handleDelete(category)}>X</Button>
          </div>
      ))}
    </div>
  );
}