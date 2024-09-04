import { User } from "./user.entity";
import { ObjectType, PickType } from "@nestjs/graphql";


@ObjectType()
export class UserPublic extends PickType(User, ['url', 'name'] as const){

}