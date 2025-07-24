import { PrismaClient } from '@prisma/client'
import { allLocationGarages } from './all-locations-data'

let prisma

async function main() {
  prisma = new PrismaClient()

  console.log('🌱 Starting database seeding...')

  // First create a company since all garages reference company id: 1
  console.log('📢 Creating company...')
  await prisma.company.create({
    data: {
      displayName: 'Parkify Inc.',
      description: 'Main parking company managing all garages across multiple global locations'
    }
  })
  console.log('✅ Company created successfully')

  console.log(`🏢 Seeding ${allLocationGarages.length} garages across 15 global locations...`)
  
  let createdCount = 0
  for (const garage of allLocationGarages) {
    try {
      await prisma.garage.create({
        data: garage,
      })
      createdCount++
      
      // Log progress every 10 garages
      if (createdCount % 10 === 0) {
        console.log(`📍 Created ${createdCount} garages...`)
      }
    } catch (error) {
      console.error(`❌ Error creating garage "${garage.displayName}":`, error.message)
    }
  }

  console.log(`🎉 Seeding completed! Created ${createdCount} garages successfully.`)
}

main()
  .catch((e) => {
    console.error('💥 Seeding failed:', e)
    throw e
  })
  .finally(async () => {
    console.log('🔌 Disconnecting from database...')
    await prisma.$disconnect()
  })
