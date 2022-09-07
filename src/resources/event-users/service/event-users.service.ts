import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { AddUserToEventDto } from '../dto/add-user-to-event.dto';
import { RemoveUserFromEventDto } from '../dto/remove-user-from-event.dto';

@Injectable()
export class EventUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async addUserToEvent(data: AddUserToEventDto) {
    const user = await this.prisma.users.findUnique({
      where: { id: data.userId }
    });

    if (!user) {
      throw new NotFoundException('No user found');
    }
    const event = await this.prisma.posts.findUnique({
      where: { id: data.eventId }
    });

    if (!event) {
      throw new NotFoundException('No event found');
    }

    const existingEventUser = await this.prisma.event_users.findFirst({
      where: {
        user: data.userId,
        event: data.eventId
      }
    });

    if (existingEventUser) {
      throw new ConflictException('User is already a part of this event');
    }

    const eventUser = await this.prisma.event_users.create({
      data: {
        user: data.userId,
        event: data.eventId
      }
    });

    if (!eventUser) {
      throw new BadRequestException('Failed to add user to event');
    }

    return eventUser;
  }

  async removeEventUser(data: RemoveUserFromEventDto) {
    if (!data.eventUserId && (!data.eventId || !data.userId)) {
      throw new BadRequestException(
        'Either pass eventUserId or event and user id'
      );
    }

    if (data.eventUserId) {
      const eventUser = await this.prisma.event_users.findUnique({
        where: { id: data.eventUserId }
      });

      if (!eventUser) {
        throw new NotFoundException('No event user found');
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
      throw new NotFoundException('No event user found');
    }

    await this.prisma.event_users.delete({ where: { id: eventUser.id } });

    return eventUser;
  }
}
