import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdOutlineDeleteSweep } from "react-icons/md";
import axios from "axios";
import styles from './main.module.css';

const Main = () => {

  const [kurals, setKurals] = useState([])

  useEffect(() => {
    axios.get('http://localhost:9999/kural/')
      .then(result => setKurals(result.data))
      .catch(err => console.log(err))
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:9999/kural/' + id)
      .then(res => {
        console.log(res);
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainModule}>
        <div className={styles.mainHeading}>
          Thirukkural
          <Link to='/create' className={styles.addIcon}><HiOutlineDocumentPlus /></Link>
        </div>
        <div className={styles.kuralTable}>
          <table>
            <thead>
              <tr>
                <th>Kural No</th>
                <th>Kural</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                Array.isArray(kurals) && kurals.map((kural) => (
                  <tr key={kural._id}>
                    <td>{kural.kuralNo}</td>
                    <td>{kural.kural}</td>
                    <td>
                      <Link to={'/update/${kural._id}'} className={styles.updateIcon}><GrDocumentUpdate /></Link>
                      <button className={styles.deleteIcon}
                        onClick={(e) => handleDelete(kural._id)}><MdOutlineDeleteSweep />
                      </button>
                    </td>
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

export default Main;
