import { Controller, Get, Param, Res } from '@nestjs/common';
import { AssetsService } from '../service/assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}
}
