import { PrismaClient } from '../lib/generated/prisma/client.ts';

const prisma = new PrismaClient();

async function main() {
  try {
    // Update existing admin user to have admin role
    const user = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: { role: 'admin' },
      create: {
        email: 'admin@example.com',
        password: 'hashed_password_here',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin'
      }
    });

    console.log('✓ Admin user:', user.email, 'Role:', user.role);

    // Also create some test categories and products if they don't exist
    const categoryCount = await prisma.category.count();
    if (categoryCount === 0) {
      const categories = await prisma.category.createMany({
        data: [
          { name: 'Electronics' },
          { name: 'Fashion' },
          { name: 'Home & Garden' },
          { name: 'Sports' }
        ]
      });
      console.log('✓ Created', categories.count, 'categories');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();