import jwt from 'jsonwebtoken';
import Admin from '../models/ModelAdmin.js';

const user = {
  id: '9f1b5c2e-67a3-4b31-b62e-5903dcb2a9c1',
  username: 'admin',
  password: 'admin123',
};
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
      return res.status(401).json({ message: 'Token not found!' });

    const token = authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token not found!' });

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, async (err, decoded) => {
      if (err) {
        res.clearCookie('token');
        return res
          .status(403)
          .json({ message: 'Invalid token or expired token' });
      }

      req.userId = decoded.userId;

      next();
    });
  } catch (error) {
    console.error('Kesalahan Verivy Token:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default verifyToken;
