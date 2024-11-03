import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateMissionDto } from '../dto/create-mission.dto';
import { UpdateMissionDto } from '../dto/update-mission.dto';
import { MissionService } from '../services/mission.service';
import { StartSimulationDto } from '../dto/start-simulation.dto';

@ApiBearerAuth('access-token')
@ApiTags('Mission')
@Controller('api/missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new mission' })
  @ApiResponse({ status: 201, description: 'The mission has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createMissionDto: CreateMissionDto) {
    return this.missionService.createMission(createMissionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all missions' })
  @ApiResponse({ status: 200, description: 'Return all missions.' })
  findAll() {
    return this.missionService.getAllMissions();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a mission by ID' })
  @ApiResponse({ status: 200, description: 'Return the mission.' })
  @ApiResponse({ status: 404, description: 'Mission not found.' })
  findOne(@Param('id') id: string) {
    return this.missionService.getMissionById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a mission by ID' })
  @ApiResponse({ status: 200, description: 'The mission has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Mission not found.' })
  update(@Param('id') id: string, @Body() updateMissionDto: UpdateMissionDto) {
    return this.missionService.updateMission(id, updateMissionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a mission by ID' })
  @ApiResponse({ status: 200, description: 'The mission has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Mission not found.' })
  remove(@Param('id') id: string) {
    return this.missionService.deleteMission(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':missionId/start-simulation')
  @ApiOperation({ summary: 'Start a mission simulation' })
  @ApiResponse({ status: 200, description: 'Simulation started successfully' })
  @ApiResponse({ status: 404, description: 'Mission not found.' })
  startMission(
    @Param('missionId') missionId: string,
    @Body() body: StartSimulationDto) {
    const droneId = body.droneId
    return this.missionService.startMissionSimulation(droneId, missionId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':flightId/stop-simulation')
  @ApiOperation({ summary: 'Halt the mission simulation' })
  @ApiResponse({ status: 200, description: 'Simulation stopped successfully' })
  @ApiResponse({ status: 404, description: 'Mission not found.' })
  stopMission(@Param('flightId') flightId: string) {
    return this.missionService.stopMissionSimulation(flightId);
  }
}
