import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Student } from 'src/student/entities/student.entity';
import { Role } from 'src/user/enums/user.enum';
import { In } from 'typeorm';
import { ProgramDto } from './dto/program.dto';
import { Program } from './entities/program.entity';

@Injectable()
export class ConfigurationService {
  async getPrograms(user: any) {
    let params = null;
    if (user.role === Role.USER)
      params = { relations: ['students'], where: { userId: user.id } };
    else params = { relations: ['students'] };

    const programs = await Program.find(params);
    console.log(programs);

    return programs;
  }

  async createProgram(program: ProgramDto, user: any) {
    if (user.role === Role.USER) throw new UnauthorizedException();
    const newProgram = new Program();
    newProgram.name = program.name;
    newProgram.userId = 1;

    const students = await Student.find({
      where: { id: In(program.students) },
    });
    console.log(students);

    newProgram.students = students;
    newProgram.save();
    return newProgram;
  }

  async updateProgram(program: ProgramDto, user: any, id: number) {
    if (user.role === Role.USER) throw new UnauthorizedException();

    const updateProgram = await Program.findOne({ where: { id } });
    updateProgram.name = program.name;
    updateProgram.userId = 1;

    const students = await Student.find({ where: { id: In([1]) } });

    updateProgram.students = students;
    updateProgram.save();
    return updateProgram;
  }

  async deleteProgram(user: any, id: number) {
    if (user.role === Role.USER) throw new UnauthorizedException();

    const deleteProgram = await Program.findOne({ where: { id } });

    if (!deleteProgram) throw new NotFoundException('Program not found');

    if (deleteProgram) await Program.delete({ id });

    return id;
  }
}
