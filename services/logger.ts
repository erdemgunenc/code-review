import { createLogger, transports, format } from 'winston';

const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log', level: 'error' }),
    ],
    format: format.combine(format.timestamp(), format.json()),
});

export default logger;
