import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { Header } from '../../components/Header'
import TableList from '../../components/TableList'
import { useClient } from '../../hooks/client'

import { Container, Content, HeaderWrapper } from './styles'

export function Clients() {
  const { clients } = useClient()

  return (
    <Container>
      <Header />

      <HeaderWrapper>
        <h3>Clientes</h3>

        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
            Voltar
          </Link>
          <Link to="/create-client">Criar cliente</Link>
        </div>
      </HeaderWrapper>

      <Content>
        <TableList>
          <>
            <thead>
              <tr>
                <th> CLIENTE </th>
                <th className="center"> E-MAIL </th>
                <th className="center"> TELEFONE </th>
                <th className="center"> ENDEREÇO </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {(clients ?? []).map((client, key) => (
                <tr key={client.id || key}>
                  <td> {client.name}</td>
                  <td className="center">{client.email ?? 'N/A'}</td>
                  <td className="center">{client.phone}</td>
                  <td className="center">{client.address ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </>
        </TableList>
      </Content>
    </Container>
  )
}
