import joi from 'joi';
import { logger } from './setup';

const schema = joi.object().keys({
  to: joi.string().required(),
  from: joi.string().required(),
  subject: joi.string().required()
});

describe('logger with joi', () => {
  it('#error', () => {
    const mailData = { to: '', from: '', subject: '' };
    const validationResult = joi.validate(mailData, schema);
    logger.error(validationResult.error, { context: 'validate mail data' });
  });
});
