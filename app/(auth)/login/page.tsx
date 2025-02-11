import Link from "next/link"

export default function Page({ searchParams }:any) {
  const email = searchParams.email ?? ''
  const error = searchParams.error
  return (
    <div>
      <h1 className="text-red-400">Login</h1>
      <form className="flex flex-col gap-4 w-fit" method="post" action="/api/auth/login">
        <label>Email <br/>
            <input type="email" name="email" defaultValue={email} autoFocus/>
        </label>
        <label>Password <br/>
            <input type="password" name="password" />
        </label>

        {error && <div className="text-red-500">Email or Password are not correct.</div>}

        <input type="submit" value="Login" className="btn" />
      </form>
      <Link href="/signup" className="text-slate-500 underline pt-4 block">No Login? Sign up!</Link>
    </div>
  )
}