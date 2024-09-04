import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        private readonly configService: ConfigService
      ) {
        this.jwtExpirationTimeInSeconds = +this.configService.get<number>('JWT_EXPIRATION_TIME')
      }
    
      async signIn(userId: string, password: string): Promise<{token: string, expiresIn : number}> {
        // Buscar o usuário pelo ID
        const user = await this.usersService.findOneByUserId(userId);
        if (!user) {
          throw new UnauthorizedException('Usuário não encontrado');
        }
    
        // Comparar a senha fornecida com a senha armazenada
        const isPasswordValid = await compare(password, user.Password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('Senha inválida');
        }
    
        // Gerar o token JWT
        const payload = { userId: user.id, name: user.name };

        const token = await this.jwtService.signAsync(payload, {
            expiresIn: this.jwtExpirationTimeInSeconds,
        })
        console.log(token) 
        return {token, expiresIn: this.jwtExpirationTimeInSeconds}
      }
    }  
