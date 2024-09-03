import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user-entity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) // Injeta o repositório TypeORM para a entidade User
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserInput): Promise<UserEntity> {
    const { name, url, UserId } = data;
    
    
    const user = this.usersRepository.create({
      name,
      url,
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

  async update(data: UpdateUserInput) {
    return `This action updates a  user`;
  }

  async remove(id: string) {
    return `This action removes a  user`;
  }
}
