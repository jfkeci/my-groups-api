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
import {
  generateJwt,
  generateToken
} from 'src/utilities/utils/gen-token.utils';
import { VerifyEmailDto } from '../dto/verify-email.dto';
import { sendEmail } from 'src/utilities/utils/mailer.utils';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async registerUser(data: RegisterUserDto) {
    delete data.confirmPassword;

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

    const token = generateToken();

    const newUser = await this.prisma.users.create({
      data: {
        ...data,
        emailVerificationToken:
          process.env.NODE_ENV == 'development' ? '' : token,
        isEmailVerified: process.env.NODE_ENV == 'development' ? true : false
      }
    });

    if (!newUser) throw new BadRequestException('Failed to create user');

    let emailConfirmationUrl;

    if (process.env.NODE_ENV != 'development') {
      const emailConfirmationUrl = `${process.env.BASE_URL}/api/auth/verify/${newUser.id}/${token}`;

      await sendEmail({
        from: 'my-groups@info.com',
        to: newUser.email,
        subject: 'Verify your email',
        html: `<html>
        <h1>Email verification</h1>
        <br><hr><br>
        <h3>
        <a href="${emailConfirmationUrl}">
        Verify email
        </a>
        </h3>
        <br><br>
        </html>`
      });
    }

    return {
      ...newUser,
      password: null,
      emailVerificationToken: null,
      verifyEmailUrl: emailConfirmationUrl ?? '',
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

    if (!user.isEmailVerified) {
      throw new ConflictException('User not verified');
    }

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

  async verifyEmail(data: VerifyEmailDto) {
    const user = await this.prisma.users.findFirst({
      where: {
        id: Number(data.userId),
        emailVerificationToken: data.token
      }
    });

    if (!user) throw new NotFoundException('No user found');

    const updatedUser = await this.prisma.users.update({
      where: { id: Number(data.userId) },
      data: { emailVerificationToken: '', isEmailVerified: true }
    });

    if (!updatedUser) throw new BadRequestException('Failed to update user');

    return updatedUser;
  }
}
