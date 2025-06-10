import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginFormProps {
  onLogin: (email: string, passwordInput: string) => Promise<boolean>
  isLoading: boolean
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading }) => {
  const [email, setEmail] = useState('')
  const [passwordInput, setPassword] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [generalError, setGeneralError] = useState<string | null>(null)
  const navigate = useNavigate()

  const validateEmail = (email: string): string | null => {
    if (!email) {
      return 'Email обязателен для заполнения'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Неверный формат email'
    }
    return null
  }

  const validatePassword = (passwordInput: string): string | null => {
    if (!passwordInput) {
      return 'Пароль обязателен для заполнения'
    }
    if (passwordInput.length < 6) {
      return 'Пароль должен содержать не менее 6 символов'
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError(null)
    setPasswordError(null)
    setGeneralError(null)

    const emailErrorResult = validateEmail(email)
    const passwordErrorResult = validatePassword(passwordInput)

    if (emailErrorResult || passwordErrorResult) {
      setEmailError(emailErrorResult)
      setPasswordError(passwordErrorResult)
      return
    }

    const success = await onLogin(email, passwordInput)
    if (success) {
      navigate('/catalog')
    } else {
      setGeneralError('Неверный email или пароль')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
      {generalError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{generalError}</span>
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emailError ? 'border-red-500' : ''}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Пароль
        </label>
        <input
          type="password"
          id="password"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${passwordError ? 'border-red-500' : ''}`}
          value={passwordInput}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />
        {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Вход...' : 'Войти'}
        </button>
      </div>
    </form>
  )
}

export default LoginForm
