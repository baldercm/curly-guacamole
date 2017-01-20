class ApiError extends Error {
  constructor(message, cause) {
    super()
    this.code     = 100
    this.name     = 'ApiError'
    this.message  = message || 'ApiError'
    this.cause    = cause
  }
}

export {ApiError}
