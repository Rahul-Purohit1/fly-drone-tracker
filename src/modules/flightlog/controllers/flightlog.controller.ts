import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateFlightLogDto } from '../dto/create-flightlog.dto';
import { UpdateFlightLogDto } from '../dto/update-flightlog.dto';
import { FlightLogService } from '../services/flightlog.service';
import { Response } from 'express';

@ApiBearerAuth('access-token')
@ApiTags('FlightLog')
@Controller('api/flightlogs')
export class FlightLogController {
  constructor(private readonly flightLogService: FlightLogService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new flight log' })
  @ApiResponse({ status: 201, description: 'The flight log has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createFlightLogDto: CreateFlightLogDto) {
    return this.flightLogService.createFlightLog(createFlightLogDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all flight logs' })
  @ApiResponse({ status: 200, description: 'Return all flight logs.' })
  findAll() {
    return this.flightLogService.getAllFlightLogs();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a flight log by ID' })
  @ApiResponse({ status: 200, description: 'Return the flight log.' })
  @ApiResponse({ status: 404, description: 'Flight log not found.' })
  findOne(@Param('id') id: string) {
    return this.flightLogService.getFlightLogById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('flightId/:flightId')
  @ApiOperation({summary : 'Get a flight log by Unique flight Id'})
  @ApiResponse({ status: 200, description: 'Return the flight log.' })
  @ApiResponse({ status: 404, description: 'Flight log not found.' })
  findOneByFlightId(@Param('flightId') flightId: string){
    return this.flightLogService.getFlightLogByFlightId(flightId);
  }


  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a flight log by ID' })
  @ApiResponse({ status: 200, description: 'The flight log has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Flight log not found.' })
  update(@Param('id') id: string, @Body() updateFlightLogDto: UpdateFlightLogDto) {
    return this.flightLogService.updateFlightLog(id, updateFlightLogDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a flight log by ID' })
  @ApiResponse({ status: 200, description: 'The flight log has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Flight log not found.' })
  remove(@Param('id') id: string) {
    return this.flightLogService.deleteFlightLog(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('pdf/:flightId')
  @ApiOperation({ summary: 'Get a flight log PDF Document by flight ID'})
  @ApiResponse({ status: 200, description: 'The flight log PDF has been successfully downloaded.', content: {
    'application/pdf': {
      schema: {
        type: 'string',
        format: 'binary',
      },
    },
  },})
  @ApiResponse({ status: 404, description: 'Flight log not found.' })
  getFlightLogPdf(@Param('flightId') flightId: string, @Res() res: Response) {
    return this.flightLogService.generateFlightLogPdf(flightId, res);
  }
}