import React from 'react';
import { useEffect, useState } from 'react';
import {Card, CardContent, CardActionArea, Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from "axios";
import Dialog from './CategoryEdit';


const CategoryList = ({ categories }) => {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  
  useEffect(() => {
  }, [selectedCard]); // Only re-run the effect if count changes

  const handleDelete = data => 
  axios.delete(`http://localhost:8080/categories/${data.id}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
  });

  const handleClickOpen = (value) => {
    setSelectedCard(value)
    setOpen(true);
    console.log(selectedCard)
  };


  const handleClose = () => {
    setOpen(false);

  };

  return (
    <div>
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
        />
    </div>
  );
}
 
export default CategoryList;