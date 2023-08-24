import express from 'express'

import { fileRouter } from './fileRoutes.js'

const router = express.Router()

router.use('/files', fileRouter)

export default router
