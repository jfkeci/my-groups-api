import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOne(createUserDto?: CreateUserDto) {
    const user = await this._create({
      username: 'jfkeci',
      email: 'jfkeci@gmail.com',
      password: '123test321',
      role: 'user',
    });

    if (!user) throw new BadRequestException('Failed to create user');

    return user;
  }

  async _findMany(query: any) {
    await this.prisma.users.findMany(query);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async _create(data: any) {
    return await this.prisma.users.create({ data });
  }
}
