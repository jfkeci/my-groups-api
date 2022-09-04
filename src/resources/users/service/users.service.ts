import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOne(data: CreateUserDto) {
    const user = await this._create(data);

    if (!user) throw new BadRequestException('Failed to create user');

    return user;
  }

  async _findMany(query: any) {
    await this.prisma.users.findMany(query);
  }

  async _findFirst(query) {
    return await this.prisma.users.findFirst({ where: query });
  }

  async _findUnique(query) {
    return await this.prisma.users.findUnique({ where: query });
  }

  async findOne(userId: number) {
    const user = await this.prisma.users.findFirst({
      where: { id: userId }
    });

    if (!user) throw new NotFoundException('No user found');

    return user;
  }

  async getUserCommunities(userId: number) {
    const communities = await this.prisma.community_members.findMany({
      where: { user: userId },
      include: {
        communities: {
          select: {
            id: true,
            title: true,
            description: true
          }
        }
      }
    });

    if (!communities || !communities.length) {
      throw new NotFoundException(
        'No communities found for user, please create a new community'
      );
    }

    return communities;
  }

  async getUserCommunityPosts(
    userId: number,
    communityId: number,
    createdBy: boolean
  ) {
    const memberships = await this.prisma.community_members.findMany({
      where: { user: userId },
      include: { communities: { select: { id: true } } }
    });

    if (!memberships || !memberships.length) {
      throw new ForbiddenException('User is not a member of this community');
    }

    const postsQuery: any[] = [{ community: communityId }];

    if (createdBy) {
      postsQuery.push({ createdBy: userId });
    }

    const posts = await this.prisma.posts.findMany({
      where: {
        AND: postsQuery
      }
    });

    if (!posts || !posts.length) {
      throw new NotFoundException('No posts found for user');
    }

    return posts;
  }

  async getUserPostsForAllCommunities(userId: number, createdBy: boolean) {
    const memberships = await this.prisma.community_members.findMany({
      where: { user: userId },
      include: { communities: { select: { id: true } } }
    });

    if (!memberships) {
      throw new NotFoundException('No communities that user belongs to found');
    }

    const posts = await this.prisma.posts.findMany({
      where: {
        AND: memberships.map((m) => ({ community: m.communities.id }))
      }
    });

    if (!posts || !posts.length) {
      throw new NotFoundException('No posts found');
    }

    return posts;
  }

  async updateUser(userId: number, data: any) {
    //
  }

  async deleteUser(userId: number) {
    const user = await this.prisma.users.delete({
      where: { id: Number(userId) }
    });

    if (!user) throw new NotFoundException('No user found');

    return user;
  }

  async _create(data: any) {
    return await this.prisma.users.create({ data });
  }

  async _findOne(query: Record<string, any>) {
    return await this.prisma.users.findFirst({ where: query });
  }
}
