import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Program } from '../configuration/entities/program.entity';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { Role } from './enums/user.enum';

@Injectable()
export class UserService {
  async getUserUserName(userName: string) {
    const user = await User.findOne({ where: { userName } });
    return user;
  }
  async getUserById(id: number) {
    return await User.findOne({ where: { id } });
  }

  async getUserLoged(user: any, id: number) {
    if (user.role === Role.USER) throw new UnauthorizedException();
    return await User.findOne({ where: { id } });
  }

  async getUsers(user: any) {
    if (user.role === Role.USER) throw new UnauthorizedException();
    const students = await User.find();
    return students;
  }

  async createUser(userNew: CreateUserDto, user: any) {
    if (user.role === Role.USER) throw new UnauthorizedException();
    const newUser = new User();
    newUser.name = userNew.name;
    newUser.role = userNew.role;
    newUser.userName = userNew.userName;
    newUser.email = userNew.email;
    let program = [];
    if (userNew.programId)
      program = [
        await Program.findOne({
          where: { id: userNew.programId },
        }),
      ];
    newUser.programs = program;
    newUser.password = userNew.password;

    newUser.save();
    return newUser;
  }

  async updateUser(userUpdate: any, user: any, id: number) {
    if (user.role === Role.USER) throw new UnauthorizedException();
    const updateUser = await User.findOne({ where: { id } });
    updateUser.name = userUpdate.name;
    let program = [];
    if (userUpdate.programId)
      program = [
        await Program.findOne({
          where: { id: userUpdate.programId },
        }),
      ];
    updateUser.programs = program;
    updateUser.save();
    return updateUser;
  }

  async deleteUser(user: any, id: number) {
    if (user.role === Role.USER) throw new UnauthorizedException();

    const deleteUser = await User.findOne({ where: { id } });

    if (!deleteUser) throw new NotFoundException('User not found');
    if (deleteUser) await User.delete({ id });

    return id;
  }
}
