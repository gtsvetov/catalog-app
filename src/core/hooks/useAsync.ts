import { useState, useEffect } from 'react'

type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
  status: AsyncStatus
}

interface ApiResponse<T> {
  data: T | null
  error: string | null
  status: AsyncStatus
}

const useAsync = <T>(asyncFn: () => Promise<ApiResponse<T>>, dependencies: any[] = []): AsyncState<T> => {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
    status: 'loading',
  })

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setState((prevState) => ({ ...prevState, loading: true, error: null, status: 'loading' }))
      try {
        const response = await asyncFn()
        if (isMounted) {
          setState({ data: response.data, loading: false, error: response.error, status: response.status })
        }
      } catch (error: any) {
        if (isMounted) {
          setState({ data: null, loading: false, error: error.message || 'Неизвестная ошибка', status: 'error' })
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return state
}

export default useAsync
