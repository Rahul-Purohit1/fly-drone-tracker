import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drone, DroneDocument } from '../entities/drone.entity';
import { CreateDroneDto } from '../dto/create-drone.dto';
import { UpdateDroneDto } from '../dto/update-drone.dto';

@Injectable()
export class DroneRepository {
  constructor(@InjectModel(Drone.name) private readonly droneModel: Model<DroneDocument>) {}

  async create(createDroneDto: CreateDroneDto): Promise<Drone> {
    const newDrone = new this.droneModel(createDroneDto);
    return newDrone.save();
  }

  async findById(id: string): Promise<Drone> {
    const drone = await this.droneModel.findById(id).exec();
    if (!drone) {
      throw new NotFoundException(`Drone not found with ID: ${id}`);
    }
    return drone;
  }

  async findAll(): Promise<Drone[]> {
    return this.droneModel.find().exec();
  }

  async update(id: string, updateDroneDto: UpdateDroneDto): Promise<Drone | null> {
    return this.droneModel.findOneAndUpdate({ _id: id }, updateDroneDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Drone | null> {
    return this.droneModel.findByIdAndDelete(id).exec();
  }
}