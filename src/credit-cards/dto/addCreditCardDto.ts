import { IsNotEmpty, IsString } from 'class-validator';

export class AddCreditCardDto {
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;
}

export default AddCreditCardDto;
