import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(login: string, password: string) {
    const { password: userPassword, ...rest } =
      await this.usersService.findUserByLogin(login);
    const isPasswordValid = await bcrypt.compare(password, userPassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return rest;
  }
}
