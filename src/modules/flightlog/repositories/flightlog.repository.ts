import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FlightLog, FlightLogDocument } from '../entities/flightlog.entity';
import { CreateFlightLogDto } from '../dto/create-flightlog.dto';
import { UpdateFlightLogDto } from '../dto/update-flightlog.dto';

@Injectable()
export class FlightLogRepository {
  constructor(@InjectModel(FlightLog.name) private readonly flightLogModel: Model<FlightLogDocument>) {}

  async create(createFlightLogDto: CreateFlightLogDto): Promise<FlightLog> {
    const newFlightLog = new this.flightLogModel(createFlightLogDto);
    return newFlightLog.save();
  }

  async findById(id: string): Promise<FlightLog> {
    const flightLog = await this.flightLogModel.findById(id).exec();
    if (!flightLog) {
      throw new NotFoundException(`Flight log not found with ID: ${id}`);
    }
    return flightLog;
  }

  async findAll(): Promise<FlightLog[]> {
    return this.flightLogModel.find().exec();
  }

  async update(id: string, updateFlightLogDto: UpdateFlightLogDto): Promise<FlightLog | null> {
    return this.flightLogModel.findOneAndUpdate({ _id: id }, updateFlightLogDto, { new: true }).exec();
  }

  async delete(id: string): Promise<FlightLog | null> {
    return this.flightLogModel.findByIdAndDelete(id).exec();
  }
}