import express from 'express';
import { Login, Register, deleteUser, getAllUsers } from '../controllers/Users.controller.js';

const authRoutes = express.Router();

authRoutes.post('/register', Register);

authRoutes.post('/login', Login);

authRoutes.get('/admin', getAllUsers);

authRoutes.delete('/users/:id', deleteUser);

export default authRoutes;
