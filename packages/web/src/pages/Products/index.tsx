import api from '@mimas/axios-config'
import React, { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import TableList from '../../components/TableList'
import { Product } from '../CreateOrder'

import { Container, Content, Wrapper } from './styles'

export default function ProductsRote() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('/products')
      setProducts(response.data.products)
      return response.data.products as Product[]
    }
    getProducts()
  }, [])

  return (
    <Container>
      <Header />
      <Wrapper>
        <h3>Meus produtos</h3>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
            Voltar
          </Link>
          <Link to="/create-product">Anexar novo produto</Link>
        </div>
      </Wrapper>
      <Content>
        <TableList loading={false}>
          <>
            <thead>
              <tr>
                <th> PRODUTO </th>
                <th className="center"> DESCRIÇÃO </th>
                <th className="center"> PREÇO </th>
                <th className="center"> AÇÕES </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: Product) => (
                <tr key={product.id}>
                  <td> {product.title}</td>
                  <td className="center">{product.description ?? 'N/A'}</td>
                  <td className="center">{product.price}</td>
                  <td className="center">
                    <button type="button">Remover</button>
                    <button type="button">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        </TableList>
      </Content>
    </Container>
  )
}
