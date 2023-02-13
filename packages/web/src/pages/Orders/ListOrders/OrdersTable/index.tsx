import React, { useEffect, useMemo, useState } from 'react'
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi'

import { Pagination, PaginationButton, PaginationItem } from './styles'

import TableList from '../../../../components/TableList'
import OrderItemTable from '../OrderItemTable'
import { Order } from '../../../../interfaces/Order'

type OrdersTableProps = {
  orders: Order[]
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>
}

export default function OrdersTable({ orders, setOrders }: OrdersTableProps) {
  const [limit] = useState(10)
  const [pages, setPages] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const totalPages = Math.ceil(orders.length / limit)
    const arrayPages = []
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i)
    }
    setPages(arrayPages)
  }, [limit, orders])

  const ordersFilter = useMemo(() => {
    return orders.slice((currentPage - 1) * limit, currentPage * limit)
  }, [orders, currentPage, limit])

  return (
    <>
      <TableList>
        <thead>
          <tr>
            <th> PEDIDO </th>
            <th className="center"> CLIENTE(S) </th>
            <th className="center"> ENTREGA </th>
            <th className="center"> AÇÕES </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {ordersFilter.map(order => (
            <OrderItemTable
              key={order.id}
              order={order}
              setOrders={setOrders}
            />
          ))}
        </tbody>
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
  )
}
