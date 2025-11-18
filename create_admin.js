const { PrismaClient } = require('./lib/generated/prisma/client');
const { hashPassword } = require('./lib/auth');

const prisma = new PrismaClient();

async function main() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@example.com' }
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: await hashPassword('admin123'),
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin'
      }
    });

    console.log('Admin user created:', admin);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

main();
