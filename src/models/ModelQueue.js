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
        'pelayanan kartu keluarga/ktp',
        'kia',
        'skpwni',
        'perekaman'
      ),
      allowNull: true,
    },
    reason: {
      type: DataTypes.ENUM('perubahan data', 'rusak', 'hilang', 'luar daerah'),
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Queue;
