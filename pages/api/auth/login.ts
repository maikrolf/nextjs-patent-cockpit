import { withSessionRoute } from "@/lib/withSession";
import { prisma } from "@/lib/database";
import { verifyPassword } from "@/lib/password";
import { NextApiRequest, NextApiResponse } from "next";


export default withSessionRoute(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body
  const user = await prisma.users.findUnique({ where: {email}})
  if ( !user ) return
  const verified = await verifyPassword(password, user.password)
  if (!user || !verified) {
    res.status(401).redirect(`/login?email=${email}&error=Unauthorized`)
    return;
  }
  // Ensure that password is removed
  req.session.user = {...user, password: undefined, isLoggedIn: true}
  await req.session.save()

  return res.status(200).redirect("/")
})
