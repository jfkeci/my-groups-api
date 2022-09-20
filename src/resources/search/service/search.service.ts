import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utilities/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchUsers(text: string, order?: string) {
    let users = await this.prisma.users.findMany({
      where: {
        OR: [
          { firstName: { contains: text } },
          { lastName: { contains: text } },
          { username: { contains: text } }
        ]
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        image: true,
        community_members: true
      }
    });

    if (!users || !users.length) return [];

    users = users.map((u) => ({
      ...u,
      communities: u.community_members.map((cm) => cm.community),
      community_members: []
    }));

    return users;
  }
}
