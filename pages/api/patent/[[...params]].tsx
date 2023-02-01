import { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '@/lib/database'
import { withSessionRoute } from "@/lib/withSession"

export default withSessionRoute(async (req: NextApiRequest, res: NextApiResponse) => {
    const { params } = req.query
    const {method} = req

    const usersId: any = req.session?.user?.id
    //console.log({method, id: params[0]})
    if (method === 'GET') {
        if (params === undefined || params.length === 0) {
            const patents = await prisma.patents.findMany({ where: { usersId } })
            return res.status(200).json(patents)
        } else if (params.length === 1) {
            const patent = await prisma.patents.findUnique({ where: { id: params[0].toString() }}) //, usersId: `${usersId}` } })
            return res.status(200).json(patent)
        }
    } else if (method === 'POST') {
        const body = req.body
        if (params === undefined || params.length === 0) {
            if (body.name) {
                await prisma.patents.create({ data: { name: body.name, usersId } })
                    .catch(e => console.error(e))

                return res.status(200).redirect("/patents")
            }
        } else if (params.length === 1) {
            const id = params[0].toString()
            await prisma.patents.updateMany({ data: { ...body }, where: { id, usersId } })
            return res.status(200).redirect("/patents")
        }
    } else if (method === 'DELETE' && params?.length === 1) {
        const id = params[0].toString()
        await prisma.patents.deleteMany({ where: { AND: [{id}, {usersId}] } })
        return res.status(200).redirect("/patents")
    }

    return res.status(400).redirect("/patents")
  })
