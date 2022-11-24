import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/users')
  @UseGuards(JwtAuthGuard)
  async getUsers(@Request() req: Req): Promise<any> {
    const { user }: any = req;
    const users = this.userService.getUsers(user);
    return users;
  }

  @Get('/user/:id')
  @UseGuards(JwtAuthGuard)
  async getStudents(
    @Request() req: Req,
    @Param('id')
    id: number,
  ): Promise<any> {
    const { user }: any = req;
    const userFind = this.userService.getUserLoged(user, id);
    return userFind;
  }

  @Post('/user')
  @UseGuards(JwtAuthGuard)
  async createUser(
    @Request() req: Req,
    @Body()
    userBody: CreateUserDto,
  ): Promise<CreateUserDto> {
    const { user }: any = req;
    const created = this.userService.createUser(userBody, user);
    return created;
  }

  @Put('/user/:id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Request() req: Req,
    @Param('id')
    id: number,
    @Body()
    userBody: any,
  ): Promise<any> {
    const { user }: any = req;
    const userUpdate = this.userService.updateUser(userBody, user, id);
    return userUpdate;
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(
    @Request() req: Req,
    @Param('id')
    id: number,
  ): Promise<any> {
    const { user }: any = req;
    const deleted = this.userService.deleteUser(user, id);
    return deleted;
  }
}
