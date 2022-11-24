import {
  Entity,
  Column,
  BeforeInsert,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Program } from '../../configuration/entities/program.entity';
import { Role } from '../enums/user.enum';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 150 })
  public name: string;

  @Column({ unique: true, type: 'varchar', length: 120 })
  public userName: string;

  @Column({ unique: true, type: 'varchar', length: 120 })
  public email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, nullable: true, default: Role.USER })
  public role: Role;

  @OneToMany(() => Program, (program) => program.user)
  programs: Program[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt!: Date;
}
