'use client'

import { RootState } from '@/redux/store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

const orderFilterMap: Record<string, (order: Order) => boolean> = {
  Todos: () => true,
  Pago: order => order.status === 'PAID',
  Processando: order => order.status === 'PROCESSING',
  Enviado: order => order.status === 'SHIPPED',
  Entregue: order => order.status === 'DELIVERED',
  Cancelado: order => order.status === 'CANCELED',
  Falhou: order => order.status === 'FAILED',
  Reembolsado: order => order.status === 'REFUNDED'
}

export function useFilteredOrders(orders: Order[]) {
  const activeFilter = useSelector((state: RootState) => state.filter.active)
  const query = useSelector((state: RootState) => state.search.query)

  const filteredOrders = useMemo(() => {
    let result = orders

    if (query.trim() !== '') {
      result = result.filter(
        order => order.id.toLowerCase().includes(query.toLowerCase()) || order.user.name.toLowerCase().includes(query.toLowerCase())
      )
    } else {
      const filterFn = orderFilterMap[activeFilter] || orderFilterMap['Todos']
      result = result.filter(filterFn)
    }

    return result
  }, [orders, activeFilter, query])

  return { filteredOrders, activeFilter }
}
