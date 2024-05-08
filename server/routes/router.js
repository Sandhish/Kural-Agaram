import { ThirukkuralIndex, ThirukkuralAdd, ThirukkuralDetails, ThirukkuralDelete, ThirukkuralUpdate } from '../controllers/kural.controller.js'
import express from 'express'

const router = express.Router();

router.get("/",ThirukkuralIndex);

router.get('/:id',ThirukkuralDetails);

router.post("/",ThirukkuralAdd);

router.put('/:id',ThirukkuralUpdate);

router.delete('/:id',ThirukkuralDelete);

export default router