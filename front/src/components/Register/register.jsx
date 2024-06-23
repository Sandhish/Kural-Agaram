import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import styles from './register.module.css';
import { useAuth } from '../ProtectedRoute/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_FRONTEND_URL}/api/auth/register`, formData);
      const res = await axios.post(`${import.meta.env.VITE_FRONTEND_URL}/api/auth/login`, { email, password });
      login(res.data.token);
      console.log('User Registered and Logged in Successfully');
      navigate('/home');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('Email is already registered. Please use a different email.');
      } else {
        setError('Registration failed. Please try again.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <div className={styles.registerMain}>
          <Link to='/' title='Home' className={styles.registerToHome}><AiFillHome /></Link>
          <h2 className={styles.registerHeading}>Register</h2>
          <form onSubmit={onSubmit} className={styles.registerForm}>
            <input type="text" name="username" value={username} onChange={onChange} className={styles.registerInput} placeholder="Username" required />
            <input type="email" name="email" value={email} onChange={onChange} className={styles.registerInput} placeholder="Email" required />
            <input type="password" name="password" value={password} onChange={onChange} className={styles.registerInput} placeholder="Password" required />
            <button type="submit" className={styles.registerButton}>Register</button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
          <Link to="/login" className={styles.loginLink}>Already have an account!</Link>
        </div>
      )}
    </div>
  );
};

export default Register;
