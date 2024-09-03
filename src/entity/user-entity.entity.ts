import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    url: string;
  
    @Column()
    UserId: string;

    @Column()
    createdAt: Date;
  
    @Column()
    updatedAt: Date;
  }
