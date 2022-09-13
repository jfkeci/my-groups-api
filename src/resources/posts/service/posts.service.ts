import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import {
  userSelectFields,
  UsersService
} from 'src/resources/users/service/users.service';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { hasUniqueProperties } from 'src/utilities/utils/unique-array-util';
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
    // Ako je tip objave "poll" (anketa)
    // Provjerava se jesu li sa klijentske strane proslijedene opcije ankete
    if (data.type == PostTypes.POLL) {
      // Provjera valjanosti opcija ankete
      if (!data.options || !data.options.length) {
        // Ako opcije nisu proslijedene, server vraca gresku
        throw new BadRequestException('MYBbre015'); // Missing poll post options
      }

      // Metoda "hasUniqueProperties" provjerava je li svaka opcija ankete jedinstvena
      if (!hasUniqueProperties(data.options, 'option')) {
        // Ako postoji dvije ili više istih opcija, server vraća grešku
        throw new BadRequestException('MYBbre016'); // Options must be unique
      }
    }

    // Ako je tip objave "event" (dogadaj)
    // Provjerava se je li sa klijentske strane proslijedeno svojstvo "date"

    if (data.type == PostTypes.EVENT) {
      // Svojstvo "date" oznacava datum dogadaja te ako nije proslijedeno server vraca gresku
      if (!data.date) {
        throw new BadRequestException('MYBbre017'); // Event needs date and time
      }
    }

    // Trazenje korisnika u bazi sa "createdBy" svojstvom "CreatePostDto" klase
    const user = await this.userService._findUnique({
      id: Number(data.createdBy)
    });
    // Ako korisnik ne postoji, server vraca gresku
    if (!user) throw new NotFoundException('MYBnfe001');
    // Trazenje zajednice u bazi sa "community" svojstvom "CreatePostDto" klase
    const community = await this.prisma.communities.findFirst({
      where: { id: data.community }
    });
    // Ako zajednica ne postoji, server vraca gresku
    if (!community) {
      throw new NotFoundException('MYBnfe003');
    }

    // Ako korisnik nije super admin, provjerava se je li zapravo clan zajednice
    if (!user.isAdmin) {
      // Dohvacanje zapisa iz tablice "community_members"
      const communityMember = await this.prisma.community_members.findFirst({
        where: {
          user: data.createdBy,
          community: data.community
        }
      });
      // Ako na temelju identifikatora zajednice i korisnika
      //   nije pronaden zapis u tablici "community_members"
      // Server tada vraca gresku
      if (!communityMember) {
        throw new NotFoundException('User is not a member of this community');
      }
    }

    // Nakon svih provjera kreira se novi zapis u tablici "posts", tj. nova objava
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
    // Ako objava nije uspjesno kreirana server vraca gresku
    if (!post) throw new BadRequestException('MYBbre018');

    // U slucaju ako se kreira anketna objava
    // Potrebno je spremiti opcije ankete u tablicu "poll_options"
    if (data.type == PostTypes.POLL) {
      // Umetanje vise zapisa u "poll_options" tablicu pomocu "createMany" metode
      const options = await this.prisma.poll_options.createMany({
        // Restrukturiranje objekata unutar polja opcija tako da imaju referencu na objavu
        data: data.options.map((o) => ({ option: o.option, poll: post.id }))
      });

      // Ako PrismaORM ne uspije kreirati opcije, server vraca gresku
      if (!options) {
        throw new BadRequestException('MYBbre019');
      }
    }

    // U slucaju ako se kreira anketna objava
    // Potrebno je dodati osobu koja je kreirala dogadaj u tablicu "event_users"
    if (data.type == PostTypes.EVENT) {
      // Kreiranje zapisa u tablicu "event_users"
      const eventUser = await this.prisma.event_users.create({
        data: {
          event: post.id,
          user: data.createdBy
        }
      });

      // Ako PrismaORM ne uspije kreirati zapis u "event_users" tablicu, server vraca gresku
      if (!eventUser) {
        throw new BadRequestException('MYBbre011');
      }
    }

    // Vracanje novo kreiranog zapisa
    return post;

    // Kraj metode
  }

  async findMany(query) {
    const posts = await this.prisma.posts.findMany({
      where: query
    });

    if (!posts || !posts.length) {
      throw new NotFoundException('MYBnfe015');
    }

    return posts;
  }

  async updateOne(query, data: UpdatePostDto) {
    const post = await this.prisma.posts.update({
      where: query,
      data
    });

    if (!post) throw new BadRequestException('MYBbre020');

    return post;
  }

  async deleteOne(query) {
    const post = await this.prisma.posts.delete({ where: query });

    if (!post) throw new BadRequestException('MYBbre021');

    return post;
  }

  async findUnique(query) {
    const post = await this.prisma.posts.findUnique({
      where: query,
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

    if (!post) throw new NotFoundException('MYBnfe008');

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
