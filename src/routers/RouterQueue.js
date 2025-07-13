import express from 'express';
import validateData from '../middlewares/validation.js';
import {
  createQueue,
  deleteQueue,
  getQueue,
  getQueuePrioritas,
  getQueueUmum,
  getStatistikQueue,
  riwayatQueue,
  updateStatus,
} from '../controllers/Queue.js';
import verifyToken from '../middlewares/VerifyToken.js';
import { queueSchema } from '../validations/SchemaQueue.js';

const router = express.Router();

router.get('/', getQueue);
router.get('/umum', getQueueUmum);
router.get('/prioritas', getQueuePrioritas);
router.get('/riwayat', riwayatQueue);
router.get('/statistik', getStatistikQueue);
router.post('/create', verifyToken, validateData(queueSchema), createQueue);
router.patch('/update/:id', verifyToken, updateStatus);
router.delete('/delete/:id', verifyToken, deleteQueue);

export default router;
