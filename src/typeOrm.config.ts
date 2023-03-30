import {
  Column,
  CreateDateColumn,
  DataSource,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreatePost1680187887117 } from './migrations/1680187887117-CreatePost';
import { PostCreationDate1658701645714 } from './migrations/1680188483988-PostCreationDate';

@Entity()
class PostEntity {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [PostEntity],
  migrations: [CreatePost1680187887117, PostCreationDate1658701645714],
});
