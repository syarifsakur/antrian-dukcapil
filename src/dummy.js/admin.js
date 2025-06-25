import Admin from '../models/ModelAdmin.js';
import bcrypt from 'bcrypt';

const seedAdminData = async () => {
  const existingAdmin = await Admin.findOne({ where: { username: 'admin' } });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await Admin.create({
      username: 'admin',
      password: hashedPassword,
    });
    console.log('Admin data seeded');
  } else {
    console.log('Admin data already exists');
  }
};

export default seedAdminData;
