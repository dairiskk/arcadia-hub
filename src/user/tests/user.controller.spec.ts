import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    findOne: jest.fn(),
  };

  const mockAuthGuard = {
    canActivate: jest.fn(() => true), // Mock the guard to always pass
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    })
      .overrideGuard(AuthGuard('jwt')) // Override the real JWT guard
      .useValue(mockAuthGuard) // Provide the mocked guard
      .compile();

    controller = module.get<UserController>(UserController);
  });

  describe('GET /users/me', () => {
    it('should throw UnauthorizedException if no authenticated user exists', async () => {
      mockAuthGuard.canActivate.mockImplementationOnce(() => false); // Mock guard to return false
      const req = { user: null }; // Simulate no authenticated user
      await expect(controller.getProfile(req)).rejects.toThrow(UnauthorizedException);
  });

    it('should throw UnauthorizedException if no user exists', () => {
      const req = { user: null };
      expect(() => controller.getProfile(req)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if no user exists', () => {
      const req = { user: null };
      expect(() => controller.getProfile(req)).rejects.toThrow(UnauthorizedException);
    });
  });
});
