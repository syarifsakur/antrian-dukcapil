import Queue from '../models/ModelQueue.js';
import { Op } from 'sequelize';

export const createQueue = async (req, res) => {
  const { nama, nik, alamat, telepon, kategori } = req.body;
  try {
    await Queue.create({
      nama,
      nik,
      alamat,
      telepon,
      kategori,
    });

    return res.status(201).json({ message: 'Berhasil Menambah Antrian' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getQueueUmum = async (req, res) => {
  try {
    const response = await Queue.findAll({
      where: {
        kategori: 'umum',
        status: {
          [Op.or]: ['menunggu', 'proses'],
        },
      },
    });

    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getQueuePrioritas = async (req, res) => {
  try {
    const response = await Queue.findAll({
      where: {
        kategori: 'prioritas',
        status: 'menunggu',
      },
    });

    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const riwayatQueue = async (req, res) => {
  try {
    const response = await Queue.findAll({
      where: {
        status: 'selesai',
      },
    });

    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const queue = await Queue.findByPk(id);
  try {
    await queue.update({
      status,
    });

    return res
      .status(200)
      .json({ message: 'Berhasil Mengupdate Status Antrian!' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteQueue = async (req, res) => {
  try {
    const { id } = req.params;

    const queue = await Queue.findByPk(id);

    await queue.destroy();

    return res.status(200).json({ message: 'Berhasil Menghapus antrian' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
