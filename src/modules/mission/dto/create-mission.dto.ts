import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Waypoint } from '../entities/mission.entity';

export class CreateMissionDto {
  @ApiProperty({ description: 'Name of the mission' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Waypoints of the mission', type: [Waypoint] })
  @IsArray()
  @IsNotEmpty()
  waypoints: Waypoint[];

  @ApiProperty({ description: 'Altitude of the mission' })
  @IsNumber()
  @IsNotEmpty()
  altitude: number;

  @ApiProperty({ description: 'Speed of the mission' })
  @IsNumber()
  @IsNotEmpty()
  speed: number;
}