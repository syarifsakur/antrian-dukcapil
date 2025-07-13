import Queue from '../models/ModelQueue.js';
import { Op } from 'sequelize';

export const createQueue = async (req, res) => {
  const { nama, nik, alamat, telepon, kategori, jenis_layanan, reason } =
    req.body;
  try {
    let response;

    if (jenis_layanan !== 'pembuatan ktp') {
      response = await Queue.create({
        nama,
        nik,
        alamat,
        telepon,
        kategori,
        jenis_layanan,
        color: '#292794',
        date: new Date(),
      });
    } else {
      if (!reason) {
        return res.status(400).json({ message: 'Alasan harus ada!' });
      }
      if (
        !['perubahan data', 'rusak', 'hilang', 'luar daerah'].includes(reason)
      ) {
        return res.status(400).json({
          message:
            "Alasan harus antara 'perubahan data', 'rusak', 'hilang', 'luar daerah'",
        });
      }
      response = await Queue.create({
        nama,
        nik,
        alamat,
        telepon,
        kategori,
        jenis_layanan,
        reason,
        color: '#292794',
        date: new Date(),
      });
    }

    console.log(response.uuid);
    return res.status(201).json({
      message: 'Berhasil Menambah Antrian!',
      uuid: response.uuid,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error', error });
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
      order: [['createdAt', 'ASC']],
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
    const { count: pelayanan_kk_ktp } = await Queue.findAndCountAll({
      where: {
        jenis_layanan: 'pelayanan kartu keluarga/ktp',
      },
    });
    const { count: kia } = await Queue.findAndCountAll({
      where: {
        jenis_layanan: 'kia',
      },
    });
    const { count: skpwni } = await Queue.findAndCountAll({
      where: {
        jenis_layanan: 'skpwni',
      },
    });
    const { count: perekaman } = await Queue.findAndCountAll({
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
      pelayanan_kk_ktp,
      kia,
      skpwni,
      perekaman,
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
  if (!queue) {
    return res.status(404).json({ message: 'Antrian tidak ditemukan!' });
  }
  try {
    await queue.update({
      status,
    });

    return res
      .status(200)
      .json({ message: 'Berhasil Mengupdate Status Antrian!' });
  } catch (error) {
    console.log(error);
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
