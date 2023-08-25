import path from 'path'

const src = path.resolve('./src')

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Challenge API',
      version: '1.0.0'
    }
  },
  apis: [path.join(src, 'swagger.js')]
}
