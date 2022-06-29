import { Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ nullable: true })
  @Transform((value) => {
    if (value !== null) {
      return value;
    }
  })
  public category?: string;
}

export default Post;
