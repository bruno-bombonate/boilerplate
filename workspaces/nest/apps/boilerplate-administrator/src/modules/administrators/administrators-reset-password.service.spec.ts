import { Test, TestingModule } from '@nestjs/testing';
import { AdministratorsResetPasswordService } from './administrators-reset-password.service.js';

describe('AdministratorsResetPasswordService', () => {
  let service: AdministratorsResetPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministratorsResetPasswordService],
    }).compile();

    service = module.get<AdministratorsResetPasswordService>(AdministratorsResetPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
