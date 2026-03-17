const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const banners = await prisma.banner.findMany();
    console.log('--- Banners ---');
    banners.forEach(b => {
      console.log(`ID: ${b.id}, Title: ${b.title}, URL: "${b.imageUrl}"`);
    });
    
    const posts = await prisma.post.findMany();
    console.log('\n--- Posts ---');
    posts.forEach(p => {
      console.log(`ID: ${p.id}, Title: ${p.title}, URLs: "${p.imageUrls}"`);
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
