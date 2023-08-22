import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(login: string, password: string) {
    const user = await this.usersService.findUserByLogin(login);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException(
        'Wrong login or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { sub: user.id, login: user.login };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
