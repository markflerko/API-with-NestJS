import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  authorId: number;

  @Field()
  author: User;

  @Field()
  title: string;

  @Field(() => [String])
  paragraphs: string[];
}
