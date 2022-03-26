import { logger } from '../src/config'
import { prismaClient } from '../src/database'
import { seederAdmin } from '../src/database/seeds'

async function main() {
  await Promise.all([seederAdmin(prismaClient)])
}

main()
  .catch(e => {
    logger.error(e.message)
    process.exit(1)
  })
  .finally(async () => {
    await prismaClient.$disconnect()
  })
