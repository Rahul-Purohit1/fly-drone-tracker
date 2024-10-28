import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { DroneRepository } from '../repositories/drone.repository';
import { CreateDroneDto } from '../dto/create-drone.dto';
import { UpdateDroneDto } from '../dto/update-drone.dto';

@Injectable()
export class DroneService {
  constructor(private readonly droneRepository: DroneRepository) {}

  async createDrone(createDroneDto: CreateDroneDto) {
    try {
      return this.droneRepository.create(createDroneDto);
    } catch (error) {
      console.log('DroneService createDrone', error);
      throw new InternalServerErrorException('Failed to create drone');
    }
  }

  async updateDrone(id: string, updateDroneDto: UpdateDroneDto) {
    try {
      const drone = await this.droneRepository.update(id, updateDroneDto);
      if (!drone) {
        throw new NotFoundException('Drone not found');
      }
      return drone;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('DroneService updateDrone', error);
      throw new InternalServerErrorException('Failed to update drone');
    }
  }

  async deleteDrone(id: string) {
    try {
      const drone = await this.droneRepository.delete(id);
      if (!drone) {
        throw new NotFoundException('Drone not found');
      }
      return drone;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('DroneService deleteDrone', error);
      throw new InternalServerErrorException('Failed to delete drone');
    }
  }

  async getDroneById(id: string) {
    try {
      return this.droneRepository.findById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('DroneService getDroneById', error);
      throw new InternalServerErrorException('Failed to retrieve drone');
    }
  }

  async getAllDrones() {
    try {
      return this.droneRepository.findAll();
    } catch (error) {
      console.log('DroneService getAllDrones', error);
      throw new InternalServerErrorException('Failed to retrieve drones');
    }
  }
}