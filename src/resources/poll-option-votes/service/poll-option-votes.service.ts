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

    if (!user) throw new NotFoundException('No user found');

    const poll = await this.prisma.posts.findUnique({
      where: { id: data.pollId }
    });

    if (!poll) {
      throw new NotFoundException('No poll found');
    }

    const existingVote = await this.prisma.poll_option_votes.findFirst({
      where: {
        poll: data.pollId,
        user: data.userId,
        option: data.optionId
      }
    });

    if (existingVote) {
      throw new ConflictException('User already voted for this option');
    }

    const vote = await this.prisma.poll_option_votes.create({
      data: {
        poll: data.pollId,
        user: data.userId,
        option: data.optionId
      }
    });

    if (!vote) {
      throw new BadRequestException('Fauiled to add vote to option');
    }
  }

  async removeVoteFromOption(data: RemoveVoteFromOptionDto) {
    if (!data.voteId && (!data.pollId || !data.optionId || !data.userId)) {
      throw new BadRequestException(
        'Either pass voteId or poll, option and user id'
      );
    }

    if (data.voteId) {
      const vote = await this.prisma.poll_option_votes.findUnique({
        where: { id: data.voteId }
      });

      if (!vote) {
        throw new NotFoundException('No option vote found');
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
      throw new NotFoundException('No option vote found');
    }

    await this.prisma.poll_option_votes.delete({ where: { id: vote.id } });

    return vote;
  }
}
