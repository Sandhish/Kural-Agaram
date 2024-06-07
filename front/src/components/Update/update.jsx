import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import styles from './update.module.css';

const Update = () => {
  const { id } = useParams();
  const [kural, setKural] = useState('');
  const [kuralNo, setKuralNo] = useState('');
  const [error, setError] = useState(''); // Added error state
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://thirukkural-crud.onrender.com/kural/${id}`)
      .then(result => {
        console.log(result.data);
        setKuralNo(result.data.kuralNo || '');
        setKural(result.data.kural || '');
      })
      .catch(err => console.log(err));
  }, [id]);

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
    await axios.put(`https://thirukkural-crud.onrender.com/kural/${id}`, { kural, kuralNo })
      .then(result => {
        console.log(result);
        setKural('');
        setKuralNo('');
        navigate('/home');
      })
      .catch(err => console.log(err));
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

          <label htmlFor="kuralNo" className={styles.createLabel}>KuralNo</label>
          <input type="number" name='kuralNo' className={styles.createInput}
            onChange={(e) => setKuralNo(e.target.value)} value={kuralNo} min={1} max={1330} required/>

          <label htmlFor="kural" className={styles.createLabel}>Kural</label>
          <textarea name="kural" className={`${styles.createInput} ${styles.updateInput}`}
            onChange={(e) => setKural(e.target.value)} value={formatKural(kural)} rows={'3'} cols={'50'} required/>

          {error && <div className={styles.error}>{error}</div>}
          <button className={styles.createButton} type='submit'>submit</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
