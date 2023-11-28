import { faker } from '@faker-js/faker'
import { prisma } from '../src/app/lib/database'

async function seedData() {
  await prisma.sensorsData.deleteMany()

  for (let i = 0; i < 240; i++) {
    const tds = faker.number.int({ min: 100, max: 500 }).toString()
    const ph = faker.number.int({ min: 1, max: 14 }).toString()

    const createdAt = new Date('2023-10-14T00:00:00')
    createdAt.setHours(createdAt.getHours() + i * 1) // Acrescentar 30 minutos para cada iteração

    await prisma.sensorsData.create({
      data: {
        tds,
        ph,
        measuredIn: createdAt,
      },
    })
  }
}

seedData()
  .then(() => {
    console.log('Dados inseridos com sucesso.')
  })
  .catch((error) => {
    console.error('Erro ao inserir dados:', error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
