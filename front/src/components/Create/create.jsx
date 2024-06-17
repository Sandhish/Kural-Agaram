import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import styles from './create.module.css';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Create = () => {
  const [kuralNo, setKuralNo] = useState('');
  const [kural, setKural] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const validateKural = (input) => {
    const words = input.trim().split(/\s+/);
    return words.length === 7;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('No token found');
      return;
    }

    if (!validateKural(kural)) {
      setError('Kural must contain exactly 7 words');
      return;
    }

    setError('');

    try {
      const response = await axios.post('http://localhost:9999/kural/',
        { kuralNo, kural },
        { headers: { 'x-auth-token': token } }
      );

      if (response.status === 201) {
        toast.success('Kural submitted successfully!');
        setKuralNo('');
        setKural('');
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        toast.error('Failed to submit Kural');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        console.error(err.response.data);
        setError(err.response.data.message);
      } else {
        setError('Failed to submit Kural');
      }
    }
  };

  const formatKural = (input) => {
    const words = input.trim().split(/\s+/);
    if (words.length !== 7) return input;
    return `${words.slice(0, 4).join(' ')}\n${words.slice(4).join(' ')}`;
  };

  return (
    <div className={styles.createContainer}>
      <div className={styles.createMain}>
        <form onSubmit={handleSubmit}>
          <div className={styles.createHeading}>
            <Link to="/home" title="Back" className={styles.backIcon}><IoMdArrowRoundBack /></Link>
            Add Kural
          </div>
          <label htmlFor="kuralNo" className={styles.createLabel}>Kural No</label>
          <input type="number" name="kuralNo" className={styles.createInput} onChange={(e) => setKuralNo(e.target.value)}
            value={kuralNo} min={0} max={1330} required />
          <label htmlFor="kural" className={styles.createLabel}>Kural</label>
          <textarea name="kural" className={`${styles.createInput} ${styles.updateInput}`} onChange={(e) => setKural(e.target.value)}
            value={formatKural(kural)} rows="3" cols="60" required/>
          {error && <div className={styles.error}>{error}</div>}
          <button className={styles.createButton} type="submit"> Submit </button>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Create;
