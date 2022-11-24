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
import { CreateStudentDto } from './dto/create--student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('/students')
  @UseGuards(JwtAuthGuard)
  async getStudents(@Request() req: Req): Promise<any> {
    const { user }: any = req;
    const programs = this.studentService.getStudents(user);
    return programs;
  }

  @Post('/student')
  @UseGuards(JwtAuthGuard)
  async createStudent(
    @Request() req: Req,
    @Body()
    studentBody: CreateStudentDto,
  ): Promise<any> {
    const { user }: any = req;
    const student = this.studentService.createProgram(studentBody, user);
    return student;
  }

  @Put('/student/:id')
  @UseGuards(JwtAuthGuard)
  async updateProgram(
    @Request() req: Req,
    @Param('id')
    id: number,
    @Body()
    studentBody: any,
  ): Promise<any> {
    const { user }: any = req;
    const student = this.studentService.updateStudent(studentBody, user, id);
    return student;
  }

  @Delete('/student/:id')
  @UseGuards(JwtAuthGuard)
  async deleteStudent(
    @Request() req: Req,
    @Param('id')
    id: number,
  ): Promise<any> {
    const { user }: any = req;
    const student = this.studentService.deleteStudent(user, id);
    return student;
  }
}
