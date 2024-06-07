import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { IoMdSearch } from 'react-icons/io';
import styles from './kuralList.module.css';
import { AiFillHome } from "react-icons/ai";


const Thirukkurals = () => {
    const [kurals, setKurals] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredKurals, setFilteredKurals] = useState([]);
    const [loading, setLoading] = useState(true);

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
                                </tr>
                            </thead>
                            <tbody>
                                {filteredKurals.map((kural) => (
                                    <tr key={kural.Number}>
                                        <td>{kural.Number}</td>
                                        <td>{kural.Line1}<br />{kural.Line2}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Thirukkurals;
