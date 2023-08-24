/* eslint-env mocha */

import { expect } from 'chai'
import { fileService } from '../src/services/fileService.js'
import { CSVLine } from '../src/models/csvLine.js'

describe('File Service', () => {
  describe('Valores límite', () => {
    it('Debería retornar un array vacio cuando recibe lineas vacias', () => {
      const mockFileContent = ''
      const result = fileService.sanitize(mockFileContent)

      // No funciona con standardjs la expresion .that.is.not.empty o is.empty
      expect(result).to.be.an('array').lengthOf(0)
    })
    it('Debería retornar un array de largo uno cuando recibe un valor Number.MAX_VALUE', () => {
      const mockFileContent =
        'name1,text,1.7976931348623157e+308,c5c596c4cf70009454915532d14db749'
      const result = fileService.sanitize(mockFileContent)
      expect(result).to.be.an('array').lengthOf(1)
    })
    it('Debería retornar un array de largo dos aún cuando una línea tiene como number el cero', () => {
      const mockFileContent =
        'name1,text,0,90930d793501083138f24cd6e5afcc5a\nname1,text2,456,c5c596c4cf70009454915532d14db749'
      const result = fileService.sanitize(mockFileContent)

      expect(result).to.be.an('array').lengthOf(2)
    })

    it('Debería retornar un array de largo dos aún cuando los number son negativos', () => {
      const mockFileContent =
        'name1,text,-1,90930d793501083138f24cd6e5afcc5a\nname1,text2,-114,c5c596c4cf70009454915532d14db749'
      const result = fileService.sanitize(mockFileContent)

      expect(result).to.be.an('array').lengthOf(2)
    })

    it('Debería retornar un array de largo dos cuando las lineas son válidas', () => {
      const mockFileContent =
        'name1,text,123,90930d793501083138f24cd6e5afcc5a\nname1,text2,456,c5c596c4cf70009454915532d14db749'
      const result = fileService.sanitize(mockFileContent)

      expect(result).to.be.an('array').lengthOf(2)
      result.forEach((line) => {
        expect(line).to.be.an.instanceOf(CSVLine)
        expect(line.text).to.be.a('string')
        expect(line.number).to.be.a('number')
        expect(line.hex).to.be.a('string')
      })
    })
  })
  describe('Campos', () => {
    it('Debería retornar un array vacio cuando el campo hex es inválido', () => {
      const mockFileContent =
        'name1,text,123,90930d793501083138f24cd6e5\nname1,text2,456,c5c596c4cf700094549155329'
      const result = fileService.sanitize(mockFileContent)

      expect(result).to.be.an('array').lengthOf(0)
    })
    it('Debería retornar un array de largo uno cuando el campo num es inválido', () => {
      const mockFileContent =
        'name1,text,a,90930d793501083138f24cd6e5afcc5a\nname1,text2,456,c5c596c4cf70009454915532d14db749'
      const result = fileService.sanitize(mockFileContent)

      expect(result).to.be.an('array').lengthOf(1)
    })

    it('Debería retornar un array de largo uno cuando una linea completa es inválida', () => {
      const mockFileContent =
        ',,,\nname1,text2,456,c5c596c4cf70009454915532d14db749'
      const result = fileService.sanitize(mockFileContent)

      expect(result).to.be.an('array').lengthOf(1)
    })
  })
})
