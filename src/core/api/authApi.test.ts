import { authApi } from './authApi'

describe('authApi', () => {
  describe('login', () => {
    it('should return success with correct credentials', async () => {
      const response = await authApi.login('test@email.com', 'password')

      expect(response).toEqual({
        success: true,
        error: null,
      })
    })

    it('should return error with incorrect email', async () => {
      const response = await authApi.login('wrong@email.com', 'password')

      expect(response).toEqual({
        success: false,
        error: 'Неверный email или пароль',
      })
    })

    it('should return error with incorrect password', async () => {
      const response = await authApi.login('test@email.com', 'wrongpassword')

      expect(response).toEqual({
        success: false,
        error: 'Неверный email или пароль',
      })
    })

    it('should return error with both incorrect email and password', async () => {
      const response = await authApi.login('wrong@email.com', 'wrongpassword')

      expect(response).toEqual({
        success: false,
        error: 'Неверный email или пароль',
      })
    })

    it('should take approximately 1 second to respond', async () => {
      const startTime = Date.now()
      await authApi.login('test@email.com', 'password')
      const endTime = Date.now()
      const duration = endTime - startTime
      expect(duration).toBeGreaterThanOrEqual(900)
      expect(duration).toBeLessThanOrEqual(1100)
    })

    describe('response type validation', () => {
      it('should return correct type for successful login', async () => {
        const response = await authApi.login('test@email.com', 'password')

        expect(response).toEqual(
          expect.objectContaining({
            success: true,
            error: null,
          }),
        )
      })

      it('should return correct type for failed login', async () => {
        const response = await authApi.login('wrong@email.com', 'password')

        expect(response).toEqual(
          expect.objectContaining({
            success: false,
            error: expect.any(String),
          }),
        )
      })

      it('should always have success boolean and error string or null', async () => {
        const successResponse = await authApi.login('test@email.com', 'password')
        const errorResponse = await authApi.login('wrong@email.com', 'password')

        expect(successResponse.success).toBe(true)
        expect(successResponse.error).toBeNull()
        expect(errorResponse.success).toBe(false)
        expect(typeof errorResponse.error).toBe('string')
      })
    })
  })
})
