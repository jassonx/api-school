import { User } from '../../user/entities/user.entity';
import { getManager } from 'typeorm';
import { Seeder } from 'typeorm-seeding';
import { Role } from '../../user/enums/user.enum';
import { Student } from '../../student/entities/student.entity';
import { Program } from '../../configuration/entities/program.entity';

const users = [
  {
    name: 'Jasson Acea',
    userName: 'acea',
    email: 'aceaxiu@gmail.com',
    password: 'Password123',
    role: Role.ADMIN,
  },
];

const programs = [{ name: 'Primavera' }, { name: 'Canto' }, { name: 'Baile' }];

const students = [
  { name: 'Alicia ceballos', dateAdmission: '28/07/2021', program: 'Baile' },
  { name: 'Juan Uku', dateAdmission: '28/07/2021', program: 'Baile' },
  { name: 'Marina Gutierres', dateAdmission: '28/07/2021', program: 'Baile' },
  { name: 'Daniel Perez', dateAdmission: '28/07/2021', program: 'Baile' },
  { name: 'Maria Gonzales', dateAdmission: '28/07/2021', program: 'Baile' },
  { name: 'Marisol Hernandez', dateAdmission: '28/07/2021', program: 'Baile' },
  { name: 'Manual Puga', dateAdmission: '25/06/2021', program: 'Canto' },
  { name: 'Luis Pech', dateAdmission: '25/06/2021', program: 'Canto' },
  { name: 'Alejandro Cantun', dateAdmission: '25/06/2021', program: 'Canto' },
  { name: 'Ricardo Ofarri', dateAdmission: '25/06/2021', program: 'Canto' },
  { name: 'Manuel Pech', dateAdmission: '25/06/2021', program: 'Canto' },
  { name: 'Josue Dominguez', dateAdmission: '25/06/2021', program: 'Canto' },
  { name: 'Karen Sarmiento', dateAdmission: '25/06/2021', program: 'Canto' },
  { name: 'Manuel Delgado', dateAdmission: '25/06/2021', program: 'Canto' },
  { name: 'Ricardo Ruiz', dateAdmission: '25/06/2021', program: 'Canto' },
  { name: 'Jorge Puerto', dateAdmission: '23/06/2021', program: 'Primavera' },
  { name: 'Stefan Xu', dateAdmission: '23/06/2021', program: 'Primavera' },
  {
    name: 'González Garcia',
    dateAdmission: '23/06/2021',
    program: 'Primavera',
  },
  {
    name: 'Rodríguez López',
    dateAdmission: '23/06/2021',
    program: 'Primavera',
  },
  { name: 'Juan Albornoz', dateAdmission: '23/06/2021', program: 'Primavera' },
  { name: 'Ricardo Perez', dateAdmission: '23/06/2021', program: 'Primavera' },
  { name: 'Alicia Centeno', dateAdmission: '23/06/2021', program: 'Primavera' },
  { name: 'Juan Ku', dateAdmission: '23/06/2021', program: 'Primavera' },
  { name: 'Maria Delgado', dateAdmission: '23/06/2021', program: 'Primavera' },
  {
    name: 'Karen Sarmiento',
    dateAdmission: '23/06/2021',
    program: 'Primavera',
  },
  { name: 'Juan Ruiz', dateAdmission: '23/06/2021', program: 'Primavera' },
];

export class UserCreateSeed implements Seeder {
  public async run(): Promise<void> {
    await getManager().query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    await getManager().query('TRUNCATE users CASCADE');
    await getManager().query('ALTER SEQUENCE programs_id_seq RESTART WITH 1');
    await getManager().query('TRUNCATE programs CASCADE');
    await getManager().query('ALTER SEQUENCE students_id_seq RESTART WITH 1');
    await getManager().query('TRUNCATE students CASCADE');

    for (let index = 0; index < users.length; index++) {
      const { name, userName, email, password, role } = users[index];
      const newUser = new User();
      newUser.name = name;
      newUser.userName = userName;
      newUser.email = email;
      newUser.password = password;
      newUser.role = role;
      await newUser.save();
    }

    for (let index = 0; index < programs.length; index++) {
      const { name } = programs[index];
      const newProgram = new Program();
      newProgram.name = name;
      await newProgram.save();
    }

    for (let index = 0; index < students.length; index++) {
      const { name, dateAdmission, program } = students[index];
      const getProgram = await Program.findOne({ where: { name: program } });
      const newStudent = new Student();
      newStudent.name = name;
      newStudent.dateAdmission = dateAdmission;
      newStudent.programs = [getProgram];
      await newStudent.save();
    }
  }
}
