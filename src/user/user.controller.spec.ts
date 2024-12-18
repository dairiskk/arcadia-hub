import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getProfile', () => {
    it('should return user profile if user is authenticated', async () => {
      const req = { user: { id: 1, username: 'testuser' } };
      const result = await userController.getProfile(req);
      expect(result).toEqual(req.user);
    });

    it('should throw UnauthorizedException if user is not authenticated', async () => {
      const req = { user: null };
      await expect(userController.getProfile(req)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = { name: 'Test User', email: 'testuser@example.com', username: 'testuser', password: 'testpass' };
      const createdUser = { id: 1, ...createUserDto };
      jest.spyOn(userService, 'create').mockResolvedValue(createdUser);

      const result = await userController.create(createUserDto);
      expect(result).toEqual(createdUser);
    });
  });
});
