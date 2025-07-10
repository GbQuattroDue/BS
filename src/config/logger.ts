import winston from 'winston'; // Importing the winston library for logging
// This file configures the logger using the winston library.

const logger = winston.createLogger({
  level: 'info', // Setting the default logging level to 'info'
  // This means that messages with a level of 'info' or higher will be logged.
  format: winston.format.combine(
    winston.format.timestamp(), winston.format.json() // Combining formats: adding a timestamp and formatting messages as JSON
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export default logger;