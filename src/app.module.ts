import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user-entity.entity';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }), 
    TypeOrmModule.forRoot({
      type: 'mysql', // Tipo do banco de dados (pode ser 'mysql', 'sqlite', etc.)
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sua_base_de_dados',
      entities: [UserEntity], // Entidades gerenciadas pelo TypeORM
      synchronize: true, // Sincroniza automaticamente as entidades com o banco de dados (somente para desenvolvimento)
    }),UsersModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
