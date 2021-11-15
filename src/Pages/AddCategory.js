import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../Style/categories.css";
import TextField from '@mui/material/TextField';
import useFetch from "../API/useFetch";

export default function AddCategory(){

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
                  <h1 className="title">Add categories</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                    <TextField
                        id="outlined-textarea"
                        label="Name"
                        placeholder="Name"
                        multiline
                        {...register("name", { required: true })}
                    />
                    </div>
                    {errors.exampleRequired && <p>This field is required</p>}

                    <div className="field">
                    <TextField
                        id="outlined-textarea"
                        label="Description"
                        placeholder="Description"
                        multiline
                        {...register("description", { required: true })}
                    />
                    </div>
                    {errors.exampleRequired && <p>This field is required</p>}

                    <div className="field">
                    <TextField
                        id="outlined-textarea"
                        label="Image"
                        placeholder="Image"
                        multiline
                        {...register("image", { required: true })}
                    />
                    </div>
                    {errors.exampleRequired && <p>This field is required</p>}

                    <div className="inputbtn">
                    <input value="Add category" type="submit" />
                    </div>
                    </form>
              </div>
        )
}
