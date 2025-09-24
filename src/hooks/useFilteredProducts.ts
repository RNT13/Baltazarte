'use client'

import { RootState } from '@/redux/store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

const filterMap: Record<string, (item: Product) => boolean> = {
  Todos: () => true,
  Destaque: item => item.highlight === true,
  Promoção: item => item.discount > 0,
  Populares: item => item.sold > 50,
  Inativos: item => item.active === false
}

export function useFilteredProducts(products: Product[]) {
  const activeFilter = useSelector((state: RootState) => state.filter.active)
  const query = useSelector((state: RootState) => state.search.query)

  const filteredProducts = useMemo(() => {
    let result = products

    if (query.trim() !== '') {
      result = result.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    } else {
      if (filterMap[activeFilter]) {
        result = result.filter(filterMap[activeFilter])
      } else {
        result = result.filter(item => item.category?.name === activeFilter)
      }
    }

    return result
  }, [products, activeFilter, query])

  return { filteredProducts, activeFilter }
}
