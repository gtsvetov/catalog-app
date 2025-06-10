interface AuthResponse {
  success: boolean
  error: string | null
}

const createAuthApiContract = () => {
  const login = async (email: string, passwordInput: string): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === 'test@email.com' && passwordInput === 'password') {
      return { success: true, error: null }
    } else {
      return { success: false, error: 'Неверный email или пароль' }
    }
  }

  return {
    login,
  }
}

export const authApi = createAuthApiContract()
