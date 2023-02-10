import { AuthService } from './../auth/auth.service';
import { RolesService } from './../roles/roles.service';
import { UsersService } from './../users/users.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import Promise from 'bluebird';
import { roles, users, userRoles } from '../../models/defaults';

@Injectable()
export class DevelopHelpersService {
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private authServise: AuthService
  ) {}

  async createDefaults() {
    try {
      // rolesd
      const rolesResult = await Promise.map(roles, (role) => {
        return this.rolesService.createRole(role);
      });
      console.log({ rolesResult });

      // users
      const usersResult = await Promise.map(users, (user) => {
        return this.authServise.registration(user);
      });
      console.log({ usersResult });

      //user-roles
      const userRolesResult = await Promise.map(userRoles, (userRole) => {
        return this.usersService.addRole(userRole);
      });
      console.log({ userRolesResult });

      return { rolesResult, usersResult, userRolesResult };
    } catch (err) {
      console.log(`Create defaults error: ${err}`);
      throw new HttpException(`Ошибка ${err}`, HttpStatus.BAD_REQUEST);
    }
  }
}
