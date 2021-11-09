import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
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
                <h1>Category</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input defaultValue="test" {...register("name", { required: true })} />
                    {errors.exampleRequired && <p>This field is required</p>}

                    <input {...register("description", { required: true })} />
                    {errors.exampleRequired && <p>This field is required</p>}

                    <input {...register("image", { required: true })} />
                    {errors.exampleRequired && <p>This field is required</p>}

                    <input value="Add category" type="submit" />
                </form>
                { error && <div>{ error }</div> }
                { isPending && <div>Loading...</div> }
                { categories && <CategoryList onDelete={handleDelete} url={url} categories={categories} /> }
            </div>
        )
    
}
