import React from 'react';
import { useState } from 'react';
import {Card, CardContent, CardActionArea, Button, Typography} from '@mui/material';
import axios from "axios";
import Dialog from './CategoryEdit';


function CategoryList  ({ categories, url }) {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState();

  const handleDelete = data => 
  axios.delete(url+'/'+data.id)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
  });

  const handleClickOpen = (value) => {
    setSelectedCard({...value, value})
    console.log(selectedCard)
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <p>selected card: {(typeof selectedCard !== 'undefined')? selectedCard.name:null}</p>
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
        <Dialog
        selectedCard={selectedCard}
        open={open}
        onClose={handleClose}
        url={url}
        />
    </div>
  );
}
 
export default CategoryList;