
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/database"
import { hashPassword } from "@/lib/password";
import { withSessionRoute } from "@/lib/withSession";


export default withSessionRoute(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body
  const hashedPassword = await hashPassword(password)
  await prisma.users.create({data: {email, password: hashedPassword}})
  req.session.user = {email, isLoggedIn: true}
  await req.session.save()

  return res.status(200).redirect("/")
})
