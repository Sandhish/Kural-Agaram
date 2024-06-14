import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { IoMdSearch } from 'react-icons/io';
import styles from './kuralList.module.css';
import { AiFillHome } from "react-icons/ai";
import { MdOutlineViewTimeline } from "react-icons/md";
import { BsFillInfoCircleFill } from "react-icons/bs";

const Thirukkurals = () => {
    const [kurals, setKurals] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredKurals, setFilteredKurals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedMeaning, setSelectedMeaning] = useState('');

    useEffect(() => {
        axios.get('https://thirukkural-crud.onrender.com/kural/kuralList/')
            .then((result) => {
                if (result.data) {
                    setKurals(result.data);
                    setFilteredKurals(result.data);
                } else {
                    console.error('No data received');
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setLoading(false);
            });
    }, []);

    const handleSearch = () => {
        const filter = kurals.filter((kural) =>
            kural.Number.toString() === searchInput
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

    const handleViewMeaning = (meaning) => {
        setSelectedMeaning(meaning);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMeaning('');
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
                        <p>Thirukkural List</p>
                        <input
                            type="number"
                            name="search"
                            value={searchInput}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Kural No"
                        />
                        <IoMdSearch className={styles.searchIcon} onClick={handleSearch} />
                    </div>
                    <div className={styles.kuralTable}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Kural No</th>
                                    <th>Kural</th>
                                    <th>kural vilakkam</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredKurals.map((kural) => (
                                    <tr key={kural.Number}>
                                        <td>{kural.Number}</td>
                                        <td>{kural.Line1}<br />{kural.Line2}</td>
                                        <td>
                                            <BsFillInfoCircleFill title='Meaning' onClick={() => handleViewMeaning(kural.mk)} className={styles.viewIcon} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.closeButton} onClick={closeModal}>&times;</span>
                        <p>{selectedMeaning}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Thirukkurals;
