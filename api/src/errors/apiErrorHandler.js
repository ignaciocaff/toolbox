import { ApiError } from './apiError.js'
import { HttpStatusCode } from 'axios'

export const apiErrorHandler = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json(err)
    return
  }
  res.status(HttpStatusCode.InternalServerError).json({
    message: 'Ha ocurrido un error inesperado.',
    status: HttpStatusCode.InternalServerError
  })
}
