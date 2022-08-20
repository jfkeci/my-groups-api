import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { UsersService } from 'src/resources/users/service/users.service';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService
  ) {}

  async createOne(data: CreatePostDto) {
    this.validatePostType(data);

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

    const postType = await this.prisma.posttypes.findFirst({
      where: {
        id: data.type
      }
    });

    if (!postType) {
      throw new NotFoundException('No post type found for ' + data.type);
    }

    const post = await this.prisma.posts.create({ data });

    if (!post) throw new BadRequestException('Failed to create post');

    return post;
  }

  validatePostType(data: CreatePostDto) {
    if (data.type == 'event') {
      //
    }

    if (data.type == 'poll') {
      if (!data.structure.options) {
        throw new BadRequestException('Missing poll options');
      }

      if (!data.structure.options.length) {
        throw new BadRequestException('Missing poll options');
      }

      if (data.structure.options.length < 2) {
        throw new BadRequestException('Poll needs at least two options');
      }

      for (const option of data.structure.options) {
        if (!option.id) {
          throw new BadRequestException('Mission option id');
        }

        if (!option.title) {
          throw new BadRequestException('Missing option title');
        }

        if (!(option.users instanceof Array)) {
          throw new BadRequestException(
            'Option users property must be an array'
          );
        }

        let filtered = data.structure.options.filter((o) => o.id == option.id);

        if (filtered.length > 1) {
          throw new BadRequestException('Option ids must be unique');
        }

        filtered = data.structure.options.filter(
          (o) => o.title == option.title
        );

        if (filtered.length > 1) {
          throw new BadRequestException('Option title must be unique');
        }
      }
    }

    if (data.type == 'info') {
      if (data.structure != {}) {
        throw new BadRequestException('Invalid info post structure');
      }
    }
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
