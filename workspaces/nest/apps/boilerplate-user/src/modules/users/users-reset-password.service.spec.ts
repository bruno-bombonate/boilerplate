import { Test, TestingModule } from '@nestjs/testing';
import { UsersResetPasswordService } from './users-reset-password.service.js';

describe('UsersResetPasswordService', () => {
  let service: UsersResetPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResetPasswordService],
    }).compile();

    service = module.get<UsersResetPasswordService>(UsersResetPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
