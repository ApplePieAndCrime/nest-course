import { FilesService } from './../files/files.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private filesService: FilesService
  ) {}

  async create(createPostDto: CreatePostDto, img: any) {
    console.log(1, { img });
    const fileName = await this.filesService.createFile(img);
    console.log(2);
    const post = await this.postRepository.create({
      ...createPostDto,
      img: fileName,
    });
    console.log('end');
    return post;
  }

  async findAll() {
    return this.postRepository.findAll();
  }

  async findOne(id: number) {
    return this.postRepository.findAll({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    let post = await this.postRepository.findOne({ where: { id } });

    // post.$set(...updatePostDto);
    // post.save();

    return post;
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    return post.destroy();
  }
}

