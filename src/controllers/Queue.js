import Queue from '../models/ModelQueue.js';

export const createQueue = async (req, res) => {
  const { nama, nik, alamat, telepon, status } = req.body;
  try {
    await Queue.create({
      nama,
      nik,
      alamat,
      telepon,
      status,
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
        status: 'umum',
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
        status: 'prioritas',
      },
    });

    return res.status(200).json({ response });
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
