import Category from 'src/category/category.entity';
import User from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import Comment from '../comments/comment.entity';

@Entity()
class Post {
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  scheduledDate?: Date;

  @Column('text', { array: true })
  public paragraphs: string[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  public id?: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ nullable: true })
  public category?: string;

  @Index('post_authorId_index')
  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @RelationId((post: Post) => post.author)
  public authorId: number;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[];

  @OneToMany(() => Comment, (comment: Comment) => comment.post)
  public comments: Comment[];
}

export default Post;
