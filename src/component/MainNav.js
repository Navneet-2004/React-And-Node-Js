import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MainNav = () => {
  let navigate=useNavigate();
  const logoutHandler=()=>{
    localStorage.clear();
    navigate('/login');
  }
  return (
    <>
    <Link to='/dashboard/category'>Category List</Link>
    <Link to='/dashboard/add-category'>Add new Category</Link>
    <br/>
    <p>hello {localStorage.getItem('userName')}!</p>
    <button onClick={logoutHandler}>logout</button>
    </>
  )
}

export default MainNav;