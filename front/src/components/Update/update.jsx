import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './update.module.css'

const Update = () => {
  const { id } = useParams()
  const [kural, setKural] = useState('')
  const [kuralNo, setKuralNo] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:9999/kural/${id}`)
      .then(result => {
        console.log(result.data);
        setKuralNo(result.data.setKuralNo || '');
        setKural(result.data.setKural || '');
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:9999/kural/${id}`, { kural, kuralNo })
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className={styles.updateContainer}>
      <div className={styles.updateMain}>
        <form onSubmit={handleUpdate}>
          <div className={styles.updateHeading}>Update Kural</div>
          <label htmlFor="kuralNo" className={styles.createLabel}>KuralNo</label>
          <input type="number" name='kuralNo' className={styles.createInput}
            onChange={(e) => setKuralNo(e.target.value)} value={kuralNo} />
          <label htmlFor="kural" className={styles.createLabel}>Kural</label>
          <input type="text" name='kural' className={styles.createInput}
            onChange={(e) => setKural(e.target.value)} value={kural} />
          <button className={styles.createButton} type='submit'>submit</button>
        </form>
      </div>
    </div>
  )
}

export default Update;
