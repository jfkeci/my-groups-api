import { Test, TestingModule } from '@nestjs/testing';
import { CommunityUsersController } from './community-users.controller';
import { CommunityUsersService } from '../service/community-users.service';

describe('CommunityUsersController', () => {
  let controller: CommunityUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityUsersController],
      providers: [CommunityUsersService]
    }).compile();

    controller = module.get<CommunityUsersController>(CommunityUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
