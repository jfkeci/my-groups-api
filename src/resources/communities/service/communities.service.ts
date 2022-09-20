import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import {
  userSelectFields,
  UsersService
} from 'src/resources/users/service/users.service';
import { CreateCommunityDto } from '../dto/create-community.dto';
import { UpdateCommunityDto } from '../dto/update-community.dto';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { CommunityUserDto } from 'src/resources/community-users/dto/community-user.dto';

@Injectable()
export class CommunitiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService
  ) {}

  async createOne(data: CreateCommunityDto) {
    const user = await this.userService._findUnique({
      id: Number(data.createdBy)
    });

    if (!user) throw new NotFoundException('MYBnfe001'); // No user found

    const community = await this.prisma.communities.create({ data });

    if (!community) throw new BadRequestException('MYBbre007');

    await this.prisma.community_members.create({
      data: {
        community: community.id,
        user: data.createdBy
      }
    });

    await this.prisma.community_admins.create({
      data: {
        community: community.id,
        user: data.createdBy
      }
    });

    return community;
  }

  async findMany(query) {
    const communities = await this.prisma.communities.findMany({
      where: query
    });

    if (!communities || !communities.length) {
      throw new NotFoundException('MYBnfe004');
    }

    return communities;
  }

  async updateOne(query, data: UpdateCommunityDto) {
    const community = await this.prisma.communities.update({
      where: query,
      data
    });

    if (!community) throw new BadRequestException('MYBbre008');

    return community;
  }

  async deleteOne(query) {
    const community = await this.prisma.communities.delete({ where: query });

    if (!community) throw new BadRequestException('MYBbre009');

    return community;
  }

  async getCommunityUsers(communityId: number) {
    const community = await this.prisma.communities.findUnique({
      where: { id: communityId },
      include: {
        community_members: { include: { users: { select: userSelectFields } } }
      }
    });

    if (!community) throw new NotFoundException('MYBnfe003');

    return community;
  }

  async findUnique(query) {
    const community = await this.prisma.communities.findUnique({
      where: query,
      include: {
        community_members: { include: { users: { select: userSelectFields } } },
        community_admins: { include: { users: { select: userSelectFields } } },
        users: { select: userSelectFields }
      }
    });

    if (!community) throw new NotFoundException('MYBnfe003');

    return community;
  }

  async _update(query, data: UpdateCommunityDto) {
    return await this.prisma.communities.update({ where: query, data });
  }

  async _updateMany(query, data: UpdateCommunityDto) {
    return await this.prisma.communities.updateMany({ where: query, data });
  }

  async _delete(query) {
    return await this.prisma.communities.delete({ where: query });
  }

  async _deleteMany(query) {
    return await this.prisma.communities.deleteMany({ where: query });
  }

  async _findMany(query) {
    return await this.prisma.communities.findMany({ where: query });
  }

  async _findFirst(query) {
    return await this.prisma.communities.findFirst({ where: query });
  }

  async _findUnique(query) {
    return await this.prisma.communities.findUnique({ where: query });
  }

  async isUserCommunityAdmin(data: CommunityUserDto) {
    const community = await this.prisma.communities.findUnique({
      where: { id: Number(data.community) }
    });

    if (!community) return false;

    const user = await this.prisma.users.findUnique({
      where: { id: Number(data.user) }
    });

    if (!user) return false;

    if (user.isAdmin) return true;

    if (community.createdBy == data.user) return true;

    return false;
  }

  async isUserCommunityMember(data: CommunityUserDto) {
    const community = await this.prisma.communities.findUnique({
      where: { id: Number(data.community) }
    });

    if (!community) return false;

    const user = await this.prisma.users.findUnique({
      where: { id: Number(data.user) }
    });

    if (!user) return false;

    const community_member = await this.prisma.community_members.findFirst({
      where: {
        user: Number(data.user),
        community: Number(data.community)
      }
    });

    if (community_member) return true;

    return false;
  }
}
