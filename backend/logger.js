import winston from 'winston'

const infoLogger = winston.createLogger({
   format: winston.format.combine(winston.format.prettyPrint()),
   transports: [
      new winston.transports.File({
         filename: 'logs/info.log',
      }),
   ],
})

export function logInfo(info) {
   infoLogger.info({
      timestamp: new Date().toLocaleString('en-CA', {
         timeZone: 'America/Edmonton',
         timeZoneName: 'long',
         hour12: false,
      }),
      ...info,
   })
}

const errorLogger = winston.createLogger({
   format: winston.format.combine(winston.format.prettyPrint()),
   transports: [
      new winston.transports.File({
         filename: 'logs/error.log',
      }),
   ],
})

export function logError(error) {
   errorLogger.error({
      timestamp: new Date().toLocaleString('en-CA', {
         timeZone: 'America/Edmonton',
         timeZoneName: 'long',
         hour12: false,
      }),
      ...error,
   })
}