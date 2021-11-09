import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../Style/categories.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useFetch from "../API/useFetch";
import CategoryList from '../Components/CategoryList';

export default function Category(){

    const url  = "http://localhost:8080/categories/"

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data: categories, error, isPending } = useFetch(url);
    
    const onSubmit = newCategory => 
    axios.post(url, newCategory)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
    });

    const handleDelete = data => 
    axios.delete(url+data.id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
    });

        return (
            <div>
                <div>
                    <h1>Edit or delete categories</h1>
                </div>

                { error && <div>{ error }</div> }
                { isPending && <div>Loading...</div> }
                { categories && <CategoryList onDelete={handleDelete} url={url} categories={categories} /> }
            </div>
        )
}
