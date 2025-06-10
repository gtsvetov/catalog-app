import React from 'react'
import { Product } from '../../core/types/common'
import Card from './Card'

interface ProductListProps {
  products: Product[] | null
  loading: boolean
  error: string | null
  onCardClick: (id: number) => void
}

const ProductList: React.FC<ProductListProps> = ({ products, loading, error, onCardClick }) => {
  if (loading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error}</div>
  if (!products || products.length === 0) return <div>Нет товаров для отображения.</div>

  return (
    <div className="flex flex-wrap">
      {products.map((product) => (
        <Card key={product.id} product={product} onCardClick={onCardClick} />
      ))}
    </div>
  )
}

export default React.memo(ProductList)
