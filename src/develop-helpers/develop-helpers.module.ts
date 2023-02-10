import { AuthModule } from './../auth/auth.module';
import { UserRole } from './../roles/user-roles.model';
import { User } from 'src/users/users.model';
import { Role } from './../roles/roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from './../roles/roles.module';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { DevelopHelpersService } from './develop-helpers.service';
import { DevelopHelpersController } from './develop-helpers.controller';

@Module({
  providers: [DevelopHelpersService],
  controllers: [DevelopHelpersController],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRole]),
    RolesModule,
    UsersModule,
    AuthModule,
  ],
  exports: [DevelopHelpersService],
})
export class DevelopHelpersModule {}
