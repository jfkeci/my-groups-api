import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';

export const userSelectFields = {
  id: true,
  firstName: true,
  lastName: true,
  username: true,
  image: true,
  isAdmin: true
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOne(data: CreateUserDto) {
    const user = await this._create(data);

    if (!user) throw new BadRequestException('MYBbre003');

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

    if (!user) throw new NotFoundException('MYBnfe001');

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
      throw new NotFoundException('MYBnfe016');
    }

    return communities;
  }

  async getUserCommunityPosts(
    userId: number,
    communityId: number,
    createdBy?: boolean
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
      },
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

    if (!posts || !posts.length) {
      throw new NotFoundException('MYBnfe017');
    }

    return posts;
  }

  async getUserPostsForAllCommunities(userId: number, createdBy?: boolean) {
    const memberships = await this.prisma.community_members.findMany({
      where: { user: userId },
      include: { communities: { select: { id: true } } }
    });

    if (!memberships) {
      throw new NotFoundException('MYBnfe018');
    }

    const posts = await this.prisma.posts.findMany({
      where: {
        AND: memberships.map((m) => ({ community: m.communities.id }))
      },
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

    if (!posts || !posts.length) {
      throw new NotFoundException('MYBnfe015');
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

    if (!user) throw new NotFoundException('MYBnfe001');

    return user;
  }

  async _create(data: any) {
    return await this.prisma.users.create({ data });
  }

  async _findOne(query: Record<string, any>) {
    return await this.prisma.users.findFirst({ where: query });
  }
}
