import { InputType, Int, Field, extend, PartialType, OmitType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { create } from 'domain';

@InputType()
export class CreateUserInput extends OmitType(User, ['id', 'updatedAt', 'createdAt']) {
  @Field(() => String)
  name: string;
  @Field(() => String)
  url: string;  // Adicione este campo

  @Field(() => String)
  UserId: string;  // Adicione este campo
}
