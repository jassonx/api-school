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
import { ConfigurationService } from './configuration.service';
import { ProgramDto } from './dto/program.dto';

@Controller('configuration')
export class ConfigurationController {
  constructor(private configurationService: ConfigurationService) {}

  @Get('/programs')
  @UseGuards(JwtAuthGuard)
  async getPrograms(@Request() req: Req): Promise<any> {
    const { user }: any = req;
    const programs = this.configurationService.getPrograms(user);
    return programs;
  }

  @Post('/programs')
  @UseGuards(JwtAuthGuard)
  async createProgram(
    @Request() req: Req,
    @Body()
    programBody: ProgramDto,
  ): Promise<any> {
    const { user }: any = req;
    const programs = this.configurationService.createProgram(programBody, user);
    return programs;
  }

  @Put('/programs/:id')
  @UseGuards(JwtAuthGuard)
  async updateProgram(
    @Request() req: Req,
    @Param('id')
    id: number,
    @Body()
    programBody: ProgramDto,
  ): Promise<any> {
    const { user }: any = req;
    const program = this.configurationService.updateProgram(
      programBody,
      user,
      id,
    );
    return program;
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteStudent(
    @Request() req: Req,
    @Param('id')
    id: number,
  ): Promise<any> {
    const { user }: any = req;
    const deleted = this.configurationService.deleteProgram(user, id);
    return deleted;
  }
}
