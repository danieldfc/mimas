import { PrismaClient } from '@prisma/client'

export async function seederAdmin(prismaClient: PrismaClient) {
  const existAdmin = await prismaClient.user.findFirst({
    where: { admin: true, email: 'daniel.david772@gmail.com' }
  })

  if (!existAdmin) {
    return {
      admin: true,
      email: 'daniel.david772@gmail.com',
      nick: 'admin',
      name: 'Daniel Felizardo'
    }
  }
}
