import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User, UserSchema } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';


import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../auth/services/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserService, UserRepository, JwtAuthGuard, AuthService,JwtStrategy],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UserModule {}