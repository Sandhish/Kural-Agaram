import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from './create.module.css'

const Create = () => {
  const [kural, setKural] = useState('');
  const [kuralNo, setKuralNo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateKural = (input) => {
    const words = input.trim().split(/\s+/);
    return words.length === 7 && words.slice(0, 4).length === 4 && words.slice(4).length === 3;
  };

  const Submit = async (e) => {
    e.preventDefault();
    if (!validateKural(kural)) {
      setError('Kural must contain exactly 7 words');
      return;
    }
    setError('');
    await axios.post("https://thirukkural-crud.onrender.com/kural/", { kural, kuralNo })
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
    <div className={styles.createContainer}>
      <div className={styles.createMain}>
        <form onSubmit={Submit}>
          <div className={styles.createHeading}>
            <Link to='/home' title='Back' className={styles.backIcon} ><IoMdArrowRoundBack /></Link>
            Add Kural
          </div>
          <label htmlFor="kuralNo" className={styles.createLabel}>Kural No</label>
          <input type="number" name='kuralNo' className={styles.createInput}
            onChange={(e) => setKuralNo(e.target.value)} value={kuralNo} min={1} max={1330} required/>
          <label htmlFor="kural" className={styles.createLabel}>Kural</label>
          <textarea name="kural" className={`${styles.createInput} ${styles.updateInput}`}
            onChange={(e) => setKural(e.target.value)} value={formatKural(kural)} rows='3' cols='60' required/>
          {error && <div className={styles.error}>{error}</div>}
          <button className={styles.createButton} type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
