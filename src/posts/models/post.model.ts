import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  scheduledDate?: Date;

  @Field()
  createdAt: Date;

  @Field(() => Int)
  authorId: number;

  @Field()
  author: User;

  @Field()
  title: string;

  @Field(() => [String])
  paragraphs: string[];
}
