import Link from 'next/link'

import {prisma} from '../../../../lib/database'
import useUser from '../../../../lib/useUser'

export default async function EditPatentPage({params}:any) {
    const {id}:{id: string} = params
    const user = await useUser()
    const patent = await getPatent(user.id, id)
    return (
        <form className="flex flex-col gap-4 w-fit" method="post" action={`/api/patent/${id}`}>
            <h2>Edit Patent</h2>
            <label>Name<br/>
                <input type="text" name="name" defaultValue={patent?.name} required autoFocus/>
            </label>
            <div className="flex flex-row-reverse gap-2">
                <input type="submit" value="Submit" className="btn" />
                <Link href="/patents" className="btn-tertiary">Cancel</Link>
            </div>
        </form>
    )
}

async function getPatent(usersId: string, id: string) {
  //console.log({useruserIdId})
  const patents = await prisma.patents.findMany({ where: { usersId, id } })
  //console.log(patents)
  return patents[0]
}