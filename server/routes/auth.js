import express from 'express';
import { Login, Register } from '../controllers/Users.controller.js';

const authRoutes = express.Router();

authRoutes.post('/register', Register);

authRoutes.post('/login', Login);

export default authRoutes;
