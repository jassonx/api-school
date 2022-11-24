import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/user/enums/user.enum';
import { CreateStudentDto } from './dto/create--student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  async getStudents(user: any) {
    if (user.role === Role.USER) throw new UnauthorizedException();
    const students = await Student.find();
    return students;
  }

  async createProgram(student: CreateStudentDto, user: any) {
    if (user.role === Role.USER) throw new UnauthorizedException();
    const newStudent = new Student();
    newStudent.name = student.name;
    return newStudent;
  }

  async updateStudent(student: any, user: any, id: number) {
    if (user.role === Role.USER) throw new UnauthorizedException();

    const updateStudent = await Student.findOne({ where: { id } });
    updateStudent.name = Student.name;
    updateStudent.save();
    return updateStudent;
  }

  async deleteStudent(user: any, id: number) {
    if (user.role === Role.USER) throw new UnauthorizedException();
    const deleteStudent = await Student.findOne({ where: { id } });
    if (!deleteStudent) throw new NotFoundException('Student not found');
    if (deleteStudent) await Student.delete({ id });

    return id;
  }
}
