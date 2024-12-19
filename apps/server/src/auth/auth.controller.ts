import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RegisterDto } from './dto';
import { GetCurrentUser, Public } from './decorator';
import { RtGuard } from './guard';
import { Response } from 'express';
import { GetCurrentTokens } from './decorator/get-current-tokens';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth') // Group routes under 'Auth' in Swagger UI
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully signed up.',
  })
  async signup(@Body() dto: RegisterDto, @Res() res: Response) {
    return await this.authService.signup(dto, res);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in.',
  })
  async signin(@Body() dto: AuthDto, @Res() res: Response) {
    return await this.authService.signin(dto, res);
  }

  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log out the current user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged out.',
  })
  async logout(@Res() res: Response) {
    return await this.authService.logout(res);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh the user token' })
  @ApiResponse({
    status: 200,
    description: 'Token successfully refreshed.',
  })
  async refreshToken(
    @GetCurrentUser() user: any,
    @GetCurrentTokens() token: any,
    @Res() res: Response,
  ) {
    const userId = user.sub;
    return await this.authService.refreshToken(userId, token.refreshToken, res);
  }
}