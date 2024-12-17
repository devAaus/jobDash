import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, RegisterDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) { }

  async signup(dto: RegisterDto, res: Response) {
    // Generate password hash
    const hash = await this.hashedData(dto.password);
    try {
      // Check if email or username is already taken
      const existingUser = await this.prisma.users.findFirst({
        where: {
          OR: [
            { email: dto.email },
            { username: dto.userName },
          ],
        },
      });

      if (existingUser) {
        const errors = {};
        if (existingUser.email === dto.email) {
          errors['email'] = 'Email already registered';
        }
        if (existingUser.username === dto.userName) {
          errors['username'] = 'Username already registered';
        }
        throw new ForbiddenException(errors);
      }

      // Create new user if both email and username are available
      const user = await this.prisma.users.create({
        data: {
          email: dto.email,
          username: dto.userName,
          hash,
        },
      });
      const tokens = await this.signToken(
        user.id,
        user.email,
        user.role,
        user.username
      );
      await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

      // Set tokens in cookies
      this.setAuthCookies(res, tokens);
    } catch (error) {
      throw error;
    }
  }

  async signin(dto: AuthDto, res: Response) {
    const user = await this.prisma.users.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    const tokens = await this.signToken(user.id, user.email, user.role, user.username);

    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    // Set tokens in cookies
    this.setAuthCookies(res, tokens);

    return res.status(200).json({
      message: 'Login Successful',
      success: true,
      username: user.username,
      role: user.role,
    });
  }

  async logout(res: Response) {
    // Clear cookies on logout
    this.clearCookies(res);

    return res.status(200).json({
      message: 'Logout Successful',
      success: true,
    });
  }

  async refreshToken(userId: number, rt: string, res: Response) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user || !user.hashedRt) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await argon.verify(user.hashedRt, rt);
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.signToken(user.id, user.email, user.role, user.username);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    // Set new tokens in cookies
    this.setAuthCookies(res, tokens);
  }

  async updateRefreshTokenHash(userId: number, refreshToken: string) {
    const hash = await this.hashedData(refreshToken);
    await this.prisma.users.update({
      where: { id: userId },
      data: { hashedRt: hash },
    });
  }

  hashedData(data: string) {
    return argon.hash(data);
  }

  async signToken(
    userId: number,
    email: string,
    role: string,
    username: string
  ): Promise<Tokens> {
    const payload = {
      sub: userId,
      username,
      email,
      role,
    };
    const secretAT = this.config.get<string>('JWT_SECRET_KEY');
    const secretRT = this.config.get<string>('JWT_REFRESH_SECRET_KEY');

    const [at, rt] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: secretAT,
      }),
      this.jwt.signAsync(payload, {
        expiresIn: '7d',
        secret: secretRT,
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
      role,
    };
  }

  private setAuthCookies(res: Response, tokens: Tokens) {
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }

  private clearCookies(res: Response): void {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
  }
}
