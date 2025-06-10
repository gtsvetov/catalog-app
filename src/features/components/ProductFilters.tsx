import React from 'react'

interface ProductFiltersProps {
  categoryFilter: string
  sortBy: string
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  handleSortByChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  categories: string[]
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categoryFilter,
  sortBy,
  handleCategoryChange,
  handleSortByChange,
  categories,
}) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <label htmlFor="categoryFilter" className="mr-2 font-bold">
          Категория:
        </label>
        <select
          id="categoryFilter"
          className="border rounded px-2 py-1"
          value={categoryFilter}
          onChange={handleCategoryChange}
        >
          <option value="all">Все категории</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sortBy" className="mr-2 font-bold">
          Сортировать по:
        </label>
        <select id="sortBy" className="border rounded px-2 py-1" value={sortBy} onChange={handleSortByChange}>
          <option value="default">По умолчанию</option>
          <option value="price">Цене</option>
          <option value="name">Названию</option>
        </select>
      </div>
    </div>
  )
}

export default ProductFilters
