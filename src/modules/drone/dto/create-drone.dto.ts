import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateDroneDto {
  @ApiProperty({ description: 'ID of the user who created the drone' })
  @IsNotEmpty()
  created_by: Types.ObjectId;

  @ApiProperty({ description: 'Type of the drone' })
  @IsString()
  @IsNotEmpty()
  drone_type: string;

  @ApiProperty({ description: 'Make name of the drone' })
  @IsString()
  @IsNotEmpty()
  make_name: string;

  @ApiProperty({ description: 'Name of the drone' })
  @IsString()
  @IsNotEmpty()
  name: string;
}