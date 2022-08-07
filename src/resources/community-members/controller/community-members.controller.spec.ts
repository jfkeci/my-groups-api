import { Test, TestingModule } from '@nestjs/testing';
import { CommunityMembersController } from './community-members.controller';
import { CommunityMembersService } from '../service/community-members.service';

describe('CommunityMembersController', () => {
  let controller: CommunityMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityMembersController],
      providers: [CommunityMembersService]
    }).compile();

    controller = module.get<CommunityMembersController>(
      CommunityMembersController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
