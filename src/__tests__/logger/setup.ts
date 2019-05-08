import { createLogger } from '../../logger';
import pkg from '../../../package.json';

const logger = createLogger({ serviceName: pkg.name });

export { logger };
