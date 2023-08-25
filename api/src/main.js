import express from 'express'
import logger from './logger/logger.js'
import appRoutes from './routes/appRoutes.js'
import { config } from './configs/appConfig.js'
import { apiErrorHandler } from './errors/apiErrorHandler.js'
import { corsMiddleware } from './cors/corsMiddleware.js'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { swaggerOptions } from './routes/swaggerOptions.js'

const app = express()

const swaggerSpec = swaggerJsDoc(swaggerOptions)

function startServer () {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.use(corsMiddleware())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/api', appRoutes)

  app.use(apiErrorHandler)
  app.listen(config.port, async () => {
    logger.info(`App started on port: ${config.port}`)
  })
}

startServer()

export default app
