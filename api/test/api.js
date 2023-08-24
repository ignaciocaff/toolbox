/* eslint-env mocha */

import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../src/main.js'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import axios from 'axios'
import fs from 'fs'
import path from 'path'

const mocksDir = path.resolve('./mocks')

chai.use(chaiHttp)
chai.use(sinonChai)

describe('Api results', () => {
  afterEach(() => {
    sinon.restore()
  })
  describe('GET /api/files/list', () => {
    it('Debería retornar un array de tipo string', (done) => {
      const getFilesStub = sinon
        .stub(axios, 'get')
        .resolves({ data: { files: ['test1.csv', 'test2.csv'] } })
      chai
        .request(server)
        .get('/api/files/list')
        .end((err, res) => {
          if (err) done(err)
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.files).to.be.an('array')
          res.body.files.forEach((file) => {
            chai.expect(file).to.be.a('string')
          })
          chai.expect(res.body.files).to.have.lengthOf.least(1)

          getFilesStub.restore()
          done()
        })
    })
  })

  describe('GET /api/files/data', () => {
    it('Debería devolver 404 cuando no existe el archivo', (done) => {
      const getFilesStub = sinon.stub(axios, 'get').resolves({
        data: null
      })
      chai
        .request(server)
        .get('/api/files/data?fileName=test99.csv')
        .end((err, res) => {
          if (err) done(err)
          chai.expect(res).to.have.status(404)
          getFilesStub.restore()
          done()
        })
    })
    it('Debería devolver 200 y el contenido correcto cuando existe el archivo', (done) => {
      const csvContent = fs.readFileSync(
        path.join(mocksDir, 'file.csv'),
        'utf8'
      )
      const getFilesStub = sinon.stub(axios, 'get').resolves({
        data: csvContent
      })
      chai
        .request(server)
        .get('/api/files/data?fileName=test9.csv')
        .end((err, res) => {
          if (err) done(err)
          chai.expect(res).to.have.status(200)
          chai.expect(res.body).to.be.an('object')
          chai.expect(res.body).to.have.property('file')
          chai.expect(res.body?.lines).to.be.an('array')
          res.body?.lines.forEach((line) => {
            chai.expect(line).to.have.property('text')
            chai.expect(line).to.have.property('number')
            chai.expect(line).to.have.property('hex')
            chai.expect(line.text).to.be.a('string')
            chai.expect(line.number).to.be.a('number')
            chai.expect(line.hex).to.be.a('string')
          })
          chai.expect(res.body?.lines).to.have.lengthOf(11)
          getFilesStub.restore()
          done()
        })
    })

    it('Debería devolver 200 y un array con todos los archivos válidos', (done) => {
      const csvContent = fs.readFileSync(
        path.join(mocksDir, 'files.csv'),
        'utf8'
      )
      const axiosGetStub = sinon.stub(axios, 'get')

      axiosGetStub.onFirstCall().resolves({
        data: {
          files: [
            'test1.csv',
            'test2.csv',
            'test3.csv',
            'test18.csv',
            'test4.csv',
            'test5.csv',
            'test6.csv',
            'test9.csv',
            'test15.csv'
          ]
        }
      })

      axiosGetStub.callsFake((url) => {
        const fileName = url.split('/').pop()
        const lines = csvContent.split('\n')
        const matchingLines = lines.filter((line) => line.includes(fileName))
        const result = matchingLines.join('\n')
        return Promise.resolve({ data: result || '' })
      })
      chai
        .request(server)
        .get('/api/files/data')
        .end((err, res) => {
          if (err) done(err)
          chai.expect(res).to.have.status(200)
          chai.expect(res.body).to.be.an('array')
          for (let i = 0; i < res.body.length; i++) {
            chai.expect(res.body[i]).to.have.property('file')
            chai.expect(res.body[i]?.lines).to.be.an('array')
            res.body[i]?.lines.forEach((line) => {
              chai.expect(line).to.have.property('text')
              chai.expect(line).to.have.property('number')
              chai.expect(line).to.have.property('hex')
              chai.expect(line.text).to.be.a('string')
              chai.expect(line.number).to.be.a('number')
              chai.expect(line.hex).to.be.a('string')
            })
          }
          chai.expect(res.body).to.have.lengthOf(3)
          axiosGetStub.restore()
          done()
        })
    })
  })
})
