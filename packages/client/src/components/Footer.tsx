import { Facebook, Instagram } from 'lucide-react'

import whatsappIcon from '@/assets/whatsapp.svg'
import Image from 'next/image'

type IFooterProps = {
  className: string
}

export default function Footer(_props: IFooterProps) {
  return (
    <footer className={`pb-10 border-white`}>
      <div className="flex my-12 gap-12">
        <a href="#" className="hover:font-bold">
          CONTACT
        </a>
        <a href="#" className="hover:font-bold">
          TERMS OF SERVICES
        </a>
        <a href="#" className="hover:font-bold">
          SHIPPING AND RETURNS
        </a>
      </div>
      <div className="flex justify-between">
        <p>
          &copy;&nbsp;
          <strong className="font-bold">2023 Dacia Bordados.</strong>&nbsp;
          Terms of use&nbsp;
          <strong className="font-bold">and</strong> privacy policy.
        </p>
        <div className="flex gap-4">
          <a
            target="_blank"
            href="https://wa.me/5583988441813"
            rel="noreferrer"
          >
            <Image src={whatsappIcon} alt="Whatsapp Icon" className="w-6" />
          </a>
          <a
            target="_blank"
            href="https://www.facebook.com/dacia.felizardo/"
            className="w-6"
            rel="noreferrer"
          >
            <Facebook />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/daciabordados/"
            className="w-6"
            rel="noreferrer"
          >
            <Instagram />
          </a>
        </div>
      </div>
    </footer>
  )
}
