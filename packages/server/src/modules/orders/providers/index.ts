import { container } from 'tsyringe'

import IOrdersRepository from '@modules/orders/infra/typeorm/repositories/IOrdersRepository'
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository'

import IProductsRepository from '@modules/orders/infra/typeorm/repositories/IProductsRepository'
import ProductsRepository from '@modules/orders/infra/typeorm/repositories/ProductsRepository'

import ISuppliersRepository from '../infra/typeorm/repositories/ISuppliersRepository'
import SuppliersRepository from '../infra/typeorm/repositories/SuppliersRepository'

container.registerSingleton<ISuppliersRepository>(
  'SuppliersRepository',
  SuppliersRepository
)

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository
)

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
)
