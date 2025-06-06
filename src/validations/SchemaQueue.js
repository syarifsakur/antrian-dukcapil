import { z } from 'zod';

const queueSchema = z.object({
  nama: z.string().min(1, { message: 'Nama harus diisi' }),
  nik: z.string().length(16, { message: 'NIK harus terdiri dari 16 karakter' }),
  alamat: z.string().min(1, { message: 'Alamat harus diisi' }),
  telepon: z.string().min(1, 'NO HP Harus di isi!'),
  kategori: z.enum(['prioritas', 'umum'], {
    message: "Kategori harus 'prioritas' atau 'umum'",
  }),
});

export { queueSchema };
