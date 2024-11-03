import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsString } from 'class-validator';

export class StartSimulationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Drone to be used in Mission'})
  droneId: string;
}
