const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const posts = await prisma.post.findMany();
    console.log(`Checking ${posts.length} posts...`);
    
    let fixCount = 0;
    for (const post of posts) {
      if (!post.imageUrls) continue;
      
      try {
        const firstParse = JSON.parse(post.imageUrls);
        if (typeof firstParse === 'string') {
          // Double stringified! e.g. "\"url\"" or "[\"url\"]"
          console.log(`Fixing post ID ${post.id}: ${post.title}`);
          const secondParse = JSON.parse(firstParse);
          
          await prisma.post.update({
            where: { id: post.id },
            data: {
              imageUrls: JSON.stringify(secondParse)
            }
          });
          fixCount++;
        }
      } catch (e) {
        // Not a standard JSON string or other error, skip
      }
    }
    
    console.log(`Successfully fixed ${fixCount} posts.`);
  } catch (error) {
    console.error('Recovery failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
