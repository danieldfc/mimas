import Image from 'next/image'

import bordado1 from '@/assets/bordados-1.png'
import bordado2 from '@/assets/bordados-2.png'
import bordado3 from '@/assets/bordados-3.png'
import bordado4 from '@/assets/bordados-4.png'
import ProductCart from '@/components/ProductCart'

export default function Home() {
  return (
    <main className="flex flex-1">
      <section className="my-10">
        <h2 className="mb-4 text-2xl">Mais vendidos</h2>
        <ul className="grid grid-cols-5 gap-6">
          <ProductCart name="Lira Earrings" price="R$ 20,00" sourceImage={bordado1} />
          <ProductCart name="Lira Earrings" price="R$ 20,00" sourceImage={bordado2} />
          <ProductCart name="Lira Earrings" price="R$ 20,00" sourceImage={bordado3} />
          <ProductCart name="Lira Earrings" price="R$ 20,00" sourceImage={bordado4} />
          <ProductCart name="Lira Earrings" price="R$ 20,00" sourceImage={bordado1} />
        </ul>
      </section>
    </main>
  )
}
