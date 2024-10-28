import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllModules } from './modules';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/flydrone'),
    ...AllModules
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
