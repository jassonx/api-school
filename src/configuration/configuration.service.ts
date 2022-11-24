import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../student/entities/student.entity';
import { Role } from '../user/enums/user.enum';
import { In, Repository } from 'typeorm';
import { ProgramDto } from './dto/program.dto';
import { Program } from './entities/program.entity';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectRepository(Program)
    private programRepository: Repository<Program>,
  ) {}
  async getPrograms(user: any) {
    const queryBuilder = this.programRepository.createQueryBuilder('q');
    queryBuilder.leftJoinAndSelect('q.students', 'students');
    queryBuilder.loadRelationCountAndMap('q.studentsCount', 'q.students');

    queryBuilder.select([
      'q.id',
      'q.name',
      'students.id',
      'students.name',
      'students.dateAdmission',
    ]);
    if (user.role === Role.USER) queryBuilder.where(`q.userId=${user.id}`);
    return await queryBuilder.getMany();
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
