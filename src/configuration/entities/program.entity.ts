import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Student } from '../../student/entities/student.entity';

@Entity({ name: 'programs' })
export class Program extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 150 })
  public name: string;

  @ManyToOne(() => User, (user) => user.programs, { onDelete: 'SET NULL' })
  user: User;

  @Column({ nullable: true })
  userId: number;

  @ManyToMany(() => Student, (student) => student.programs)
  @JoinTable({ name: 'programs_students' })
  students: Student[];

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt!: Date;
}
