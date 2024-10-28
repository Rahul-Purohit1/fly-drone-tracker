import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { MissionRepository } from '../repositories/mission.repository';
import { CreateMissionDto } from '../dto/create-mission.dto';
import { UpdateMissionDto } from '../dto/update-mission.dto';

@Injectable()
export class MissionService {
  constructor(private readonly missionRepository: MissionRepository) {}

  async createMission(createMissionDto: CreateMissionDto) {
    try {
      return this.missionRepository.create(createMissionDto);
    } catch (error) {
      console.log('MissionService createMission', error);
      throw new InternalServerErrorException('Failed to create mission');
    }
  }

  async updateMission(id: string, updateMissionDto: UpdateMissionDto) {
    try {
      const mission = await this.missionRepository.update(id, updateMissionDto);
      if (!mission) {
        throw new NotFoundException('Mission not found');
      }
      return mission;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('MissionService updateMission', error);
      throw new InternalServerErrorException('Failed to update mission');
    }
  }

  async deleteMission(id: string) {
    try {
      const mission = await this.missionRepository.delete(id);
      if (!mission) {
        throw new NotFoundException('Mission not found');
      }
      return mission;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('MissionService deleteMission', error);
      throw new InternalServerErrorException('Failed to delete mission');
    }
  }

  async getMissionById(id: string) {
    try {
      return this.missionRepository.findById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log('MissionService getMissionById', error);
      throw new InternalServerErrorException('Failed to retrieve mission');
    }
  }

  async getAllMissions() {
    try {
      return this.missionRepository.findAll();
    } catch (error) {
      console.log('MissionService getAllMissions', error);
      throw new InternalServerErrorException('Failed to retrieve missions');
    }
  }
}