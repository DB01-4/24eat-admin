import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Product(){

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => 
    axios.post('http://localhost:8080/products', data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        console.log(data);
    });

        return (
            <div>
                <h1>Dish</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input defaultValue="test" {...register("name", { required: true })} />
                    {errors.exampleRequired && <p>This field is required</p>}

                    <input {...register("description", { required: true })} />
                    {errors.exampleRequired && <p>This field is required</p>}

                    <input {...register("allergies", { required: true })} />
                    {errors.exampleRequired && <p>This field is required</p>}

                    <input type='number' {...register("price", { required: true })} />
                    {errors.exampleRequired && <p>This field is required</p>}

                    <input {...register("image", { required: true })} />
                    {errors.exampleRequired && <p>This field is required</p>}

                    <input type="submit" />
                </form>
            </div>
        )
    
}
