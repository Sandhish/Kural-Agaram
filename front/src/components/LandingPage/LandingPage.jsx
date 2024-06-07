import React, { useState, useEffect } from 'react';
import styles from './landingPage.module.css';
import { Link } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';

const LandingPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className={styles.loading}>
                <Bars
                    height="30"
                    width="80"
                    color="#3498db"
                    ariaLabel="bars-loading"
                    visible={true}
                />
            </div>
        );
    }

    return (
        <div className={styles.landingMain}>
            <div className={styles.landingImg}>
                <img src="https://2.bp.blogspot.com/-KSrLdmsJmIA/Wm_SntHrIFI/AAAAAAAATuE/G0M78xA35w4CIGBUBt0SPcOr_dsA3iZRACLcBGAs/s1600/bc3f9756135fcd4155782ebacb255e83--literature-books-classic.jpg" alt="Thiruvalluvar" />
            </div>
            <div className={styles.navLinks}>
                <Link to="/kuralList" className={styles.allKural}>View All Kurals</Link>
                <Link to="/home" className={styles.myKurals}>My List</Link>
            </div>
        </div>
    );
};

export default LandingPage;
