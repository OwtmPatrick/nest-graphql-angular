import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const isUserAlreadyExist = await this.userRepository.findOne({
      where: {
        login: createUserDto.login,
      },
    });

    if (isUserAlreadyExist) {
      throw new HttpException(
        'User with this login already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    try {
      const user = await this.userRepository.insert({
        ...createUserDto,
        firstName: '',
        lastName: '',
      });

      const userId = user.identifiers[0].id;

      return {
        statusCode: HttpStatus.CREATED,
        message: `The user with login ${createUserDto.login} was successfully created`,
        userId,
      };
    } catch (e) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (e) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      return await this.userRepository.findOne({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new HttpException('Unable to find user', HttpStatus.NOT_FOUND);
    }
  }

  async findUserByLogin(login: string) {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .where('user.login = :login', { login })
        .addSelect('user.password')
        .getOne();
    } catch (e) {
      throw new HttpException('Unable to find user', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository.update(id, updateUserDto);

      return await this.userRepository.findOne({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new HttpException('Unable to update user', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        throw new HttpException('Unable to find user', HttpStatus.NOT_FOUND);
      }

      await this.userRepository.remove(user);

      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: `The user was successfully removed`,
      };
    } catch (e) {
      throw new HttpException('Unable to remove user', HttpStatus.BAD_REQUEST);
    }
  }
}
