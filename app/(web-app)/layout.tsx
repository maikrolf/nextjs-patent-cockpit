import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import useUser from '../../lib/useUser'
import '../../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {isLoggedIn, email} = await useUser()

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent head.jsx. 
        Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <main className={inter.className + ' min-h-screen'}>
          <div className="flex flex-col p-10 sm:flex-row sm:items-center gap-10 sm:gap-12 bg-blue-700">
            <Link href="/" className='flex flex-row items-center gap-10 font-medium'>
              <Image
                src="/favicon.svg"
                alt='Patent Cockpit logo'
                width={48}
                height={48}
                priority
              />
              <span>
                Patent Cockpit ddd
              </span>
            </Link>
            {isLoggedIn
              ? <>
                  <Link className='font-medium gap-10 ' href="/patents" > Patents</Link >
                  <Link href="/signout" className='sm:ml-auto font-medium'>{email}</Link>
                </>
              : <Link className='sm:ml-auto font-medium gap-10 ' href="/login">Login</Link>
            }
          </div>
          <div className='p-4'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
