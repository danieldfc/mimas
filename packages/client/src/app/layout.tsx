import '../styles/global.css'

import React from 'react'
import { Poppins } from '@next/font/google'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin']
})

export const metadata = {
  title: {
    default: 'Dacia Bordados',
    template: '%s | Dacia Bordados'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className}>
      <head />
      <body className="bg-[#2a0d41] bg-app">
        <main>Seja bem vindo!</main>
        {children}
      </body>
    </html>
  )
}
