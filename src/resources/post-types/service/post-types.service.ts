import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleInit
} from '@nestjs/common';
import { UsersService } from 'src/resources/users/service/users.service';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { defaultPostTypes } from '../default-type-structure';
import { CreatePostTypeDto } from '../dto/create-post-type.dto';
import { UpdatePostTypeDto } from '../dto/update-post-type.dto';

@Injectable()
export class PostTypesService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService
  ) {}

  async onModuleInit() {
    await this.createDefaultPostTypes();
  }

  async createDefaultPostTypes() {
    for (const postType of defaultPostTypes) {
      const existingPostType = await this.prisma.posttypes.findUnique({
        where: { id: postType.id }
      });

      if (!existingPostType) {
        await this.prisma.posttypes.create({
          data: { ...postType }
        });
      }
    }
  }

  async createOne(data: CreatePostTypeDto) {
    const existingPostType = await this.prisma.posttypes.findUnique({
      where: { id: data.id }
    });

    if (existingPostType) {
      throw new ConflictException('Post type with this id already exists');
    }

    const postType = await this.prisma.posttypes.create({
      data: data
    });

    if (!postType) throw new BadRequestException('Failed to create post type');

    return postType;
  }

  async getPostTypes() {
    const postTypes = await this.prisma.posttypes.findMany({ where: {} });

    if (!postTypes || !postTypes.length) {
      throw new NotFoundException('No post types found');
    }

    return postTypes;
  }

  async findMany(query) {
    const posts = await this.prisma.posttypes.findMany({
      where: query
    });

    if (!posts || !posts.length) {
      throw new NotFoundException('No posts found');
    }

    return posts;
  }

  async updateOne(query, data: UpdatePostTypeDto) {
    const post = await this.prisma.posttypes.update({
      where: query,
      data
    });

    if (!post) throw new BadRequestException('Failed to update post');

    return post;
  }

  async deleteOne(query) {
    const post = await this.prisma.posttypes.delete({ where: query });

    if (!post) throw new BadRequestException('Failed to delete post');

    return post;
  }

  async findUnique(query) {
    const post = await this.prisma.posttypes.findUnique({
      where: query
    });

    if (!post) throw new BadRequestException('No post found');

    return post;
  }

  async _update(query, data: UpdatePostTypeDto) {
    return await this.prisma.posttypes.update({ where: query, data });
  }

  async _updateMany(query, data: UpdatePostTypeDto) {
    return await this.prisma.posttypes.updateMany({ where: query, data });
  }

  async _delete(query) {
    return await this.prisma.posttypes.delete({ where: query });
  }

  async _deleteMany(query) {
    return await this.prisma.posttypes.deleteMany({ where: query });
  }

  async _findMany(query) {
    return await this.prisma.posttypes.findMany({ where: query });
  }

  async _findFirst(query) {
    return await this.prisma.posttypes.findFirst({ where: query });
  }

  async _findUnique(query) {
    return await this.prisma.posttypes.findUnique({ where: query });
  }
}
