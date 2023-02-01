import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@/lib/withSession";

export default withSessionRoute(async (req: NextApiRequest , res:NextApiResponse ) => {
    req.session.destroy()
    return res.status(200).send("OK")
})
