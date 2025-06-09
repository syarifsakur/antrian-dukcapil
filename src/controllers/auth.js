import jwt from 'jsonwebtoken';
import Admin from '../models/ModelAdmin.js';
import bcrypt from 'bcryptjs';

export const Register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await Admin.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'Berhasil membuat akun!' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Admin.findOne({
      where: { username },
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ password: 'Password anda salah!' });

    const token = jwt.sign(
      { userId: user.uuid },
      process.env.ACCESS_SECRET_TOKEN,
      { expiresIn: '24h' }
    );

    await Admin.update({ token }, { where: { uuid: user.uuid } });

    const dataForClient = {
      userId: user.uuid,
      username: user.username,
    };

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: false, // if https then true
    });

    return res.status(200).json({ dataForClient, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};
