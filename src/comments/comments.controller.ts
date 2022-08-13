import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { CreateCommentCommand } from './commands/implementations/createComment.command';
import CreateCommentDto from './dto/createComment.dto';
import GetCommentsDto from './dto/getComments.dto';
import { GetCommentsQuery } from './queries/implementations/getComments.query';

@Controller('comments')
@UseInterceptors(ClassSerializerInterceptor)
export default class CommentsController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createComment(
    @Body() comment: CreateCommentDto,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;
    return this.commandBus.execute(new CreateCommentCommand(comment, user));
  }

  @Get()
  async getComments(@Query() { postId }: GetCommentsDto) {
    return this.queryBus.execute(new GetCommentsQuery(postId));
  }
}
