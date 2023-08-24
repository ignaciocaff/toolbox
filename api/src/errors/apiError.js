import { HttpStatusCode } from 'axios'
export class ApiError {
  status
  message

  constructor (status, message) {
    this.status = status
    this.message = message
  }

  static failedDependency (message) {
    return new ApiError(HttpStatusCode.FailedDependency, message)
  }

  static notFound (message) {
    return new ApiError(HttpStatusCode.NotFound, message)
  }

  static internalError (message) {
    return new ApiError(HttpStatusCode.InternalServerError, message)
  }
}
