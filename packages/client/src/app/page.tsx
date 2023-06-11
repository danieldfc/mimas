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
        <div className="flex flex-row justify-between">
          <h2 className="mb-4 text-2xl">MAIS VENDIDOS</h2>
          <a className="transition-all text-lg hover:text-purple-500" href="/shop">View all</a>
        </div>
        <ul className="grid grid-cols-5 gap-6">
          <ProductCart name="Lira Earrings" price="R$ 20,00" sourceImage={bordado1} />
          <ProductCart name="Roupa personalizada" price="R$ 30,00" sourceImage={bordado2} />
          <ProductCart name="Travesseiro personalizado" price="R$ 50,00" sourceImage={bordado3} />
          <ProductCart name="Cartão de vacina personalizado" price="R$ 50,00" sourceImage={bordado4} />
          <ProductCart name="Bordado personalizado" price="R$ 80,00" sourceImage={bordado1} />
        </ul>
      </section>
    </main>
  )
}
