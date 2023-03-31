import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Post from '../posts/post.entity';
import User from '../users/user.entity';

@Entity()
class Comment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;

  @ManyToOne(() => Post, (post: Post) => post.comments)
  public post: Post;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;
}

export default Comment;
