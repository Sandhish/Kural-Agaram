import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { IoMdSearch } from 'react-icons/io';
import { AiFillHome } from "react-icons/ai";
import axios from "axios";
import styles from './home.module.css';
import DeleteMsg from '../Deletemsg/deleteMsg';

const Home = () => {

  const [kurals, setKurals] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredKurals, setFilteredKurals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete('https://thirukkural-crud.onrender.com/kural/' + id);
      setKurals(kurals.filter(kural => kural._id !== id));
      setFilteredKurals(filteredKurals.filter(kural => kural._id !== id));
    } catch (err) {
      console.log(err);
    }
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatKural = (kural) => {
    const words = kural.trim().split(/\s+/);
    if (words.length === 7) {
      return (
        <>
          {words.slice(0, 4).join(' ')}<br />
          {words.slice(4).join(' ')}
        </>
      );
    }
    return kural;
  };

  const openModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  const confirmDelete = () => {
    handleDelete(deleteId);
    closeModal();
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
            <Link to='/' title='Home' className={styles.homeIcon}><AiFillHome /></Link>
            <p>Thirukkural</p>
            <input
              type="number"
              name="search"
              value={searchInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Kural No"
            />
            <IoMdSearch className={styles.searchIcon} onClick={handleSearch} />
            <Link to='/create' title='Add' className={styles.addIcon}><HiOutlineDocumentPlus /></Link>
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
                  filteredKurals && filteredKurals.map((kural) => (
                    <tr key={kural._id}>
                      <td>{kural.kuralNo}</td>
                      <td>{formatKural(kural.kural)}</td>
                      <td>
                        <Link to={`/update/${kural._id}`} title='Update' className={styles.updateIcon} ><GrDocumentUpdate /></Link>
                        <button className={styles.deleteIcon}
                          onClick={() => openModal(kural._id)} title='Delete'><MdDelete />
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
      <DeleteMsg
        show={showModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Home;
