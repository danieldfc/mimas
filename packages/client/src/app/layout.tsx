import './globals.css'
import { Poppins } from 'next/font/google'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const poppins = Poppins({ subsets: ['devanagari'], weight: '200' })

export const metadata = {
  title: 'Dacia bordados | HOME',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className}>
      <head />
      <body className="bg-white h-screen px-[96px] py-[32px]">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
