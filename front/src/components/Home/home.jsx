import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { IoIosExit } from "react-icons/io";
import { IoMdSearch } from 'react-icons/io';
import axios from "axios";
import styles from './home.module.css';

const Home = () => {

  const [kurals, setKurals] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredKurals, setFilteredKurals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://thirukkural-crud.onrender.com/kural/')
      .then(result => {
        setKurals(result.data);
        setFilteredKurals(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete('https://thirukkural-crud.onrender.com/kural/' + id)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const handleSearch = () => {
    const filter = kurals.filter((kural) =>
      kural.kuralNo.toString() === searchInput
    );
    setFilteredKurals(filter);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    if (inputValue === '') {
      setFilteredKurals(kurals);
    }
  };

  return (
    <div className={styles.mainContainer}>
       {loading ? (
                <div className={styles.loaderContainer}>
                    <div className={styles.spinner}></div>
                </div>
            ) : (
      <div className={styles.mainModule}>
        <div className={styles.mainHeading}>
          <p>Thirukkural</p>
          <input
            type="number"
            name="search"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="Kural No"
          />
          <IoMdSearch className={styles.searchIcon} onClick={handleSearch} />
          <Link to='/create' title='Add' className={styles.addIcon}><HiOutlineDocumentPlus /></Link>
          <Link to='/' title='Exit' className={styles.exitIcon}><IoIosExit /></Link>
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
                Array.isArray(filteredKurals) && filteredKurals.map((kural) => (
                  <tr key={kural._id}>
                    <td>{kural.kuralNo}</td>
                    <td>{kural.kural}</td>
                    <td>
                      <Link to={`/update/${kural._id}`} title='Update' className={styles.updateIcon} ><GrDocumentUpdate /></Link>
                      <button className={styles.deleteIcon}
                        onClick={(e) => handleDelete(kural._id)} title='Delete'><MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
       )}
    </div>
  );
}

export default Home;
