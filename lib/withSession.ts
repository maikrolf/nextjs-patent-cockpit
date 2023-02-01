import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { GetServerSidePropsResult, NextApiHandler } from "next";
import { ironConfig } from "./config";

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, ironConfig);
}

// export function withSessionSsr(handler: NextApiHandler) {
//   return withIronSessionSsr(handler, ironConfig);
// }

export const withSessionSsr = <
  P extends {
    [key: string]: unknown;
  } = {
    [key: string]: unknown;
  }
>(
  handler: () =>
    | GetServerSidePropsResult<P>
    | Promise<GetServerSidePropsResult<P>>
) => withIronSessionSsr(handler, ironConfig);