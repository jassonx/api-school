import {
  Entity,
  Column,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Program } from '../../configuration/entities/program.entity';

@Entity({ name: 'students' })
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 150 })
  public name: string;

  @Column()
  public dateAdmission: string;

  @ManyToMany(() => Program, (program) => program.students)
  programs: Program[];

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt!: Date;
}
