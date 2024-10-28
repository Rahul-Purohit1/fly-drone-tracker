import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { FlightLogRepository } from '../repositories/flightlog.repository';
import { CreateFlightLogDto } from '../dto/create-flightlog.dto';
import { UpdateFlightLogDto } from '../dto/update-flightlog.dto';

@Injectable()
export class FlightLogService {
  constructor(private readonly flightLogRepository: FlightLogRepository) {}

  async createFlightLog(createFlightLogDto: CreateFlightLogDto) {
    try {
      return this.flightLogRepository.create(createFlightLogDto);
    } catch (error) {
      console.log('FlightLogService createFlightLog', error);
      throw new InternalServerErrorException('Failed to create flight log');
    }
  }

  async updateFlightLog(id: string, updateFlightLogDto: UpdateFlightLogDto) {
    try {
      const flightLog = await this.flightLogRepository.update(id, updateFlightLogDto);
      if (!flightLog) {
        throw new NotFoundException('Flight log not found');
      }
      return flightLog;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('FlightLogService updateFlightLog', error);
      throw new InternalServerErrorException('Failed to update flight log');
    }
  }

  async deleteFlightLog(id: string) {
    try {
      const flightLog = await this.flightLogRepository.delete(id);
      if (!flightLog) {
        throw new NotFoundException('Flight log not found');
      }
      return flightLog;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('FlightLogService deleteFlightLog', error);
      throw new InternalServerErrorException('Failed to delete flight log');
    }
  }

  async getFlightLogById(id: string) {
    try {
      return this.flightLogRepository.findById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('FlightLogService getFlightLogById', error);
      throw new InternalServerErrorException('Failed to retrieve flight log');
    }
  }

  async getAllFlightLogs() {
    try {
      return this.flightLogRepository.findAll();
    } catch (error) {
      console.log('FlightLogService getAllFlightLogs', error);
      throw new InternalServerErrorException('Failed to retrieve flight logs');
    }
  }
}