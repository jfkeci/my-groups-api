import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { CreatePostDto } from '../dto/create-options.dto';

@Injectable()
export class PollOptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async createOptions(data: CreatePostDto) {
    const options = await this.prisma.poll_options.createMany({
      data: data.options
    });

    if (!options) {
      throw new BadRequestException('Failed to create options');
    }

    return options;
  }
}
