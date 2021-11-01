import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../Style/categories.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Category(){

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => 
    axios.post('http://localhost:8080/categories', data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        console.log(data);
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

                    <div className="btn" >
                    <Button onClick={handleSubmit(onSubmit)} variant="contained">Save</Button>
                    </div>
                    </form>
                </div>
            </div>
        )
}
