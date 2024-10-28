import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { Types } from 'mongoose';
import { FlightLogWaypoint } from '../entities/flightlog.entity';

export class CreateFlightLogDto {
  @ApiProperty({ description: 'Unique flight ID' })
  @IsString()
  @IsNotEmpty()
  flight_id: string;

  @ApiProperty({ description: 'ID of the drone' })
  @IsNotEmpty()
  drone_id: Types.ObjectId;

  @ApiProperty({ description: 'Name of the mission' })
  @IsString()
  @IsNotEmpty()
  mission_name: string;

  @ApiProperty({ description: 'Waypoints of the flight log', type: [FlightLogWaypoint] })
  @IsArray()
  @IsNotEmpty()
  waypoints: FlightLogWaypoint[];

  @ApiProperty({ description: 'Speed of the flight' })
  @IsNumber()
  @IsNotEmpty()
  speed: number;

  @ApiProperty({ description: 'Distance of the flight' })
  @IsNumber()
  @IsNotEmpty()
  distance: number;

  @ApiProperty({ description: 'Start time of the flight execution' })
  @IsDate()
  @IsNotEmpty()
  execution_start: Date;

  @ApiProperty({ description: 'End time of the flight execution' })
  @IsDate()
  @IsNotEmpty()
  execution_end: Date;
}