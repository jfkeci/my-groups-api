import { BadRequestException, Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, data: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async _create(data: any) {
    return await this.prisma.users.create({ data });
  }
}
