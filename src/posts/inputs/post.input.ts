import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  scheduledDate?: Date;

  @Field()
  content: string;

  @Field(() => [String])
  paragraphs: string[];
}
