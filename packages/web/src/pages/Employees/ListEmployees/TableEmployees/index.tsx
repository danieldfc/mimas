import React, { useEffect, useState } from 'react'
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import TableList from '../../../../components/TableList'
import { Employee } from '../../../../hooks/employee'
import {
  ContainerWithoutEmployee,
  Pagination,
  PaginationButton,
  PaginationItem
} from './styles'

type Props = {
  employees: Employee[]
}

export default function TableEmployees({ employees = [] }: Props) {
  const [limit] = useState(10)
  const [pages, setPages] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const totalPages = Math.ceil(employees.length / limit)
    const arrayPages = []
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i)
    }
    setPages(arrayPages)
  }, [limit, employees])

  return (
    <>
      {employees.length ? (
        <>
          <TableList>
            <>
              <thead>
                <tr>
                  <th> NOME </th>
                  <th className="center"> E-MAIL </th>
                  <th className="center"> TELEFONE </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee: Employee) => (
                  <tr key={employee.id}>
                    <td>
                      <a href={`/employees/${employee.id}`}>{employee.name}</a>
                    </td>
                    <td className="center">
                      {employee.email?.length ? employee.email : 'N/A'}
                    </td>
                    <td className="center">{employee.phone}</td>
                  </tr>
                ))}
              </tbody>
            </>
          </TableList>
          <Pagination>
            <PaginationButton>
              {currentPage > 1 && (
                <PaginationItem
                  isSelector
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <BiSkipPrevious size={24} />
                </PaginationItem>
              )}
              {pages.map(page => (
                <PaginationItem
                  isSelect={page === currentPage}
                  key={page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationItem>
              ))}
              {currentPage < pages.length && (
                <PaginationItem
                  isSelector
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <BiSkipNext size={24} />
                </PaginationItem>
              )}
            </PaginationButton>
          </Pagination>
        </>
      ) : (
        <ContainerWithoutEmployee>
          Não existe prestadores de serviço cadastrados
        </ContainerWithoutEmployee>
      )}
    </>
  )
}
