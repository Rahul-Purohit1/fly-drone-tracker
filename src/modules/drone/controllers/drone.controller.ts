import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateDroneDto } from '../dto/create-drone.dto';
import { UpdateDroneDto } from '../dto/update-drone.dto';
import { DroneService } from '../services/drone.service';

@ApiBearerAuth('access-token')
@ApiTags('Drone')
@Controller('api/drones')
export class DroneController {
  constructor(private readonly droneService: DroneService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new drone' })
  @ApiResponse({ status: 201, description: 'The drone has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createDroneDto: CreateDroneDto) {
    return this.droneService.createDrone(createDroneDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all drones' })
  @ApiResponse({ status: 200, description: 'Return all drones.' })
  findAll() {
    return this.droneService.getAllDrones();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a drone by ID' })
  @ApiResponse({ status: 200, description: 'Return the drone.' })
  @ApiResponse({ status: 404, description: 'Drone not found.' })
  findOne(@Param('id') id: string) {
    return this.droneService.getDroneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a drone by ID' })
  @ApiResponse({ status: 200, description: 'The drone has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Drone not found.' })
  update(@Param('id') id: string, @Body() updateDroneDto: UpdateDroneDto) {
    return this.droneService.updateDrone(id, updateDroneDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a drone by ID' })
  @ApiResponse({ status: 200, description: 'The drone has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Drone not found.' })
  remove(@Param('id') id: string) {
    return this.droneService.deleteDrone(id);
  }
}