import { PrismaClient } from '@prisma/client';
import argon2 from "argon2";

const prisma = new PrismaClient()

async function main() {
    const password = await argon2.hash("noah")
    const user = await prisma.users.upsert({
        where: {email: "noah@noah.com" },
        update: {email: "noah@noah.com", password},
        create: {email: "noah@noah.com", password},
    })
    const patent_1 = await prisma.patents.create({data: {name: "Patent 1", usersId: user.id}})
    const patent_2 = await prisma.patents.create({data: {name: "Patent 2", usersId: user.id}})
    console.log({patent_1, patent_2})
}

main()
.then(async () => {prisma.$disconnect()})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})