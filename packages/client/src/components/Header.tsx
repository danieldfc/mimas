import { ShoppingCart, User } from 'lucide-react'

import Image from "next/image";

import logoPNG from '@/assets/logo.png';

type IHeaderProps = {}

export default function Header(_props: IHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b-gray-200 border-b-2 pb-2">
      <div className="flex items-center">
        <Image src={logoPNG} alt="Dacia bordados" className="rounded-full w-14" />
        <h1 className="ml-2 font-extrabold">Dacia Bordados</h1>
      </div>
      <div className="flex">
        <nav className="border-r-2 border-black">
          <a className="mt-0 mx-[64px] font-medium hover:font-extrabold" href="/shop">SHOP</a>
          <a className="mt-0 mx-[64px] font-medium hover:font-extrabold" href="/contact">CONTACT</a>
          <a className="mt-0 mr-[48px] ml-[64px] font-medium hover:font-extrabold" href="/our-story">ABOUT US</a>
        </nav>
        <aside className="flex ml-[48px]">
          <a href="/cart"><ShoppingCart /></a>
          <a href="/singin" className="ml-10"><User /></a>
        </aside>
      </div>
    </header>
  );
}
