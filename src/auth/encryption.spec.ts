import { Test, TestingModule } from '@nestjs/testing';
import { Encryption } from './encryption';

describe('Encryption', () => {
  let provider: Encryption;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Encryption],
    }).compile();

    provider = module.get<Encryption>(Encryption);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
