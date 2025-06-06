import express from 'express';
import validateData from '../middlewares/validation.js';
import {
  createQueue,
  deleteQueue,
  getQueuePrioritas,
  getQueueUmum,
  getStatistikQueue,
  riwayatQueue,
  updateStatus,
} from '../controllers/Queue.js';
import { queueSchema } from '../validations/SchemaQueue.js';

const router = express.Router();

router.get('/umum', getQueueUmum);
router.get('/prioritas', getQueuePrioritas);
router.get('/riwayat', riwayatQueue);
router.get('/statistik', getStatistikQueue);
router.post('/create', validateData(queueSchema), createQueue);
router.patch('/update/:id', updateStatus);
router.delete('/delete/:id', deleteQueue);

export default router;
