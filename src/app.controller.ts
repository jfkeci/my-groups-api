import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get()
  healthcheck() {
    return `Healthcheck ${new Date()}`;
  }
}
