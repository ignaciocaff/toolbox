import { ApiError } from '../errors/apiError.js'
import { fileService } from '../services/fileService.js'

const getFormatedFiles = async (_, res, next) => {
  try {
    const files = await fileService.getFormatedFiles()
    res.json(files)
  } catch (e) {
    next(e)
  }
}

const getAll = async (_, res, next) => {
  try {
    const files = await fileService.getAll()
    res.json({ files })
  } catch (e) {
    next(e)
  }
}

const getByName = async (req, res, next) => {
  try {
    const file = await fileService.getByName(req.query.fileName)
    if (!file) {
      throw ApiError.notFound('El archivo no fue encontrado.')
    }
    if (file && !file.lines.length) {
      throw ApiError.internalError(
        'El archivo existe pero no tiene lineas válidas.'
      )
    }
    res.json(file)
  } catch (e) {
    next(e)
  }
}

export const fileController = {
  getAll,
  getFormatedFiles,
  getByName
}
