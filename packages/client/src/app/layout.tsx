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
      <body className="bg-white h-screen flex flex-col lg:px-[96px] lg:py-[96px] md:px-5 md:py-5 px-5 py-5">
        <Header />
        {children}
        <Footer className="flex flex-1" />
      </body>
    </html>
  )
}
