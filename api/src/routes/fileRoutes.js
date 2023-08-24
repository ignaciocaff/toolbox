import express from 'express'

import { fileController } from '../controllers/fileController.js'

const fileRouter = express.Router()

// Se asume que un fileName vacio no tiene un comportamiento especifico porque no fue aclarado. Por lo tanto si se llama de esa forma, el método redirige a getFormatedFiles
fileRouter.get('/data', (req, res, next) => {
  if (req.query.fileName) {
    fileController.getByName(req, res, next)
  } else {
    fileController.getFormatedFiles(req, res, next)
  }
})

fileRouter.get('/list', (req, res, next) => {
  fileController.getAll(req, res, next)
})

export { fileRouter }
