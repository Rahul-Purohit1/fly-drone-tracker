import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightLogController } from './controllers//flightlog.controller';
import { FlightLogService } from './services/flightlog.service';
import { FlightLog, FlightLogSchema } from './entities/flightlog.entity';
import { FlightLogRepository } from './repositories/flightlog.repository';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PdfService } from './services/pdf.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: FlightLog.name, schema: FlightLogSchema }])],
  providers: [FlightLogService, FlightLogRepository, JwtAuthGuard , PdfService],
  controllers: [FlightLogController],
  exports: [FlightLogService, FlightLogRepository],
})
export class FlightLogModule {}