import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../ProtectedRoute/AuthContext';
import styles from './adminPage.module.css';
import { RiLogoutCircleRLine } from "react-icons/ri";
import DeleteMsg from '../Deletemsg/deleteMsg';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const { logout, isAdmin } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    } else {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_FRONTEND_URL}/api/auth/admin`);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const openModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_FRONTEND_URL}/api/auth/users/${deleteId}`);
      setUsers(users.filter(user => user._id !== deleteId));
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      closeModal();
    }
  };

  const handleLogout = async () => {
    try {
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className={styles.adminContainer}>
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <>
          <div className={styles.adminHeader}>
            <h1>Admin Page</h1>
            <Link to='/login' title='Logout' onClick={handleLogout} className={styles.logoutIcon}><RiLogoutCircleRLine /></Link>
          </div>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => openModal(user._id)} className={styles.deleteButton}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <DeleteMsg show={showModal} onClose={closeModal} onConfirm={confirmDelete} />
    </div>
  );
};

export default AdminPage;
