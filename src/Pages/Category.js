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
                    <h1>Add categories</h1>
                </div>

                 <div className="textfield">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                    <TextField
                        id="outlined-textarea"
                        label="Name"
                        placeholder="Name"
                        multiline
                        {...register("name", { required: true })}
                    />
                    </div>
                    {errors.exampleRequired && <p>This field is required</p>}

                    <div className="textfield">
                    <TextField
                        id="outlined-textarea"
                        label="Description"
                        placeholder="Description"
                        multiline
                        {...register("description", { required: true })}
                    />
                    </div>
                    {errors.exampleRequired && <p>This field is required</p>}

                    <div className="textfield">
                    <TextField
                        id="outlined-textarea"
                        label="Image"
                        placeholder="Image"
                        multiline
                        {...register("image", { required: true })}
                    />
                    </div>
                    {errors.exampleRequired && <p>This field is required</p>}

                    <input value="Add category" type="submit" />
                </form>
                { error && <div>{ error }</div> }
                { isPending && <div>Loading...</div> }
                { categories && <CategoryList onDelete={handleDelete} url={url} categories={categories} /> }
            </div>
            </div>
        )
}
