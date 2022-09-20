import { Test, TestingModule } from '@nestjs/testing';
import { CommunityUsersService } from './community-users.service';

describe('CommunityUsersService', () => {
  let service: CommunityUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityUsersService]
    }).compile();

    service = module.get<CommunityUsersService>(CommunityUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
