import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loader.gif'
import axios from 'axios';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    
    const [isLoading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState('');
    let navigate = useNavigate();
    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        axios.post('http://localhost:3000/user/login', {
            userName: userName,
            password: password
           
        })
            .then(res => {
                setLoading(false);

                console.log(res.data);
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('userName',res.data.userName)
                setHasError(false);
                navigate('/dashboard');
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
                setHasError(true);
                setError(err.response.data.msg);
            })
    }
    return (
        <>
            {isLoading && <div>
                <img style={{ width: '150px' }} src={loader} />
            </div>}
            {!isLoading  && <div>

                <h1>Login</h1>
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder='username' onChange={(e) => setUserName(e.target.value)} />
                    <br />
                    <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    
                    <button type="submit">submit</button>
                </form>
            </div>}
            {hasError && <div>
                <p style={{ color: 'red' }}>Error:-{error}</p>
            </div>}
        </>
  )
}

export default Login