import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { Header } from '../../../components/Header'
import TableList from '../../../components/TableList'
import { useClient } from '../../../hooks/client'

import {
  Container,
  ContainerWithoutClient,
  Content,
  HeaderWrapper
} from './styles'

export function ListClients() {
  const { clients = [] } = useClient()

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
          <Link to="/create-client">Cadastrar novo cliente</Link>
        </div>
      </HeaderWrapper>

      <Content>
        {clients.length ? (
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
                {clients.map((client, key) => (
                  <tr key={client.id || key}>
                    <td>
                      <Link to={`/clients/${client.id}`}>{client.name}</Link>
                    </td>
                    <td className="center">{client.email ?? 'N/A'}</td>
                    <td className="center">{client.phone}</td>
                    <td className="center">{client.address ?? 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </>
          </TableList>
        ) : (
          <ContainerWithoutClient>
            Você não possui clientes cadastrados
          </ContainerWithoutClient>
        )}
      </Content>
    </Container>
  )
}
