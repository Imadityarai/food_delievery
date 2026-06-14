import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import './Add.css'
import { assets } from '../../admin_assets/assets'
import axios from 'axios'
const Add = () => {
  const[image,setImage]=useState(false);
  const[data,setData]=useState({
    "name":"",
    "description":"",
    "category":"salad",
    "price":0,
  })
  const add_handler=(event)=>{
   const name=event.target.name;
    const val=event.target.value;
    setData(data=>({...data,[name]:val}));
  }
const submit_handler = async (event) => {
  event.preventDefault(); // stop page reload

  const formdata = new FormData();
  formdata.append("name", data.name);
  formdata.append("category", data.category);
  formdata.append("description", data.description);
  formdata.append("price", data.price);
  formdata.append("image", image); 


    const res = await axios.post("http://localhost:4000/api/food/add", formdata)
  if (res.data.success==true)
  {toast.success("food added");
    setData({
        "name":"",
    "description":"",
    "category":"salad",
    "price":0,
    });
    useState(false);
   
    
  } else{
    toast.error("error not added")
  }
  }

  return (

  <div className="add">
    <form action="" className="flex-col" onSubmit={submit_handler}>
      <div className="add-img-upload fleax-col">
        <p>Upload Image</p>
        <label htmlFor="image">
          <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
        </label>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required/>
      </div>
      <div className="add-product-name flex-col">
        <p>Product Name</p>
        <input onChange={add_handler} value={data.name}type="text" name='name'/>
      </div>
      <div className="add-product-description flex-col">
 <p>Product Description</p>
 <textarea onChange={add_handler} value={data.description} name="description" rows="6" id=""></textarea>
   </div>
   <div className="add-catogory-price">
    <div className="add-category flex-col">
      <p>Product Category</p>
      <select name="category" onChange={add_handler} value={data.category}>
        <option value="Salad">Salad</option>
         <option value="Rolls">Rolls</option>
          <option value="Desserts">Desserts</option>
           <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
             <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
      </select>
    </div>
    <div className="add-price flex-col">
      <p>Product Price</p>
      <input type="Number" name="price" onChange={add_handler} value={data.price}/>
    </div>
   </div>
   <button type='submit' className='add-btn'>Add</button>
    </form>
  </div>
  )
}

export default Add
