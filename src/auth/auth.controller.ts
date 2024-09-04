import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'decorators/is-public.decorator';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService ) {}

  @Post('login')
  @Public()
  async register(
    @Body('UserId') UserId: string,
    @Body('password') password: string,
  ){
    await this.authService.signIn(UserId, password);
  }
}

