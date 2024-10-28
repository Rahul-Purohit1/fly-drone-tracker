import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DroneController } from './controllers/drone.controller';
import { DroneService } from './services/drone.service';
import { Drone, DroneSchema } from './entities/drone.entity';
import { DroneRepository } from './repositories/drone.repository';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: Drone.name, schema: DroneSchema }])],
  providers: [DroneService, DroneRepository, JwtAuthGuard],
  controllers: [DroneController],
  exports: [DroneService, DroneRepository],
})
export class DroneModule {}