import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'guards/gql-auth.guard';
import { Public } from 'decorators/is-public.decorator';
import { UserPublic } from './entities/user-public.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User , {name: 'createUsers'})
  @Public()
  async createUser(@Args('data') data: CreateUserInput) {
    return this.usersService.create(data);
  }

  @Query(() => [User], { name: 'findAllUsers' })
  @UseGuards(GqlAuthGuard)
  async findAll() {
    return this.usersService.findAll();
  }

  @Query(() => [UserPublic], { name: 'findAllUsersPublic' })
  @Public()
  async findAllPubllic() {
    return this.usersService.findAll();
  }


  @Query(() => User, { name: 'findOneUser' })
  @UseGuards(GqlAuthGuard)
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, {name: 'updateUsers'})
  @UseGuards(GqlAuthGuard)
  async update(@Args('data') data: UpdateUserInput) {
    return this.usersService.update(data);
  }

  @Mutation(() => User, {name: 'removeUsers'})
  @UseGuards(GqlAuthGuard)
  async remove(@Args('id', { type: () => ID }) id: string) {
  this.usersService.remove(id);
  }
}
