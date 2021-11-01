import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useFetch from "../API/useFetch";
import DishList from '../Components/DishList';

export default function Dish(){

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data: dishes, error, isPending } = useFetch("http://localhost:8080/products");
    
    const onSubmit = newDish => 
    axios.post('http://localhost:8080/products', newDish)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
    });

        return (
            <div>
                <h1>Dishes</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name", { required: true })} />
                    {errors.exampleRequired && <p>This field is required</p>}

                    <input {...register("description", { required: true })} />
                    {errors.exampleRequired && <p>This field is required</p>}

                    <input {...register("allergies", { required: true })} />
                    {errors.exampleRequired && <p>This field is required</p>}

                    <input type="number" {...register("price", { required: true })} />
                    {errors.exampleRequired && <p>This field is required</p>}

                    <input {...register("image", { required: true })} />
                    {errors.exampleRequired && <p>This field is required</p>}

                    <input value="Add Dish" type="submit" />
                </form>
                { error && <div>{ error }</div> }
                { isPending && <div>Loading...</div> }
                { dishes && <DishList dishes={dishes} /> }
            </div>
        )
    
}