import { Prisma, PrismaClient } from '@prisma/client'
import universityData from './university-data.json'

const prisma = new PrismaClient()

const universities: Prisma.UniversityCreateInput[] = universityData.map((u) => ({
  name: u.name,
  country: u.country,
  stateProvince: u['state-province'],
  website: u.web_pages?.[0],
}))

async function main() {
  console.log('Start seeding ...')

  await prisma.university.createMany({
    data: universities,
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
