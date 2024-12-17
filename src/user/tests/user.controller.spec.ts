import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;

  // Mock UserService
  const mockUserService = {
    create: jest.fn(dto => ({ id: 1, ...dto })),
    getProfile: jest.fn(() => ({ id: 1, email: 'test@example.com' })),
    findByEmail: jest.fn(async (email: string) => ({
      id: 999, // Simulate user with invalid credentials
      email: 'invalid@example.com',
      password: '', // Invalid password
    })),
  };

  // Mock AuthGuard
  const mockAuthGuard = {
    canActivate: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  describe('GET /users/me', () => {
    it('should return the authenticated user profile', async () => {
      mockAuthGuard.canActivate.mockImplementation(() => true); // Correct auth guard behavior
      const req = { user: { id: 1, email: 'test@example.com' } };
      const result = await controller.getProfile(req);
      expect(result).toEqual(req.user);
    });

    it('should throw UnauthorizedException if no authenticated user', async () => {
      mockAuthGuard.canActivate.mockImplementationOnce(() => false); // Mock no auth
      const req = { user: null }; // Simulate no authenticated user
      await expect(controller.getProfile(req)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      mockUserService.findByEmail.mockResolvedValueOnce({
        id: 999,
        email: 'invalid@example.com',
        password: '', // Simulate invalid credentials
      }); 
      const req = { user: { id: 999, email: 'invalid@example.com' } };
      await expect(controller.getProfile(req)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await controller.create(createUserDto);
      expect(result).toEqual({ id: 1, ...createUserDto });
    });
  });
});
