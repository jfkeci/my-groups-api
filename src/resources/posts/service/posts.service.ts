import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import {
  userSelectFields,
  UsersService
} from 'src/resources/users/service/users.service';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { hasUniqueProperties } from 'src/utilities/utils/unique-array-util';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

export enum PostTypes {
  INFO = 'info',
  EVENT = 'event',
  POLL = 'poll'
}

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService
  ) {}

  async createOne(data: CreatePostDto) {
    if (data.type == PostTypes.POLL) {
      if (!data.options || !data.options.length) {
        throw new BadRequestException('MYBbre015');
      }

      if (!hasUniqueProperties(data.options, 'option')) {
        throw new BadRequestException('MYBbre016');
      }
    }

    if (data.type == PostTypes.EVENT) {
      if (!data.date) {
        throw new BadRequestException('MYBbre017');
      }
    }

    const user = await this.userService._findUnique({
      id: Number(data.createdBy)
    });

    if (!user) throw new NotFoundException('MYBnfe001');

    const community = await this.prisma.communities.findFirst({
      where: { id: data.community }
    });

    if (!community) {
      throw new NotFoundException('MYBnfe003');
    }

    const communityMember = await this.prisma.community_members.findFirst({
      where: {
        user: data.createdBy,
        community: data.community
      }
    });

    if (!communityMember) {
      throw new NotFoundException('User is not a member of this community');
    }

    const post = await this.prisma.posts.create({
      data: {
        createdBy: data.createdBy,
        community: data.community,
        title: data.title,
        type: data.type,
        image: data?.image ?? null,
        body: data?.body ?? null,
        date: data?.date ?? null
      }
    });

    if (!post) throw new BadRequestException('MYBbre018');

    if (data.type == PostTypes.POLL) {
      const options = await this.prisma.poll_options.createMany({
        data: data.options.map((o) => ({ option: o.option, poll: post.id }))
      });

      if (!options) {
        throw new BadRequestException('MYBbre019');
      }
    }

    if (data.type == PostTypes.EVENT) {
      const eventUser = await this.prisma.event_users.create({
        data: {
          event: post.id,
          user: data.createdBy
        }
      });

      if (!eventUser) {
        throw new BadRequestException('MYBbre011');
      }
    }

    return post;
  }

  async findMany(query) {
    const posts = await this.prisma.posts.findMany({
      where: query
    });

    if (!posts || !posts.length) {
      throw new NotFoundException('MYBnfe015');
    }

    return posts;
  }

  async updateOne(query, data: UpdatePostDto) {
    const post = await this.prisma.posts.update({
      where: query,
      data
    });

    if (!post) throw new BadRequestException('MYBbre020');

    return post;
  }

  async deleteOne(query) {
    const post = await this.prisma.posts.delete({ where: query });

    if (!post) throw new BadRequestException('MYBbre021');

    return post;
  }

  async findUnique(query) {
    const post = await this.prisma.posts.findUnique({
      where: query,
      include: {
        comments: { include: { users: { select: userSelectFields } } },
        users: { select: userSelectFields },
        poll_options: {
          include: {
            poll_option_votes: {
              include: { users: { select: userSelectFields } }
            }
          }
        },
        event_users: { include: { users: { select: userSelectFields } } }
      }
    });

    if (!post) throw new NotFoundException('MYBnfe008');

    return post;
  }

  async _update(query, data: UpdatePostDto) {
    return await this.prisma.posts.update({ where: query, data });
  }

  async _updateMany(query, data: UpdatePostDto) {
    return await this.prisma.posts.updateMany({ where: query, data });
  }

  async _delete(query) {
    return await this.prisma.posts.delete({ where: query });
  }

  async _deleteMany(query) {
    return await this.prisma.posts.deleteMany({ where: query });
  }

  async _findMany(query) {
    return await this.prisma.posts.findMany({ where: query });
  }

  async _findFirst(query) {
    return await this.prisma.posts.findFirst({ where: query });
  }

  async _findUnique(query) {
    return await this.prisma.posts.findUnique({ where: query });
  }
}
