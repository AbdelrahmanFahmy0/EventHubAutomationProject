import path from 'node:path';
import winston from 'winston';

/* Logger log levels */
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/* Regular expression to match sensitive keys */
const SENSITIVE_KEY_PATTERN = /password|secret|token|apikey|api_key|authorization/i;

/* Path to the log file */
const LOG_FILE_PATH = path.resolve(process.cwd(), 'test-output/logs/logs.log');

/** Redacts values whose key looks sensitive so passwords/tokens never reach logs.log or the console. */
function redact(context: Record<string, unknown>): Record<string, unknown> {
  const safe: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(context)) {
    safe[key] = SENSITIVE_KEY_PATTERN.test(key) ? '[REDACTED]' : value;
  }
  return safe;
}

/** Formats the context object as a string for logging. */
function formatContext(context?: Record<string, unknown>): string {
  if (!context || Object.keys(context).length === 0) return '';
  return ` ${JSON.stringify(redact(context))}`;
}

/** Custom log format for console and file output. */
const lineFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[${String(timestamp)}] [${level.toUpperCase()}] ${String(message)}`;
});

/** Winston logger instance configured with console and file transports. */
const winstonLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(winston.format.timestamp(), lineFormat),
  transports: [
    /* Console transport for real-time logging with colorized output. */
    new winston.transports.Console({
      format: winston.format.combine(winston.format.timestamp(), winston.format.colorize(), lineFormat),
    }),
    /* File transport for persistent logging to logs.log. */
    new winston.transports.File({
      filename: LOG_FILE_PATH,
      format: winston.format.combine(winston.format.timestamp(), lineFormat),
      options: { flags: 'a' }
    })
  ]
});

/** Writes a log entry at the specified level with optional context. */
function writeLog(level: LogLevel, message: string, context?: Record<string, unknown>): void {
  const contextSuffix = formatContext(context);
  winstonLogger.log(level, `${message}${contextSuffix}`);
}

/** Public logger object exposing methods for different log levels. */
export const logger = {
  debug: (message: string, context?: Record<string, unknown>): void => {
    writeLog('debug', message, context);
  },
  info: (message: string, context?: Record<string, unknown>): void => {
    writeLog('info', message, context);
  },
  warn: (message: string, context?: Record<string, unknown>): void => {
    writeLog('warn', message, context);
  },
  error: (message: string, context?: Record<string, unknown>): void => {
    writeLog('error', message, context);
  },
};