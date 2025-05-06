<<<<<<< HEAD
import { PrismaClient } from '~/prisma/app/generated/prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
=======
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
>>>>>>> df1469f0 (Initial commit)
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma