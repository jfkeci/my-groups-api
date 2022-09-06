import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { UsersService } from 'src/resources/users/service/users.service';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
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

    const options = await this.prisma.poll_options.createMany({
      data: data.options
    });

    if (!options) {
      throw new BadRequestException('Failed to create poll options');
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
      where: query
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
