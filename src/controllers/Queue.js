import Queue from '../models/ModelQueue.js';
import { Op } from 'sequelize';

export const createQueue = async (req, res) => {
  const { nama, nik, alamat, telepon, kategori, jenis_layanan } = req.body;
  try {
    const response = await Queue.create({
      nama,
      nik,
      alamat,
      telepon,
      kategori,
      jenis_layanan,
    });

    return res
      .status(201)
      .json({ message: 'Berhasil Menambah Antrian', response });
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

export const getStatistikQueue = async (req, res) => {
  try {
    const { count: total_pengunjung } = await Queue.findAndCountAll();
    const { count: total_selesai } = await Queue.findAndCountAll({
      where: {
        status: 'selesai',
      },
    });
    const { count: ktp } = await Queue.findAndCountAll({
      where: {
        jenis_layanan: 'pembuatan ktp',
      },
    });
    const { count: akta_kelahiran } = await Queue.findAndCountAll({
      where: {
        jenis_layanan: 'akta kelahiran',
      },
    });
    const { count: akta_kematian } = await Queue.findAndCountAll({
      where: {
        jenis_layanan: 'akta kematian',
      },
    });
    const { count: kk } = await Queue.findAndCountAll({
      where: {
        jenis_layanan: 'pembuatan kartu keluarga',
      },
    });
    const { count: layanan_lainnya } = await Queue.findAndCountAll({
      where: {
        jenis_layanan: 'layanan lainnya',
      },
    });

    return res.status(200).json({
      total_pengunjung,
      total_selesai,
      ktp,
      akta_kelahiran,
      akta_kematian,
      kk,
      layanan_lainnya,
    });
  } catch (error) {
    console.log(error);
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
