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

  async loginUser(data: LoginUserDto) {
    // Trazenje korisnika na temelju email-a
    // SQL: SELECT * FROM users WHERE email=<data.email>;
    const user = await this.prisma.users.findUnique({
      where: { email: data.email }
    });

    // Ako korisnik nije pronaden
    if (!user) {
      throw new NotFoundException('MYBnfe001'); // No user found
    }

    // Usporedivanje enkriptirane lozinke bcrypt paketom
    if (await bcrypt.compare(data.password, user.password)) {
      // Ako se lozinka podudara s lozinkom koja je poslana u zahtjevu klijenta
      // Vraca se korisnik s tokenom za pristup API-u
      return {
        ...user,
        password: null,
        token: await generateJwt(
          { id: user.id, username: user.username },
          process.env.TOKEN_SECRET
        )
      };
    } else {
      // Ako se lozinka ne podudara server vraca gresku
      throw new UnauthorizedException('Not authorised');
    }
  }

  
  async registerUser(data: RegisterUserDto) {
    if (data.isAdmin) {
      if (!data.adminVoucher) {
        throw new BadRequestException('MYBbre002');
      }

      const admin = await this.prisma.users.findUnique({
        where: { id: data.adminVoucher }
      });

      if (!admin) {
        throw new NotFoundException('MYBnfe007');
      }

      if (!admin.isAdmin) {
        throw new ConflictException('MYBcfe002');
      }
    }

    const users = await this.prisma.users.findMany({
      where: {
        OR: [{ username: data.username }, { email: data.email }]
      }
    });

    if (users.length && users.some((u) => u.username == data.username)) {
      throw new ConflictException('MYBcfe003');
    }

    if (users.length && users.some((u) => u.email == data.email)) {
      throw new ConflictException('MYBcfe004');
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
        bio: data?.bio,
        isAdmin: data?.isAdmin
      }
    });

    if (!newUser) throw new BadRequestException('MYBbre003');

    return {
      ...newUser,
      password: null,
      token: await generateJwt(
        { id: newUser.id, username: newUser.username },
        process.env.TOKEN_SECRET
      )
    };
  }
}
