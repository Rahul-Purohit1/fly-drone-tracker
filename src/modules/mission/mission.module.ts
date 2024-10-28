import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionController } from './controllers/mission.controller';
import { MissionService } from './services/mission.service';
import { Mission, MissionSchema } from './entities/mission.entity';
import { MissionRepository } from './repositories/mission.repository';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: Mission.name, schema: MissionSchema }])],
  providers: [MissionService, MissionRepository, JwtAuthGuard],
  controllers: [MissionController],
  exports: [MissionService, MissionRepository],
})
export class MissionModule {}