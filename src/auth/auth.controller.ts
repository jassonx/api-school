import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Request as Req } from 'express';
import { UserLoginSerializer } from './serializers/auth.serializer';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthGuard)
  async login(
    @Request() req: Req,
    @Body()
    userBody: LoginDto,
  ): Promise<UserLoginSerializer> {
    console.log(userBody);
    const { user }: any = req;
    const userLoged = this.authService.generateToken(user);
    return new UserLoginSerializer(userLoged);
  }
}
