import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import loader from '../assets/loader.gif'

const Detail = () => {
    const [category,setCategory]=useState({});
    const [isLoading,setLoading]=useState(false);
    const [hasError,setHasError]=useState(false);
  const[error,setError]=useState('');
    let params=useParams();

    console.log(params.id);
    useEffect(()=>{
        setLoading(true);
        
axios.get('http://www.localhost:3000/category/'+params.id)
.then(res=>{
    setLoading(false);
    setHasError(false);
  setLoading(false);
    console.log(res.data.category);
    setCategory(res.data.category);
})
.catch(err=>{
    setLoading(false);
    console.log(err);
    setHasError(true);
  setError(err.response.data.message);
})
    },[])
  return (
    <>
    {isLoading && <div>
        <img style={{width:'150px'}} src={loader}/>
      </div>} 

    {!isLoading && <div>
        <img  style={{width:'250px'}} src={category.photo}/>
        <h1>{category.name}</h1>
    </div>}
    { hasError && <div>
    <p style={{color:'red'}}>Error:-{error}</p>
    </div> }
    </>
  )
}

export default Detail