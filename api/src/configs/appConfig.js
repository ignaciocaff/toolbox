import './loadEnv.js'

export const config = {
  port: +process.env.PORT || 8080,
  bearerKey: process.env.BEARER_KEY || 'aSuperSecretKey',
  externalServiceUrl: process.env.EXTERNAL_SERVICE_URL || 'https://echo-serv.tbxnet.com/v1/secret'
}
