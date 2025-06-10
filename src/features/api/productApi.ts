import { Product } from 'core/types/common'

const API_URL = '/src/core/graphql/mock.rest.json'

interface ApiResponse<T> {
  data: T | null
  error: string | null
  status: 'idle' | 'loading' | 'success' | 'error'
}

const createApiContract = () => {
  const getProducts = async (): Promise<ApiResponse<Product[]>> => {
    try {
      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data: Product[] = await response.json()
      console.log(data)

      return {
        data,
        error: null,
        status: 'success',
      }
    } catch (error: any) {
      console.error('Ошибка при загрузке товаров:', error)
      return {
        data: null,
        error: error.message || 'Неизвестная ошибка',
        status: 'error',
      }
    }
  }

  return {
    getProducts,
  }
}

export const productApi = createApiContract()
