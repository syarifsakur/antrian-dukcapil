import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1, 'Inputan tidak boleh kosong!'),
  password: z.string().nonempty({ message: 'Inputan tidak boleh kosong!' }),
});

const passwordRequirements = z
  .string()
  .min(8, 'Password minimal 8 karakter')
  .nonempty('Inputan tidak boleh kosong')
  .refine((val) => /[A-Z]/.test(val), {
    message: 'Password harus mengandung huruf besar',
  })
  .refine((val) => /[a-z]/.test(val), {
    message: 'Password harus mengandung huruf kecil',
  })
  .refine((val) => /\d/.test(val), {
    message: 'Password harus mengandung angka',
  })
  .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
    message: 'Password harus mengandung karakter khusus',
  });

export { loginSchema,passwordRequirements };
