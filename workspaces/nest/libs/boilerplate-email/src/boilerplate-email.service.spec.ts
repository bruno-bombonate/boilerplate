import { Test, TestingModule } from '@nestjs/testing';
import { BoilerplateEmailService } from './boilerplate-email.service.js';

describe('BoilerplateEmailService', () => {
  let service: BoilerplateEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoilerplateEmailService],
    }).compile();

    service = module.get<BoilerplateEmailService>(BoilerplateEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
