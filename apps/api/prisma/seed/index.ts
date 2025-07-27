import { PrismaClient } from '@prisma/client'
import { allLocationGarages } from './all-locations-data'

let prisma

async function main() {
  prisma = new PrismaClient()

  console.log('🌱 Starting database seeding...')
  
  // Check if seeding was already done
  const existingCompany = await prisma.company.findFirst()
  if (existingCompany) {
    console.log('🔍 Database already seeded. Clearing existing data...')
    
    // Clear existing data in the correct order (due to foreign key constraints)
    await prisma.booking.deleteMany()
    console.log('🗑️  Cleared bookings')
    
    await prisma.slot.deleteMany()
    console.log('🗑️  Cleared slots')
    
    await prisma.address.deleteMany()
    console.log('🗑️  Cleared addresses')
    
    await prisma.garage.deleteMany()
    console.log('🗑️  Cleared garages')
    
    await prisma.company.deleteMany()
    console.log('🗑️  Cleared companies')
    
    console.log('✅ Database cleared successfully')
  }

  // Create or update company
  console.log('📢 Creating company...')
  const company = await prisma.company.upsert({
    where: { id: 1 },
    update: {
      displayName: 'Parkify Inc.',
      description: 'Main parking company managing all garages across multiple global locations'
    },
    create: {
      id: 1,
      displayName: 'Parkify Inc.',
      description: 'Main parking company managing all garages across multiple global locations'
    }
  })
  console.log('✅ Company created/updated successfully')

  console.log(`🏢 Seeding ${allLocationGarages.length} garages across 15 global locations...`)
  
  let createdCount = 0
  let skippedCount = 0
  
  for (const garage of allLocationGarages) {
    try {
      // Create garage (since we cleared all data, this should work)
      await prisma.garage.create({
        data: garage,
      })
      createdCount++
      
      // Log progress every 20 garages
      if (createdCount % 20 === 0) {
        console.log(`📍 Created ${createdCount} garages...`)
      }
    } catch (error) {
      console.error(`❌ Error creating garage "${garage.displayName}":`, error.message)
      skippedCount++
    }
  }

  console.log(`🎉 Seeding completed!`)
  console.log(`✅ Created ${createdCount} garages successfully`)
  if (skippedCount > 0) {
    console.log(`⚠️  Skipped ${skippedCount} garages due to errors`)
  }
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
