import User from '../../../users/user.entity';
import CreateCommentDto from '../../dto/createComment.dto';

export class CreateCommentCommand {
  constructor(
    public readonly comment: CreateCommentDto,
    public readonly author: User,
  ) {}
}
