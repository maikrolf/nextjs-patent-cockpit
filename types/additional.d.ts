import * as IronSession from "iron-session"

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id?: string
      admin?: boolean
      isLoggedIn: boolean
      password?: string | undefined
      email?: string
    }
  }
}
