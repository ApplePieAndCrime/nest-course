import { User } from './../users/users.model';
import { UsersService } from './../users/users.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt/dist';

const bcrypt = require('bcryptjs');
import { pick } from 'lodash';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ApiOperation } from '@nestjs/swagger';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  @ApiOperation({ summary: 'Логин' })
  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  @ApiOperation({ summary: 'Регистрация' })
  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким  email',
        HttpStatus.BAD_REQUEST
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = pick(user, ['email', 'id', 'roles']);

    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(dto.email);

    const passwordEquals = await bcrypt.compare(dto.password, user.password);

    if (user && passwordEquals) {
      return user;
    }
    console.log({ user, passwordEquals });

    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }
}

