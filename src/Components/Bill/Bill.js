import React from "react";
import { useEffect, useState} from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {Dialog, DialogActions, DialogTitle, Button, TextField, Select, InputLabel, MenuItem, Switch} from '@mui/material';
import useFetch from "../../API/useFetch";
import "../../Style/FormEdit.css";

export default function DishEdit(props) {

  const initialFValues = {
    tableId: '',
    orderItems: []
    }

  const { onClose, selectedBill, open } = props;
  const [values, setValues] = useState(initialFValues);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (selectedBill != null) setValues({ ...selectedBill });
    console.log(values);
  }, [selectedBill]);


  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for(const product of values.orderItems) {
      totalPrice += (product.quantity * product.product.price)
    }
    return totalPrice
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth fullHeight>
      <DialogTitle style={{margin: "0 auto"}}>Bill details</DialogTitle>
        <div style={{marginLeft: "10%"}}>
        <h2>Table nr: {values.tableId}</h2>
        </div>
        {values.orderItems != null? 
        values.orderItems.map(product => {
          return(
          <div style={{margin: "0 auto"}}>
          <h2>{product.quantity} x {product.product.name} €{(product.quantity * product.product.price)}</h2>
          </div>
        )})
        :
        <div style={{margin: "0 auto"}}>
        <h2>No products</h2>
        </div>}

        <div style={{marginLeft: "60%"}}>
        <h2>Total price: €{calculateTotalPrice()}</h2>
        </div>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
    </Dialog>
  );
}

DishEdit.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};