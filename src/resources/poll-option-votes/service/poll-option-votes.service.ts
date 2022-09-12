import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { AddVoteToOptionDto } from '../dto/add-vote-to-option.dto';
import { RemoveVoteFromOptionDto } from '../dto/remove-vote-from-option.dto';

@Injectable()
export class PollOptionVotesService {
  constructor(private readonly prisma: PrismaService) {}

  async addVoteToOption(data: AddVoteToOptionDto) {
    const user = await this.prisma.users.findUnique({
      where: { id: data.userId }
    });

    if (!user) throw new NotFoundException('MYBnfe001');

    const poll = await this.prisma.posts.findUnique({
      where: { id: data.pollId }
    });

    if (!poll) {
      throw new NotFoundException('MYBnfe012');
    }

    const existingVote = await this.prisma.poll_option_votes.findFirst({
      where: {
        poll: data.pollId,
        user: data.userId,
        option: data.optionId
      }
    });

    if (existingVote) {
      throw new ConflictException('MYBcfe006');
    }

    const vote = await this.prisma.poll_option_votes.create({
      data: {
        poll: data.pollId,
        user: data.userId,
        option: data.optionId
      }
    });

    if (!vote) {
      throw new BadRequestException('MYBbre013');
    }

    return vote;
  }

  async removeVoteFromOption(data: RemoveVoteFromOptionDto) {
    if (!data.voteId && (!data.pollId || !data.optionId || !data.userId)) {
      throw new BadRequestException('MYBbre014');
    }

    if (data.voteId) {
      const vote = await this.prisma.poll_option_votes.findUnique({
        where: { id: data.voteId }
      });

      if (!vote) {
        throw new NotFoundException('MYBnfe013');
      }

      await this.prisma.poll_option_votes.delete({
        where: { id: data.voteId }
      });

      return vote;
    }

    const vote = await this.prisma.poll_option_votes.findFirst({
      where: {
        poll: data.pollId,
        user: data.userId,
        option: data.optionId
      }
    });

    if (!vote) {
      throw new NotFoundException('MYBnfe013');
    }

    await this.prisma.poll_option_votes.delete({ where: { id: vote.id } });

    return vote;
  }
}
