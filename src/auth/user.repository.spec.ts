import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

const mockCredentialDto = { username: 'Test Username', password: 'asdd@#124' };

describe('User Repository', () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserRepository,
      ],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });
  describe('Sing Up', () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });
    it('should successfully signs up the user', function() {
      save.mockResolvedValue(undefined);
      expect(userRepository.signUp(mockCredentialDto)).resolves.not.toThrow();
    });
    it('should throws a conflict exception as username already exists', function() {
      save.mockResolvedValue({ code: '23505' });
      expect(userRepository.signUp(mockCredentialDto)).rejects.toThrow(ConflictException);
    });

    it('should throws a conflict exception as username already exists', function() {
      save.mockResolvedValue({ code: '12324' });
      expect(userRepository.signUp(mockCredentialDto)).rejects.toThrow(InternalServerErrorException);
    });
  });
  describe('validate Password', () => {
    let user;
    beforeEach(() => {
      userRepository.findOne = jest.fn();
      user = new User();
      user.username = 'Test username';
      user.validatePassword = jest.fn();
    });
    it('should returns the username as validation is successful', async function() {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(true);
      const result = await userRepository.validateUserPassword(mockCredentialDto);
      expect(result).toEqual('Test username');
    });
    it('should returns null as user cannot be found', async function() {
      userRepository.findOne.mockResolvedValue(null);
      const result = await userRepository.validateUserPassword(mockCredentialDto);
      expect(user.validatePassword).not.toHaveBeenCalled();
      expect(result).toBeNull();

    });

    it('should returns null as password is invalid', async function() {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(false);
      const result = await userRepository.validateUserPassword(mockCredentialDto);
      expect(user.validatePassword).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });
  describe('hashPassword', () => {
    it('should calls bcrypt.hash to generate a hash ', async function() {
      bcrypt.hash = jest.fn().mockResolvedValue('testHash');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await userRepository.hashPassword('testPassword', 'testSalt');
      expect(bcrypt.hash).toBeCalledWith('testPassword', 'testSalt');
      expect(result).toEqual('testHash');
    });
  });
});
