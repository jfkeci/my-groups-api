import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { SearchUsersQueryDto } from 'src/resources/users/dto/search-query.dto';
import { SearchService } from '../service/search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly search: SearchService) {}

  @HttpCode(200)
  @Get('/users/:text')
  searchUsers(@Param() query: SearchUsersQueryDto) {
    return this.search.searchUsers(query.text ?? '');
  }
}
