import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/utilities/prisma/prisma.service';

@Injectable()
export class PollOptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPollOptions(pollId: number) {
    const options = await this.prisma.poll_options.findMany({
      where: { poll: pollId }
    });

    if (!options || !options.length) {
      throw new NotFoundException('MYBnfe014');
    }

    return options;
  }
}
