import * as Joi from 'joi';

export default (): Joi.ObjectSchema<any> =>
  Joi.object({
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string().default('development'),
    APP_ROUTE_PREFIX: Joi.string().default('api'),
    DATABASE_URL: Joi.string().exist(),
    BASE_URL: Joi.string().exist()
  });
