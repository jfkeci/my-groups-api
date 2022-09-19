import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { UsersService } from 'src/resources/users/service/users.service';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { AddUserToEventDto } from '../dto/add-user-to-event.dto';
import { RemoveUserFromEventDto } from '../dto/remove-user-from-event.dto';
import { ToggleEventUserDto } from '../dto/toggle-event-user.dto';

@Injectable()
export class EventUsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService
  ) {}

  async addUserToEvent(data: AddUserToEventDto) {
    const user = await this.prisma.users.findUnique({
      where: { id: data.userId }
    });

    if (!user) {
      throw new NotFoundException('MYBnfe001');
    }
    const event = await this.prisma.posts.findUnique({
      where: { id: data.eventId }
    });

    if (!event) {
      throw new NotFoundException('MYBnfe010');
    }

    const existingEventUser = await this.prisma.event_users.findFirst({
      where: {
        user: data.userId,
        event: data.eventId
      }
    });

    if (existingEventUser) {
      throw new ConflictException('MYBcfe005');
    }

    const eventUser = await this.prisma.event_users.create({
      data: {
        user: data.userId,
        event: data.eventId
      }
    });

    if (!eventUser) {
      throw new BadRequestException('MYBbre011');
    }

    return eventUser;
  }

  async removeEventUser(data: RemoveUserFromEventDto) {
    if (!data.eventUserId && (!data.eventId || !data.userId)) {
      throw new BadRequestException('MYBbre012');
    }

    if (data.eventUserId) {
      const eventUser = await this.prisma.event_users.findUnique({
        where: { id: data.eventUserId }
      });

      if (!eventUser) {
        throw new NotFoundException('MYBnfe011');
      }

      await this.prisma.event_users.delete({
        where: { id: data.eventUserId }
      });

      return eventUser;
    }

    const eventUser = await this.prisma.event_users.findFirst({
      where: {
        event: data.eventId,
        user: data.userId
      }
    });

    if (!eventUser) {
      throw new NotFoundException('MYBnfe011');
    }

    await this.prisma.event_users.delete({ where: { id: eventUser.id } });

    return eventUser;
  }

  async toggleEventUser(data: ToggleEventUserDto) {
    const user = await this.prisma.users.findUnique({
      where: { id: Number(data.user) }
    });

    if (!user) throw new NotFoundException('MYBnfe001');

    const post = await this.prisma.posts.findUnique({
      where: { id: Number(data.event) }
    });

    if (!post) throw new NotFoundException('MYBnfe001');

    const eventUser = await this.prisma.event_users.findFirst({ where: data });

    if (eventUser) {
      await this.prisma.event_users.deleteMany({ where: data });
    } else {
      await this.prisma.event_users.create({ data: data });
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
