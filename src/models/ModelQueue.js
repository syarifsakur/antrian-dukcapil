import { DataTypes } from 'sequelize';
import db from '../configs/Database.js';

const Queue = db.define(
  'queue',
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nik: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telepon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kategori: {
      type: DataTypes.ENUM('prioritas', 'umum'),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('menunggu', 'proses', 'selesai'),
      allowNull: true,
      defaultValue: 'menunggu',
    },
    jenis_layanan: {
      type: DataTypes.ENUM(
        'pembuatan ktp',
        'pembuatan kartu keluarga',
        'akta kelahiran',
        'akta kematian',
        'layanan lainnya'
      ),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Queue;
