import pino from 'pino'

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss'
    }
  },
  timestamp: () =>
    `,"time":"${new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    })}"`
})

export default logger
