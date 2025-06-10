import { useState, useCallback } from 'react'
import AppRouter from './components/AppRouter'
import { authApi } from './core/api/authApi'

function App() {
  const [user, setUser] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (email: string, passwordInput: string): Promise<boolean> => {
    setIsLoading(true)
    const response = await authApi.login(email, passwordInput)
    setIsLoading(false)

    if (response.success) {
      setUser(email)
      return true
    } else {
      return false
    }
  }

  const handleLogout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <>
      <AppRouter user={user} handleLogin={handleLogin} handleLogout={handleLogout} isLoading={isLoading} />
    </>
  )
}

export default App
