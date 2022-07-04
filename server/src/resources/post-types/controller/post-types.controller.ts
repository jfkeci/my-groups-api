import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostTypesService } from '../service/post-types.service';
import { CreatePostTypeDto } from '../dto/create-post-type.dto';
import { UpdatePostTypeDto } from '../dto/update-post-type.dto';

@Controller('post-types')
export class PostTypesController {
  constructor(private readonly postTypesService: PostTypesService) {}
}
