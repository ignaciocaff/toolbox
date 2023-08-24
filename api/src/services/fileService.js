import { CSVFile } from '../models/csvFile.js'
import { CSVLine } from '../models/csvLine.js'
import { externalApiService } from '../thirdParty/externalApiService.js'

const getAll = async () => {
  return await externalApiService.getFiles()
}

const getByName = async (fileName) => {
  const fileContent = await externalApiService.getFileContent(fileName)
  return fileContent ? new CSVFile(fileName, sanitize(fileContent)) : null
}

const getFormatedFiles = async () => {
  const files = await externalApiService.getFiles()
  const formatedFiles = []
  if (files && files.length) {
    for (const file of files) {
      const fileContent = await externalApiService.getFileContent(file)
      /* En primera instancia se filtran aquellos archivos que no devuelven respuesta. En el servicio externo se devuelve null
      por lo que con el if que sigue es suficiente, se deja un log de error a fines prácticos iría en un archivo particular
      donde se registran los errores al consumir este servicio externo u otros.
      */
      if (fileContent) {
        const lines = sanitize(fileContent)
        if (lines != null && lines.length) {
          formatedFiles.push(new CSVFile(file, lines))
        }
      }
    }
  }
  return formatedFiles
}

// A fines prácticos y porque se conoce el formato que deberían tener los archivos, se deja columns[ cada posicion ] para la validación. De esta manera también me evito un ciclo for más
function sanitize (fileContent) {
  const lines = fileContent.split('\n')
  const sanitizedLines = []
  for (const line of lines) {
    const columns = line.split(',')

    if (columns.length !== 4) {
      continue
    }

    /* Se ignora colums[0] asumiendo que nunca va a venir un nombre de "file" distinto del que estoy buscando por nombre en la api externa, sino debería incluirse una logica tal que:
    if(columns[0] !== fileName -> recibido por parametro)
    */

    if (columns[1] != null && typeof columns[1] !== 'string') {
      continue
    }
    if (columns[2] != null && isNaN(columns[2])) {
      continue
    }
    if (columns[3] != null && !/^[0-9a-fA-F]{32}$/.test(columns[3])) {
      continue
    }
    sanitizedLines.push(
      new CSVLine(columns[1], Number(columns[2]), columns[3])
    )
  }
  return sanitizedLines
}

export const fileService = {
  getAll,
  getFormatedFiles,
  getByName,
  sanitize
}
