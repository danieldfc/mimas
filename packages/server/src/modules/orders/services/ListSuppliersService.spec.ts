import FakeSuppliersRepository from '../infra/typeorm/repositories/fakes/FakeSuppliersRepository'
import { ListSuppliersService } from './ListSuppliersService'

let fakeSuppliersRepository: FakeSuppliersRepository
let listSuppliersService: ListSuppliersService

describe('ListSuppliers', () => {
  beforeEach(() => {
    fakeSuppliersRepository = new FakeSuppliersRepository()
    listSuppliersService = new ListSuppliersService(fakeSuppliersRepository)
  })

  it('should be able to list suppliers', async () => {
    const supplier = await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      address: 'Rua tal, nº99, bairro tal',
      phone: '(83) 99999-9999'
    })

    const suppliers = await listSuppliersService.execute()

    expect(suppliers).toEqual(
      expect.arrayContaining([expect.objectContaining(supplier)])
    )
  })
})
