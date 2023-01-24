import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { isString } from 'lodash';

export class AddRoleDto {
  @ApiProperty({ example: '1', description: 'id юзера' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly userId: number;

  @ApiProperty({ example: 'ADMIN', description: 'Имя роли' })
  @IsString({ message: 'Должно быть строкой' })
  readonly value: string;
}
