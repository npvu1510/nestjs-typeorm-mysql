import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @UpdateDateColumn()
  updated_at: Date;
  @CreateDateColumn()
  created_at: Date;
}
