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
        throw new BadRequestException('Mission poll post options');
      }

      if (!hasUniqueProperties(data.options, 'option')) {
        throw new BadRequestException('Options must be unique');
      }
    }

    if (data.type == PostTypes.EVENT) {
      if (!data.date) {
        throw new BadRequestException('Event needs date and time');
      }
    }

    const user = await this.userService._findUnique({
      id: Number(data.createdBy)
    });

    if (!user) throw new NotFoundException('No user found');

    const community = await this.prisma.communities.findFirst({
      where: { id: data.community }
    });

    if (!community) {
      throw new NotFoundException('No community found');
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

    if (!post) throw new BadRequestException('Failed to create post');

    if (data.type == PostTypes.POLL) {
      const options = await this.prisma.poll_options.createMany({
        data: data.options.map((o) => ({ option: o.option, poll: post.id }))
      });

      if (!options) {
        throw new BadRequestException('Failed to create poll options');
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
        throw new BadRequestException('Failed to add user to event');
      }
    }

    return post;
  }

  async findMany(query) {
    const posts = await this.prisma.posts.findMany({
      where: query
    });

    if (!posts || !posts.length) {
      throw new NotFoundException('No posts found');
    }

    return posts;
  }

  async updateOne(query, data: UpdatePostDto) {
    const post = await this.prisma.posts.update({
      where: query,
      data
    });

    if (!post) throw new BadRequestException('Failed to update post');

    return post;
  }

  async deleteOne(query) {
    const post = await this.prisma.posts.delete({ where: query });

    if (!post) throw new BadRequestException('Failed to delete post');

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

    if (!post) throw new BadRequestException('No post found');

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
