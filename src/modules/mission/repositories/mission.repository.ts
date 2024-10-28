import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mission, MissionDocument } from '../entities/mission.entity';
import { CreateMissionDto } from '../dto/create-mission.dto';
import { UpdateMissionDto } from '../dto/update-mission.dto';

@Injectable()
export class MissionRepository {
  constructor(@InjectModel(Mission.name) private readonly missionModel: Model<MissionDocument>) {}

  async create(createMissionDto: CreateMissionDto): Promise<Mission> {
    const newMission = new this.missionModel(createMissionDto);
    return newMission.save();
  }

  async findById(id: string): Promise<Mission> {
    const mission = await this.missionModel.findById(id).exec();
    if (!mission) {
      throw new NotFoundException(`Mission not found with ID: ${id}`);
    }
    return mission;
  }

  async findAll(): Promise<Mission[]> {
    return this.missionModel.find().exec();
  }

  async update(id: string, updateMissionDto: UpdateMissionDto): Promise<Mission | null> {
    return this.missionModel.findOneAndUpdate({ _id: id }, updateMissionDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Mission | null> {
    return this.missionModel.findByIdAndDelete(id).exec();
  }
}