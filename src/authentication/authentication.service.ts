import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';
import { UsersService } from 'src/users/users.service';
import RegisterDto from './dto/register.dto';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async getUserFromAuthenticationToken(token: string) {
    const payload: TokenPayload = this.jwtService.verify(token, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
    if (payload.userId) {
      return this.usersService.getById(payload.userId);
    }
  }

  public getCookieForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  public getCookieWithJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}`;
    return {
      cookie,
      token,
    };
  }

  public getCookieWithJwtAccessToken(
    userId: number,
    isSecondFactorAuthenticated = false,
  ) {
    const payload: TokenPayload = { userId, isSecondFactorAuthenticated };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}`;
  }

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
