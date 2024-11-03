import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { MissionRepository } from '../repositories/mission.repository';
import { CreateMissionDto } from '../dto/create-mission.dto';
import { UpdateMissionDto } from '../dto/update-mission.dto';
import { FlightLogRepository } from 'src/modules/flightlog/repositories/flightlog.repository';
import { v4 as uuidv4 } from 'uuid';
import { DroneRepository } from 'src/modules/drone/repositories/drone.repository';
import { Types } from 'mongoose';

@Injectable()
export class MissionService {

  private activeSimulations = new Map<string, NodeJS.Timeout>();

  constructor(private readonly missionRepository: MissionRepository,
    private readonly flightLogRepository: FlightLogRepository,
    private readonly droneRepository: DroneRepository,
  ) { }

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

  async startMissionSimulation(droneId: string, missionId: string): Promise<string> {
    try {
      const mission = await this.missionRepository.findById(missionId);
      if (!mission) {
        throw new NotFoundException('Mission not found');
      }
      console.log("1")
      const drone = await this.droneRepository.findById(droneId);
      if (!drone) {
        throw new NotFoundException('Drone not found');
      }
      console.log("2 reached here")

      const flightId = uuidv4();
      const startTime = new Date();
      const logEntries = [];
      let currentIndex = 0;

      const moveToNextWaypoint = async () => {
        try {
          if (currentIndex >= mission.waypoints.length - 1) {
            console.log("currentindex when finalizing", currentIndex);
            await this.finalizeFlightLog(flightId, droneId, mission, logEntries, startTime);
            return;
          }
          console.log("currentIndex", currentIndex);

          const start = mission.waypoints[currentIndex];
          const end = mission.waypoints[currentIndex + 1];
          const distance = this.calculateDistance(start, end);
          const travelTime = Math.round(distance / mission.speed);

          logEntries.push({
            time: currentIndex === 0 ? 0 : logEntries[logEntries.length - 1].time + travelTime,
            lat: start.lat,
            lng: start.lng,
            alt: mission.altitude,
          });

          currentIndex++;
          const timeoutId = setTimeout(moveToNextWaypoint, travelTime * 1000);
          this.activeSimulations.set(flightId, timeoutId);
        } catch (error) {
          console.error('Error in moveToNextWaypoint', error);
          throw new InternalServerErrorException('Failed during mission waypoint processing');
        }
      };

      moveToNextWaypoint();
      return `flightId : ${flightId}`;
    }
    catch (error) {
      console.error('MissionService startMissionSimulation', error);
      throw new InternalServerErrorException('Failed to start mission simulation');
    }
  }

  async stopMissionSimulation(flightId: string): Promise<string> {
    try {
      const timeoutId = this.activeSimulations.get(flightId);
      if (!timeoutId) {
        return `No active mission for flight ID: ${flightId}`;
      }

      clearTimeout(timeoutId);
      this.activeSimulations.delete(flightId);
      return `Mission with flight ID: ${flightId} stopped.`;
    } catch (error) {
      console.error('MissionService stopMissionSimulation', error);
      throw new InternalServerErrorException('Failed to stop mission simulation');
    }
  }

  private async finalizeFlightLog(flightId: string, droneId: string, mission: any, logEntries: any[], startTime: Date) {
    try {
      console.log("finalizaing result")
      const endTime = new Date();
      const totalDistance = this.calculateTotalDistance(logEntries);

      await this.flightLogRepository.create({
        flight_id: flightId,
        drone_id: new Types.ObjectId(droneId),
        mission_name: mission.name,
        waypoints: logEntries,
        speed: mission.speed,
        distance: totalDistance,
        execution_start: startTime,
        execution_end: endTime,
      });

      this.activeSimulations.delete(flightId);
    } catch (error) {
      console.error('MissionService finalizeFlightLog', error);
      throw new InternalServerErrorException('Failed to finalize flight log');
    }
  }

  // Refernce from Internet
  private calculateDistance(point1: { lat: number, lng: number }, point2: { lat: number, lng: number }): number {
    const R = 6371000;
    const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180);

    const dLat = degreesToRadians(point2.lat - point1.lat);
    const dLng = degreesToRadians(point2.lng - point1.lng);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(point1.lat)) * Math.cos(degreesToRadians(point2.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }


  private calculateTotalDistance(logEntries: any[]) {
    let totalDistance = 0;
    for (let i = 1; i < logEntries.length; i++) {
      totalDistance += this.calculateDistance(logEntries[i - 1], logEntries[i]);
    }
    return totalDistance;
  }

}