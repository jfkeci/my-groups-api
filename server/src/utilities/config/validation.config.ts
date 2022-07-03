import * as Joi from 'joi';

export default (): Joi.ObjectSchema<any> =>
  Joi.object({
    DATABASE_URL: Joi.string().exist(),
    APP_ROUTE_PREFIX: Joi.string().default('api'),
    PORT: Joi.number().default(13372),
  });
