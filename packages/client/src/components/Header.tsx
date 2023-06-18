import { ShoppingCart, User } from 'lucide-react'

import Image from 'next/image'

import logoPNG from '@/assets/logo.png'
import Link from 'next/link'

export default function Header() {
  const routes = [
    { label: 'SHOP', url: '/shop' },
    { label: 'CONTACT', url: '/contact' },
    { label: 'ABOUT US', url: '/our-story' }
  ]

  return (
    <header className="py-3 lg:py-0 mb-14 lg:mb-0">
      <nav className="fixed top-0 left-0 w-full shadow py-3 flex items-center justify-between">
        <div className="container m-auto flex justify-between items-center">
          <Link className="flex items-center" href="/">
            <Image
              src={logoPNG}
              alt="Dacia bordados"
              className="rounded-full w-14"
            />
            <h1 className="ml-2 font-extrabold">Dacia Bordados</h1>
          </Link>

          <ul className="hidden md:flex items-center pr-10 text-base font-medium">
            {routes.map(route => (
              <li key={route.url} className="hover:font-semibold py-4 px-6">
                <a href={route.url}>{route.label}</a>
              </li>
            ))}
          </ul>

          <aside className="hidden md:flex">
            <a className="relative" href="/cart">
              <ShoppingCart />
              <span className="absolute -top-1 left-4 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </a>
            <a href="/singin" className="ml-10">
              <User />
            </a>
          </aside>

          <button className="block md:hidden py-3 px-4 mx-2 rounded focus:outline-none border-2 group">
            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
            <div className="w-5 h-1 bg-gray-600"></div>
            <div
              className="absolute top-0 right-0 h-screen opacity-0 w-8/12 bg-white border transform
              group-focus:right-0 group-focus:opacity-100 transition-all duration-300"
            >
              <ul className="flex flex-col justify-center w-full text-base pt-10">
                <li className="hover:font-semibold py-4 px-6 w-full">
                  <Link href="/cart">Carrinho</Link>
                </li>
                <li className="hover:font-semibold py-4 px-6 w-full">
                  <Link href="/singin">Logar</Link>
                </li>
                {routes.map(route => (
                  <li
                    key={route.url}
                    className="hover:font-semibold py-4 px-6 w-full"
                  >
                    <Link href={route.url}>{route.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </button>
        </div>
      </nav>
    </header>
  )
}
