import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Product } from '../../core/types/common'
import Modal from '../components/Modal'
import useProductFilter from '../hooks/UseProductFiltres'
import ProductList from '../components/ProductList'
import ProductFilters from '../components/ProductFilters'
import { productApi } from '../api/productApi'
import useAsync from '../../core/hooks/useAsync'
import Pagination from '../../components/Pagination'
import { Spinner } from '../../core/components/Spinner'

interface CatalogPageProps {
  user: string | null
  logout: () => void
}

const itemsPerPage = 12

const CatalogPage: React.FC<CatalogPageProps> = ({ user, logout }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const { data: products, loading, error } = useAsync<Product[]>(productApi.getProducts, [])

  const { categoryFilter, sortBy, filteredProducts, handleCategoryChange, handleSortByChange } = useProductFilter(
    products || [],
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [categoryFilter, sortBy, filteredProducts])

  const openModal = useCallback(
    (id: number) => {
      const product = products?.find((p) => Number(p.id) === id)
      setSelectedProduct(product)
      setIsModalOpen(true)
    },
    [products],
  )

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedProduct(undefined)
  }, [])

  const paginatedProducts = useMemo(() => {
    if (!filteredProducts) return []
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredProducts.slice(startIndex, endIndex)
  }, [filteredProducts, currentPage])

  const totalPages = useMemo(() => {
    if (!filteredProducts) return 0
    return Math.ceil(filteredProducts.length / itemsPerPage)
  }, [filteredProducts])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Каталог</h1>
        {user && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={logout}
          >
            Выйти
          </button>
        )}
      </div>
      <ProductFilters
        categoryFilter={categoryFilter}
        sortBy={sortBy}
        handleCategoryChange={handleCategoryChange}
        handleSortByChange={handleSortByChange}
        categories={useMemo(() => [...new Set((products || []).map((product) => product.category))], [products])}
      />

      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : error ? (
        <div>Ошибка: {error}</div>
      ) : (
        <>
          <ProductList products={paginatedProducts} onCardClick={openModal} loading={false} error={null} />

          <Modal isOpen={isModalOpen} onClose={closeModal} product={selectedProduct} />

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  )
}

export default React.memo(CatalogPage)
