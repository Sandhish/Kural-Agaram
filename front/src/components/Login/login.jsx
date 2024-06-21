import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import styles from './login.module.css';
import { useAuth } from '../ProtectedRoute/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_FRONTEND_URL}/api/auth/login`, { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            login(token);
            setLoading(false);
            console.log('Logged in successfully');
            navigate('/home');
        } catch (error) {
            console.error(error);
            setError('Login failed. Please check your email and password and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Link to='/' title='Home' className={styles.homeIcon}><AiFillHome /></Link>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required disabled={loading} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required disabled={loading} />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            <Link to='/register'>Register</Link>
        </div>
    );
};

export default Login;
