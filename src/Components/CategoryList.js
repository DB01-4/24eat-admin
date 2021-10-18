import React from 'react';
import {Card, CardContent, CardActionArea, Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from "axios";
import Dialog from './CategoryEdit';


const CategoryList = ({ categories }) => {
  const [open, setOpen] = React.useState(false);

  const onDelete = data => 
  axios.delete(`http://localhost:8080/categories/${data.id}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {categories.map(product => (
        <div title='card' key={product.id} >
                <Card onClick={handleClickOpen} sx={{ }}>
                    <CardActionArea>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        { product.name }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        { product.description }
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            <Button onClick={() => onDelete(product)}>X</Button>
            <Dialog
        category={product}
        open={open}
        onClose={handleClose}
        />
          </div>
      ))}
    </div>
  );
}
 
export default CategoryList;