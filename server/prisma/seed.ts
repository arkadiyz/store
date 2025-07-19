import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.productType.createMany({
    data: [{ name: 'ירק' }, { name: 'פרי' }, { name: 'גידולי שדה' }],
    skipDuplicates: true,
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
