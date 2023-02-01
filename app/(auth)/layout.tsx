import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import "../../styles/globals.css"

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body>
        <main className='bg-blue-600 min-h-screen flex flex-col items-center'>
          <div className="flex flex-row items-center gap-12 p-4">
            <Link href="https://patent-cockpit.com" className='flex flex-row items-center gap-4 font-medium'>
              <Image
                src="/favicon.svg"
                alt='Patent Cockpit logo'
                width={48}
                height={48}
                priority
              />
              <span>
                Patent Cockpit rrr
              </span>
            </Link>
          </div>
          <div className='p-4 w-fit bg-white rounded-lg'>
          </div>
            {children}
        </main>
      </body>
    </html>
  )
}
