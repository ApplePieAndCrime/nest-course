import { UserRole } from './roles/user-roles.model';
import { Role } from './roles/roles.model';
import { User } from './users/users.model';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/posts.model';
import { FilesModule } from './files/files.module';
import { DevelopHelpersModule } from './develop-helpers/develop-helpers.module';
import * as path from 'path';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),

    ServeStaticModule.forRoot(
      // for api styles
      {
        rootPath: join(__dirname, '..', 'public'),
        serveRoot: '/public',
        exclude: ['/api*'],
      },
      // for images
      { rootPath: path.resolve(__dirname, 'static'), serveRoot: '/static' }
    ),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRole, Post],
      autoLoadModels: true,
      synchronize: true,
    }),

    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
    DevelopHelpersModule,
  ],
})
export class AppModule {}
