import React from "react";

const categories = ['food', 'drink'];


const Edit = () => {
return (
<>
<label>Name:</label>
<input></input>
<br></br>

<label>Description:</label>
<input></input>
<br></br>

<label>Allergies:</label>
<input></input>
<br></br>

<label>Price:</label>
<input></input>
<br></br>

<label>Category:</label>
<select>
    {categories.forEach(category => {
        return (<option>{category.toString()}</option>);
    })}
</select>

<br></br>

<label>Image:</label>
<input type="file"></input>
</>
);
}

export default Edit