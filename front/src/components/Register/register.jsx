import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import styles from './register.module.css'

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9999/api/auth/register', formData);
      const res = await axios.post('http://localhost:9999/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      console.log('User registered and logged in');
      navigate('/home');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Link to='/' title='Home' className={styles.homeIcon}><AiFillHome /></Link>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
        <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;
