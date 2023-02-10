import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'title', description: 'Название поста' })
  readonly title: string;

  @ApiProperty({ example: '', description: 'Контент' })
  readonly content: string;

  @ApiProperty({ example: '1', description: 'id автора' })
  readonly userId: number;
}
