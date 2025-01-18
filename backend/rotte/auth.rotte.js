import express from 'express';
import { creaUtente, loginUtente } from '../controller/utenti.controller.js';

const router = express.Router();

router.post('/register', creaUtente );

router.post('/login', loginUtente );

export default router;