import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import createModel from './models/ModelAdmin.js';

// Functions
import db from './configs/Database.js';
import RouteQueue from './routers/RouterQueue.js';
import RouteAuth from './routers/RouterAuth.js';

dotenv.config();

const app = express();

try {
  await db.authenticate();
  console.log('Database connected');
  // await db.sync({ alter: true });
  // createModel.sync({ alter: true });
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173/'],
  })
);

app.use(cookieParser());

// End Point Api
app.use('/queue', RouteQueue);
app.use('/auth', RouteAuth);

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'welcome to my app' });
});
app.listen(3000, () => {
  console.log('server running at port 3000....');
});
