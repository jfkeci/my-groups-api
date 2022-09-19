import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/resources/users/service/users.service';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { ToggleVoteDto } from '../dto/toggle-vote.dto';

@Injectable()
export class PollOptionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService
  ) {}

  async getPollOptions(pollId: number) {
    const options = await this.prisma.poll_options.findMany({
      where: { poll: pollId }
    });

    if (!options || !options.length) {
      throw new NotFoundException('MYBnfe014');
    }

    return options;
  }

  async toggleOptionVote(data: ToggleVoteDto) {
    const user = await this.prisma.users.findUnique({
      where: { id: Number(data.user) }
    });

    if (!user) throw new NotFoundException('MYBnfe001');

    const post = await this.prisma.posts.findUnique({
      where: { id: Number(data.poll) }
    });

    if (!post) throw new NotFoundException('MYBnfe001');

    const option = await this.prisma.poll_options.findUnique({
      where: { id: Number(data.option) }
    });

    if (!option) throw new NotFoundException('MYBnfe001');

    const pollOptionVote = await this.prisma.poll_option_votes.findFirst({
      where: data
    });

    if (pollOptionVote) {
      await this.prisma.poll_option_votes.deleteMany({ where: data });
    } else {
      await this.prisma.poll_option_votes.create({ data });
    }

    let posts;

    if (post.community) {
      posts = await this.userService.getUserCommunityPosts(
        Number(data.user),
        Number(post.community)
      );
    } else {
      posts = await this.userService.getUserPostsForAllCommunities(
        Number(data.user)
      );
    }

    return posts;
  }
}
