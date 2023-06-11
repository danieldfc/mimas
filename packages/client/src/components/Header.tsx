'use client'

import { ShoppingCart, User } from 'lucide-react'

import Image from "next/image";

import logoPNG from '@/assets/logo.png';
import Link from 'next/link';
// import { useEffect, useState } from 'react';

type IHeaderProps = {
  visible?: boolean
}

export default function Header({ visible = false }: IHeaderProps) {
  // const [visibleButton, setVisibleButton] = useState(false);

  // useEffect(() => {
  //     setVisibleButton(visible)
  // }, [visible])

  return (
    <header className="flex items-center justify-between border-b-gray-200 border-b-2 pb-2">

      <Link href="/"><div className="flex items-center">
        <Image src={logoPNG} alt="Dacia bordados" className="rounded-full w-14" />
        <h1 className="ml-2 font-extrabold">Dacia Bordados</h1>
      </div></Link>
      <div className="flex">
        <nav className="border-r-2 border-black">
          <a className="mt-0 mx-[64px] font-medium hover:font-extrabold" href="/shop">SHOP</a>
          <a className="mt-0 mx-[64px] font-medium hover:font-extrabold" href="/contact">CONTACT</a>
          <a className="mt-0 mr-[48px] ml-[64px] font-medium hover:font-extrabold" href="/our-story">ABOUT US</a>
        </nav>
        <aside className="flex ml-[48px]">
          {/* {visibleButton && (
            <span className="absolute right-[155px] flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )} */}
          <a href="/cart"><ShoppingCart /></a>
          <a href="/singin" className="ml-10"><User /></a>
        </aside>
      </div>
    </header>
  );
}
