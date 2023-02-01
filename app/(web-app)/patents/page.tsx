import { prisma } from '../../../lib/database'
import useUser from '../../../lib/useUser'
import Link from 'next/link'
import Patent from './patent'


export default async function Page({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await useUser()
  const patents = await getPatents(user.id)
  return (
    <div>
      <h1>Patents</h1>
      <div className="flex flex-col gap-4 w-fit">
        <Link href="/patents/add" className='self-end btn-secondary hover:bg-blue-200'>Add Patent</Link>
        {patents.map(patent => <Patent key={patent.id} {...patent} />)}
      </div>
    </div>
  )
}

async function getPatents(usersId: string) {
  const patents = await prisma.patents.findMany({ where: { usersId } })
  return patents
}