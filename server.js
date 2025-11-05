const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

// Log file setup
const logFile = '/var/log/cvenom.log';

// Ensure log directory exists
const logDir = path.dirname(logFile);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Custom logger
const logger = {
  log: (level, message, ...args) => {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} [${level.toUpperCase()}] ${message} ${args.length ? JSON.stringify(args) : ''}\n`;

    // Write to file
    fs.appendFileSync(logFile, logEntry);

    // Also log to console in dev
    if (dev) {
      console.log(`[${level.toUpperCase()}]`, message, ...args);
    }
  },
  info: (message, ...args) => logger.log('info', message, ...args),
  error: (message, ...args) => logger.log('error', message, ...args),
  warn: (message, ...args) => logger.log('warn', message, ...args),
};

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    const startTime = Date.now();

    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);

      const duration = Date.now() - startTime;
      logger.info(`${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
    } catch (err) {
      logger.error('Request error:', req.url, err.message);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, (err) => {
    if (err) {
      logger.error('Server startup error:', err.message);
      throw err;
    }
    logger.info(`Server ready on http://${hostname}:${port}`);
  });
});

// Handle process termination
process.on('SIGTERM', () => {
  logger.info('Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('Received SIGINT, shutting down gracefully');
  process.exit(0);
});
