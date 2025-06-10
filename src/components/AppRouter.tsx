import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import CatalogPage from '../features/catalog/CatalogPage'
import LoginForm from '../core/components/LoginForm'

interface AppRouterProps {
  user: string | null
  handleLogin: (email: string, passwordInput: string) => Promise<boolean>
  handleLogout: () => void
  isLoading: boolean
}

const AppRouter: React.FC<AppRouterProps> = ({ user, handleLogin, handleLogout, isLoading }) => {
  const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation()
    return user ? <>{children}</> : <Navigate to="/login" state={{ from: location }} replace />
  }

  const MemoizedCatalogPage = React.memo(() => (
    <RequireAuth>
      <CatalogPage user={user} logout={handleLogout} />
    </RequireAuth>
  ))

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/catalog" />} />
      <Route path="/catalog" element={<MemoizedCatalogPage />} />
      <Route path="/login" element={<LoginForm onLogin={handleLogin} isLoading={isLoading} />} />
    </Routes>
  )
}

export default AppRouter
