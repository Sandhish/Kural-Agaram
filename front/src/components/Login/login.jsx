import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import styles from './login.module.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:9999/api/auth/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            console.log('Login successful');
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Link to='/' title='Home' className={styles.homeIcon}><AiFillHome /></Link>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <Link to='/register'>Register</Link>
        </div>
    );
};

export default Login;
