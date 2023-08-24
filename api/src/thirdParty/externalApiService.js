import { ApiError } from '../errors/apiError.js'
import axios from 'axios'
import logger from '../logger/logger.js'
import { config } from '../configs/appConfig.js'

async function getFiles () {
  try {
    const response = await axios.get(
      `${config.externalServiceUrl}/files`,
      buildHeaders()
    )
    return response?.data?.files
  } catch (e) {
    throw ApiError.failedDependency('Falló la conexión con la api pública de toolbox')
  }
}

async function getFileContent (fileName) {
  try {
    const response = await axios.get(
      `${config.externalServiceUrl}/file/${fileName}`,
      buildHeaders()
    )
    return response?.data
  } catch (e) {
    logger.error(
      `Consuming external API : ${e.message} trying to get file: ${fileName}`
    )
    return null
  }
}

function buildHeaders () {
  return {
    headers: {
      Authorization: `Bearer ${config.bearerKey}`,
      Accept: 'application/json'
    }
  }
}

export const externalApiService = {
  getFiles,
  getFileContent
}
