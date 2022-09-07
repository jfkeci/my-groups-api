import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WinstonLogger, WINSTON_MODULE_PROVIDER } from 'nest-winston';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method } = req;
    const userAgent = req.get('user-agent');

    res.on('close', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      this.logger.log(
        'http',
        `[${ip}-${userAgent}] - [${method}] -> [${req.url}] [${statusCode}, ${contentLength}]`
      );

      if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        if (process.env.NODE_ENV == 'development') {
          this.logger.log('http', 'BODY: ' + JSON.stringify(req.body));
        }
      }
    });

    next();
  }
}
