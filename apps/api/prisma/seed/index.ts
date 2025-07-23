import { PrismaClient } from '@prisma/client'
import { garages } from './data'

let prisma

async function main() {
  prisma = new PrismaClient()

  // First create a company since all garages reference company id: 1
  await prisma.company.create({
    data: {
      displayName: 'Parkify Inc.',
      description: 'Main parking company managing all garages'
    }
  })

  for (const garage of garages) {
    await prisma.garage.create({
      data: garage,
    })
  }
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
