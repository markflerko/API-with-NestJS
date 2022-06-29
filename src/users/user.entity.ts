import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  @Expose()
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;
}

export default User;
