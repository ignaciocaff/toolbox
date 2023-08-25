/**
 * @swagger
 * /api/files/data:
 *   get:
 *     summary: Obtiene la lista de archivos formateados
 *     parameters:
 *       - in: query
 *         name: fileName
 *         schema:
 *           type: string
 *         description: Nombre del archivo a buscar (opcional)
 *         required: false
 *     responses:
 *       200:
 *         description: Lista de de archivos válidos o archivo especifico
 */

/**
 * @swagger
 * /api/files/list:
 *   get:
 *     summary: Obtiene la lista de archivos directo api externa
 *     responses:
 *       200:
 *         description: Lista de archivos
 */
