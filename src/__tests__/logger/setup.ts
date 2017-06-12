import { createLogger } from '../../logger';
import pkg from '../../../package.json';

const logger = createLogger({ serviceName: pkg.name });

logger.debug(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
export { logger };
