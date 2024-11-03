import { Injectable, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from 'src/modules/auth/services/auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  // async createUser(createUserDto: CreateUserDto) {
  //   try {
  //     return this.userRepository.create(createUserDto);
  //   } catch (error) {
  //     console.log('UserService createUser', error);
  //     throw new InternalServerErrorException('Failed to create user');
  //   }
  // }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hashedPassword;
      return this.userRepository.create(createUserDto);
    } catch (error) {
      console.log('UserService createUser', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.update(id, updateUserDto);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('UserService updateUser', error);
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.userRepository.delete(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('UserService deleteUser', error);
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

  async getUserById(id: string) {
    try {
      return this.userRepository.findById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('UserService getUserById', error);
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }

  async getAllUsers() {
    try {
      return this.userRepository.findAll();
    } catch (error) {
      console.log('UserService getAllUsers', error);
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  // async validateUser(email: string, password: string) {
  //   const user = await this.userRepository.findByEmail(email);
  //   if (!user || user.password !== password) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  //   return user;
  // }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    return this.authService.generateJwtToken(user);
  }
}