import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../../user/entities/user.entity';
import { LoginDto } from '../../user/dto/login.dto';
import { UserRepository } from '../../user/repositories/user.repository';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  // async validateUser(email: string, password: string): Promise<UserDocument | null> {
  //   const user = await this.userRepository.findByEmail(email);
  //   if (user && user.password === password) {
  //     return user;
  //   }
  //   return null;
  // }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    console.log(user,"user");
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid,"isggg");
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  generateJwtToken(user: UserDocument): { accessToken: string } {
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}