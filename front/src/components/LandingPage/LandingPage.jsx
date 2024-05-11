import styles from './LandingPage.module.css'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";

const LandingPage = () => {
  const [kurals, setKurals] = useState([])

  useEffect(() => {
    axios.get('http://localhost:9999/kural/')
      .then(result => setKurals(result.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainModule}>
        <div className={styles.mainHeading}>
          <p>Thirukkural List</p>
          {/* <input type="text" name="search" className={styles.searchIcon} /> <IoMdSearch /> */}
          <Link to='/home' title='Edit' className={styles.addIcon}><FaEdit/></Link>
        </div>
        <div className={styles.kuralTable}>
          <table>
            <thead>
              <tr>
                <th>Kural No</th>
                <th>Kural</th>
              </tr>
            </thead>
            <tbody>
              {
                Array.isArray(kurals) && kurals.map((kural) => (
                  <tr key={kural._id}>
                    <td>{kural.kuralNo}</td>
                    <td>{kural.kural}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LandingPage