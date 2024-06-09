import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should register a user', async () => {
    const result = { id: 1, username: 'test' };
    jest.spyOn(service, 'createUser').mockResolvedValue(result as any);
    expect(
      await controller.register({ username: 'test', password: 'password' }),
    ).toBe(result);
  });
});
