import { useState, useMemo } from 'react'
import { Product } from 'core/types/common'

const useProductFilter = (products: Product[]) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('default')

  const filteredProducts = useMemo(() => {
    if (categoryFilter === 'all') {
      return products
    } else {
      const filtered = products.filter((product) => product.category === categoryFilter)
      return filtered
    }
  }, [products, categoryFilter])

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })
    return sorted
  }, [filteredProducts, sortBy])

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(event.target.value)
  }

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value)
  }

  return {
    categoryFilter,
    sortBy,
    filteredProducts: sortedProducts,
    handleCategoryChange,
    handleSortByChange,
  }
}

export default useProductFilter
