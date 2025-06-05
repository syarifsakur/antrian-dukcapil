import express from 'express';
import validateData from '../middlewares/validation.js';
import {
  createQueue,
  deleteQueue,
  getQueuePrioritas,
  getQueueUmum,
} from '../controllers/Queue.js';
import { queueSchema } from '../validations/SchemaQueue.js';

const router = express.Router();

router.get('/umum', getQueueUmum);
router.get('/prioritas', getQueuePrioritas);
router.post('/create', validateData(queueSchema), createQueue);
router.delete('/delete/:id', deleteQueue);

export default router;
