import axios from 'axios';
import React, { useState } from 'react'
import pizza from '../assets/pizza.jpg'
import loader from '../assets/loader.gif'
import { useNavigate } from 'react-router-dom';
const AddCategory = () => {
  const [category,setCategory]=useState('');
  const [selectedFile,setSelectedFile]=useState(null);
  const [imageUrl,setImageUrl]=useState(pizza);
  const [isLoading,setLoading]=useState(false);
  const [hasError,setHasError]=useState(false);
  const[error,setError]=useState('');
  let navigate=useNavigate();
  const fileHandler=(e)=>{
    setSelectedFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]))
  }
  const submitHandler=(event)=>{
    event.preventDefault();
    setLoading(true);
    const formData=new FormData();
    formData.append('name',category);
    formData.append('photo',selectedFile);
    axios.post('http://www.localhost:3000/category',formData,{
      headers:{
        Authorization:'Bearer '+localStorage.getItem('token')
      }
    })
    .then(res=>{
      console.log(res);
      setLoading(false)
      navigate('/dashboard/category')
    })
    .catch(err=>{
      console.log(err.message);
      setLoading(false);
      setHasError(true);
      setError(err.message);
      
    })
  }
  return (
    <>
    {isLoading && <div>
      <img style={{width:'150px'}} src={loader}/>
    </div>}
    {!isLoading && <div>
   <h1>add new category</h1>
   <form onSubmit={submitHandler}>
    <input onChange={(e)=>{setCategory(e.target.value)}}type="text"/>
    <input onChange={(e)=>{fileHandler(e)}} type="file"/>
    <button type="submit">Submit</button><br/>
    <img style={{width:'150px'}} src={imageUrl}/>
   </form>
   </div>}
  { hasError && <div>
    <p style={{color:'red'}}>Error:-{error}</p>
    </div> }
    </>
  )
}

export default AddCategory