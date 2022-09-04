import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { generateJwt } from 'src/utilities/utils/gen-token.utils';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async registerUser(data: RegisterUserDto) {
    delete data.confirmPassword;

    if (data.isAdmin) {
      if (!data.adminVaucher) {
        throw new BadRequestException(
          'Only super admin can create an admin user'
        );
      }

      const admin = await this.prisma.users.findUnique({
        where: { id: data.adminVaucher }
      });

      if (!admin) {
        throw new NotFoundException('No admin found');
      }
    }

    const users = await this.prisma.users.findMany({
      where: {
        OR: [{ username: data.username }, { email: data.email }]
      }
    });

    if (users.length && users.some((u) => u.username == data.username)) {
      throw new ConflictException('Username taken');
    }

    if (users.length && users.some((u) => u.email == data.email)) {
      throw new ConflictException('Email taken');
    }

    data.password = await bcrypt.hash(data.password, 10);

    const newUser = await this.prisma.users.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        birthdate: data?.birthdate,
        image: data?.image,
        bio: data?.bio
      }
    });

    if (!newUser) throw new BadRequestException('Failed to create user');

    return {
      ...newUser,
      password: null,
      token: await generateJwt(
        { id: newUser.id, username: newUser.username },
        process.env.TOKEN_SECRET
      )
    };
  }

  async loginUser(data: LoginUserDto) {
    let query;

    if (!data) {
      throw new BadRequestException('Provide email or username with password');
    }

    if (!data.username && !data.email) {
      throw new BadRequestException('Provide email or username');
    } else if (data.username) {
      query = { username: data.username };
    } else if (data.email) {
      query = { email: data.email };
    }

    const user = await this.prisma.users.findUnique({ where: query });

    if (!user) throw new NotFoundException('No user found');

    if (await bcrypt.compare(data.password, user.password)) {
      return {
        ...user,
        password: null,
        token: await generateJwt(
          { id: user.id, username: user.username },
          process.env.TOKEN_SECRET
        )
      };
    } else {
      throw new UnauthorizedException('Not authorised');
    }
  }
}
