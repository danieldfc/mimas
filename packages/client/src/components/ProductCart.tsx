'use client'

import Image, { StaticImageData } from 'next/image'
import { useState } from 'react';

type IFooterProps = {
  name: string;
  price: string;
  sourceImage: string | StaticImageData;
}

export default function ProductCart({ name, price, sourceImage }: IFooterProps) {
  const [visibleButton, setVisibleButton] = useState(false);

  function handleSubmit(e: any) {
  }

  return (
    <li>
      <div
        className="relative hover:scale-110 transition-all"
        onMouseMove={() => setVisibleButton(true)}
        onMouseLeave={() => setVisibleButton(false)}
      >
        <Image className="w-64 h-64" src={sourceImage} alt="Dacia bordados" />
        {visibleButton && <button onClick={handleSubmit} className="absolute bottom-0 bg-slate-100 w-64 h-12 font-bold">ADD AO CARRINHO</button>}
      </div>
      <p>{name}</p>
      <small>{price}</small>
    </li>
  )
}
