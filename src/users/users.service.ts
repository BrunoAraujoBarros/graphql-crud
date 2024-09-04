import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user-entity.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) // Injeta o repositório TypeORM para a entidade User
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserInput): Promise<UserEntity> {
    const { name, url, UserId, Password} = data;
    const hashedPassword = await hash(Password, 10);
    
    
    const user = this.usersRepository.create({
      name,
      url,
      //Password: hashedPassword,
      Password,
      UserId,
      createdAt: new Date(),  
      updatedAt: new Date(),  
    });

    await this.usersRepository.save(user);
    console.log(user)
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    const user = await this.usersRepository.find()
    return user
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({id})
    return user;
  }

  async update(data: UpdateUserInput): Promise<UserEntity> {
    const { id ,name, url, UserId, Password } = data;
    const user = await this.usersRepository.findOneBy({id})
    if(!user){
      throw new NotFoundException('User with ID ${id} not found')
    }
    user.Password = Password
    user.name = name;
    user.url = url;
    user.UserId = UserId;
    user.updatedAt = new Date();

    await this.usersRepository.save(user);
    
    return user;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({id})
    if(!user){
      throw new NotFoundException('User with ID ${id} not found')
    }
    await this.usersRepository.delete(id);
  }

  findOneByUserId(UserId: string) {
    return this.usersRepository.findOneBy({ UserId });
  }
}
