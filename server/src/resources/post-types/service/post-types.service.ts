import { Injectable } from '@nestjs/common';
import { CreatePostTypeDto } from '../dto/create-post-type.dto';
import { UpdatePostTypeDto } from '../dto/update-post-type.dto';

@Injectable()
export class PostTypesService {
  create(createPostTypeDto: CreatePostTypeDto) {
    return 'This action adds a new postType';
  }

  findAll() {
    return `This action returns all postTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postType`;
  }

  update(id: number, updatePostTypeDto: UpdatePostTypeDto) {
    return `This action updates a #${id} postType`;
  }

  remove(id: number) {
    return `This action removes a #${id} postType`;
  }
}
