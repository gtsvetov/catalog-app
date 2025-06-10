import React from 'react'
import { Product } from '../../core/types/common'

interface CardProps {
  product: Product
  onCardClick: (id: number) => void
}

const Card: React.FC<CardProps> = ({ product, onCardClick }) => {
  return (
    <div key={product.id} className="border rounded p-4 shadow" onClick={() => onCardClick(Number(product.id))}>
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-2" />
      <h3 className="font-bold">{product.title}</h3>
      <p>{product.category}</p>
      <p className="text-blue-600 font-semibold">${product.price}</p>
    </div>
  )
}

export default React.memo(Card)
