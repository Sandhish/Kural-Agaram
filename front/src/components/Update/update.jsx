import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import styles from './update.module.css';
import toast, { Toaster } from 'react-hot-toast';

const Update = () => {
  const { id } = useParams();
  const [kural, setKural] = useState('');
  const [kuralNo, setKuralNo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://localhost:9999/kural/${id}`, {
      headers: {
        'x-auth-token': token
      }
    })
      .then(result => {
        setKuralNo(result.data.kuralNo || '');
        setKural(result.data.kural || '');
      })
      .catch(err => console.log(err));
  }, [id, token]);

  const validateKural = (input) => {
    const words = input.trim().split(/\s+/);
    return words.length === 7 && words.slice(0, 4).length === 4 && words.slice(4).length === 3;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateKural(kural)) {
      setError('Kural must contain exactly 7 words');
      return;
    }
    setError('');

    try {
      const promise = axios.put(`http://localhost:9999/kural/${id}`, { kuralNo, kural }, {
        headers: {
          'x-auth-token': token
        }
      });

      toast.promise(promise, {
        loading: 'Updating...',
        success: 'Kural updated successfully!',
        error: 'Failed to update Kural',
      });

      await promise;

      setKural('');
      setKuralNo('');

      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  const formatKural = (input) => {
    const words = input.trim().split(/\s+/);
    if (words.length !== 7) return input;
    return `${words.slice(0, 4).join(' ')}\n${words.slice(4).join(' ')}`;
  };

  return (
    <div className={styles.updateContainer}>
      <div className={styles.updateMain}>
        <form onSubmit={handleUpdate}>
          <div className={styles.updateHeading}>
            <Link to='/home' title='Back' className={styles.backIcon}><IoMdArrowRoundBack /></Link>
            Update Kural
          </div>

          <label htmlFor="kuralNo" className={styles.createLabel}>Kural No</label>
          <input type="number" name='kuralNo' className={styles.createInput}
            onChange={(e) => setKuralNo(e.target.value)} value={kuralNo} min={1} max={1330} required />

          <label htmlFor="kural" className={styles.createLabel}>Kural</label>
          <textarea name="kural" className={`${styles.createInput} ${styles.updateInput}`}
            onChange={(e) => setKural(e.target.value)} value={formatKural(kural)} rows={'3'} cols={'50'} required />

          {error && <div className={styles.error}>{error}</div>}
          <button className={styles.createButton} type='submit'>Update</button>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Update;
