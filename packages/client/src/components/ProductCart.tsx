import { Instagram, Facebook, Linkedin } from 'lucide-react'

import Image, { StaticImageData } from 'next/image'

type IFooterProps = {
  name: string;
  price: string;
  sourceImage: string | StaticImageData;
}

export default function ProductCart({ name, price, sourceImage }: IFooterProps) {
  return (
    <li>
      <Image className="mb-2 w-72 h-72 rounded object-cover hover:scale-110 transition-all" src={sourceImage} alt="Dacia bordados" />
      <p>{name}</p>
      <small>{price}</small>
    </li>
  )
}
