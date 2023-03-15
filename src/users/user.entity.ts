import { Exclude } from 'class-transformer';
import PublicFile from 'src/files/public-file.entity';
import Post from 'src/posts/post.entity';
import PrivateFile from 'src/private-files/private-file.entity';
import Permission from 'src/users/permission.type';
import Role from 'src/users/role.enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Address from './address.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({
    type: 'enum',
    enum: Permission,
    array: true,
    default: [],
  })
  public permissions: Permission[];

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.Admin],
  })
  public roles: Role[];

  @Column({ nullable: true })
  public monthlySubscriptionStatus?: string;

  @Column()
  public stripeCustomerId: string;

  @Column({ default: false })
  public isTwoFactorAuthenticationEnabled?: boolean;

  @Column({ nullable: true })
  public twoFactorAuthenticationSecret?: string;

  @Column({ unique: true })
  public email: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToOne(() => Address, {
    eager: true, //related entity always be include. Only one side of relationship could be eager
    cascade: true, //saving addresses while saving users
  })
  @JoinColumn()
  public address: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts?: Post[];

  @JoinColumn()
  @OneToOne(() => PublicFile, {
    eager: true,
    nullable: true,
  })
  public avatar?: PublicFile;

  @OneToMany(() => PrivateFile, (file: PrivateFile) => file.owner)
  public files: PrivateFile[];
}

export default User;
