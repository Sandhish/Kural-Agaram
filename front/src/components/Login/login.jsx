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
        setError('');
        setLoading(true);

        const adminEmail = `${import.meta.env.VITE_ADMIN_EMAIL}`;
        const adminPassword = `${import.meta.env.VITE_ADMIN_PASSWORD}`;

        if (email === adminEmail && password === adminPassword) {
            login('admin-token', true);
            navigate('/admin');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_FRONTEND_URL}/api/auth/login`, { email, password });
            const { token } = response.data;
            login(token);
            navigate('/home');
        } catch (error) {
            console.error(error);
            setError('Login failed. Please check your email and password and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            {loading ? (
                <div className={styles.loaderContainer}>
                    <div className={styles.spinner}></div>
                </div>
            ) : (
                <div className={styles.loginMain}>
                    <Link to='/' title='Home' className={styles.loginToHome}><AiFillHome /></Link>
                    <h1 className={styles.loginHeading}>Login</h1>
                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className={styles.loginInput} />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className={styles.loginInput} />
                        <button type="submit" className={styles.loginButton}>Login</button>
                    </form>
                    {error && <p className={styles.error}>{error}</p>}
                    <Link to='/register' className={styles.registerLink}>Don't have an account?</Link>
                </div>
            )}
        </div>
    );
};

export default Login;
