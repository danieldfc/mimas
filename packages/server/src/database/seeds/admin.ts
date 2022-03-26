import { PrismaClient } from '@prisma/client'
import { pbkdf2Sync, randomBytes } from 'crypto'

export async function seederAdmin(prismaClient: PrismaClient) {
  const existAdmin = await prismaClient.user.findFirst({
    where: { admin: true, email: 'daniel.david772@gmail.com' }
  })

  if (!existAdmin) {
    const salt = randomBytes(10).toString('hex')
    const password = pbkdf2Sync('123456', salt, 1000, 32, `sha512`).toString(
      `hex`
    )
    await prismaClient.user.create({
      data: {
        admin: true,
        email: 'daniel.david772@gmail.com',
        nick: 'admin',
        password,
        name: 'Daniel Felizardo'
      }
    })
  }
}
