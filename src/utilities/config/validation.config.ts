import * as Joi from 'joi';

export default (): Joi.ObjectSchema<any> =>
  Joi.object({
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string().default('development'),
    DATABASE_URL: Joi.string().exist(),
    BASE_URL: Joi.string().exist(),
    VUE_APP_URL: Joi.string().exist()
  });
