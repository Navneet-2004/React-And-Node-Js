import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loader.gif'
import axios from 'axios';
const Signup = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState('');
    let navigate = useNavigate();
    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        axios.post('http://localhost:3000/user/signup', {
            userName: userName,
            password: password,
            email: email,
            phone: phone
        })
            .then(res => {
                setLoading(false);

                console.log(res.data);
                setHasError(false);
                navigate('/login');
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
                setHasError(true);
                setError(err.message);
            })
    }
    return (
        <>
            {isLoading && <div>
                <img style={{ width: '150px' }} src={loader} />
            </div>}
            {!isLoading  && <div>

                <h1>Create account</h1>
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder='username' onChange={(e) => setUserName(e.target.value)} />
                    <br />
                    <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <input type="text" autoComplete='off' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <input type="number" placeholder='phone' onChange={(e) => setPhone(e.target.value)} />
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

export default Signup