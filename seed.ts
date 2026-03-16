import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.post.deleteMany({}) // Clear existing
  await prisma.post.createMany({
    data: [
      { type: 'notice', title: '2024년 1차 소공인 특화지원사업 모집 공고', content: '공고 내용입니다.' },
      { type: 'notice', title: '홈페이지 일시 중단 안내 (서버 점검)', content: '서버 점검 예정입니다.' },
      { type: 'news', title: '파주인쇄소공인센터, 지역사회 상생 MOU 체결', content: 'MOU 체결 소식입니다.' },
      { type: 'news', title: '현판 전달식 현장 스케치', content: '현장 스케치 내용입니다.' },
    ],
  })
  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
