import React from 'react'
import { Product } from 'core/types/common'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  product?: Product
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={product?.image} alt={product?.title} className="w-full h-48 object-cover mb-2" />
        <h3 className="font-bold">{product?.title}</h3>
        <p>{product?.category}</p>
        <p className="text-blue-600 font-semibold">${product?.price}</p>
      </div>
    </div>
  )
}

export default Modal
