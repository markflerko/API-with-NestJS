import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import ObjectWithIdDTO from 'src/utils/types/objectWithId.dto';

class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @ValidateNested()
  @Type(() => ObjectWithIdDTO)
  post: ObjectWithIdDTO;
}

export default CreateCommentDto;
