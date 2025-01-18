import express from 'express';
import auth from '../middleware/auth.middleware.js';
import { aggiornaTask, cercaTask, creaTask, eliminaTask } from '../controller/task.controller.js';

const router = express.Router();

router.get('/', auth, cercaTask );

router.post('/', auth, creaTask );

router.put('/:id', auth, aggiornaTask );

router.delete('/:id', auth, eliminaTask);

export default router;