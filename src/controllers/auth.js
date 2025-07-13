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
    const user = await Admin.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'Username tidak ditemukan!' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password salah!' });
    }

    // Buat token JWT
    const token = jwt.sign(
      { userId: user.uuid },
      process.env.ACCESS_SECRET_TOKEN,
      { expiresIn: '24h' }
    );

    // Simpan token ke database (opsional)
    await Admin.update({ token }, { where: { uuid: user.uuid } });

    // Kirim response ke client
    const dataForClient = {
      userId: user.uuid,
      username: user.username,
    };

    // Kirim token via cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 jam
      secure: false, // ubah ke true kalau pakai HTTPS
    });

    return res.status(200).json({ dataForClient, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Terjadi kesalahan server.', error });
  }
};
