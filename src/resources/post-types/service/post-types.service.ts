import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { UsersService } from 'src/resources/users/service/users.service';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { CreatePostTypeDto } from '../dto/create-post-type.dto';
import { UpdatePostTypeDto } from '../dto/update-post-type.dto';

@Injectable()
export class PostTypesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService
  ) {}

  async createOne(data: CreatePostTypeDto) {
    const user = await this.userService._findUnique({
      id: Number(data.createdBy)
    });

    if (!user) throw new NotFoundException('No user found');

    const postType = await this.prisma.postTypes.create({ data });

    if (!postType) throw new BadRequestException('Failed to create post type');

    return postType;
  }

  async findMany(query) {
    const posts = await this.prisma.postTypes.findMany({
      where: query
    });

    if (!posts || !posts.length) {
      throw new NotFoundException('No posts found');
    }

    return posts;
  }

  async updateOne(query, data: UpdatePostTypeDto) {
    const post = await this.prisma.postTypes.update({
      where: query,
      data
    });

    if (!post) throw new BadRequestException('Failed to update post');

    return post;
  }

  async deleteOne(query) {
    const post = await this.prisma.postTypes.delete({ where: query });

    if (!post) throw new BadRequestException('Failed to delete post');

    return post;
  }

  async findUnique(query) {
    const post = await this.prisma.postTypes.findUnique({
      where: query
    });

    if (!post) throw new BadRequestException('No post found');

    return post;
  }

  async _update(query, data: UpdatePostTypeDto) {
    return await this.prisma.postTypes.update({ where: query, data });
  }

  async _updateMany(query, data: UpdatePostTypeDto) {
    return await this.prisma.postTypes.updateMany({ where: query, data });
  }

  async _delete(query) {
    return await this.prisma.postTypes.delete({ where: query });
  }

  async _deleteMany(query) {
    return await this.prisma.postTypes.deleteMany({ where: query });
  }

  async _findMany(query) {
    return await this.prisma.postTypes.findMany({ where: query });
  }

  async _findFirst(query) {
    return await this.prisma.postTypes.findFirst({ where: query });
  }

  async _findUnique(query) {
    return await this.prisma.postTypes.findUnique({ where: query });
  }
}
