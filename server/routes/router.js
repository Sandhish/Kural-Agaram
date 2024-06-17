import express from 'express';
import { ThirukkuralIndex, ThirukkuralAdd, ThirukkuralDetails, ThirukkuralDelete, ThirukkuralUpdate, ThirukkuralList } from '../controllers/kural.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/kuralList', ThirukkuralList);

router.get("/", authMiddleware, ThirukkuralIndex);

router.get('/:id', authMiddleware, ThirukkuralDetails);

router.post("/", authMiddleware, ThirukkuralAdd);

router.put('/:id', authMiddleware, ThirukkuralUpdate);

router.delete('/:id', authMiddleware, ThirukkuralDelete);

export default router;
