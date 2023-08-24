import cors from 'cors'

export const corsMiddleware = () => {
  const corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
  return cors(corsOptions)
}
