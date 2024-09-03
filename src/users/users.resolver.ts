import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User , {name: 'createUsers'})
  async createUser(@Args('data') data: CreateUserInput) {
    return this.usersService.create(data);
  }

  @Query(() => [User], { name: 'findAllUsers' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'findOneUser' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, {name: 'updateUsers'})
  async update(@Args('data') data: UpdateUserInput) {
    return this.usersService.update(data);
  }

  @Mutation(() => User, {name: 'removeUsers'})
  async remove(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.remove(id);
  }
}
