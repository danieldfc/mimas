import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository'
import FakeSuppliersRepository from '../infra/typeorm/repositories/fakes/FakeSuppliersRepository'
import { Supplier } from '../infra/typeorm/entities/Supplier'
import { UpdateProductService } from './UpdateProductService'
import { Product } from '../infra/typeorm/entities/Product'
import { AppError } from '@shared/errors/AppError'

let fakeProductsRepository: FakeProductsRepository
let fakeSuppliersRepository: FakeSuppliersRepository
let updateProductService: UpdateProductService

describe('UpdateProduct', () => {
  let supplier: Supplier
  let product: Product

  beforeEach(async () => {
    fakeProductsRepository = new FakeProductsRepository()
    fakeSuppliersRepository = new FakeSuppliersRepository()
    updateProductService = new UpdateProductService(fakeProductsRepository)

    supplier = await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      phone: '(83) 99999-9999',
      address: 'Rua Tal, nº99'
    })

    product = await fakeProductsRepository.create({
      description: 'Minha descrição do produto',
      title: 'Meu título do produto',
      price: 200,
      supplier
    })
  })

  it('should be able to update a product', async () => {
    const productUpdate = await updateProductService.execute({
      productId: product.id,
      supplierId: supplier.id,
      title: 'Título atualizado'
    })

    expect(productUpdate.title).toEqual('Título atualizado')
  })

  it('should not be able to update a product inexists', async () => {
    await expect(
      updateProductService.execute({
        productId: 'non-id-product',
        supplierId: supplier.id,
        title: 'Título atualizado'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update a product exist not specifying its supplier', async () => {
    await expect(
      updateProductService.execute({
        productId: product.id,
        supplierId: 'non-id-supplier',
        title: 'Título atualizado'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
