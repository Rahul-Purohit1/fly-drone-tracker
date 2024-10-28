import { PartialType } from '@nestjs/mapped-types';
import { CreateFlightLogDto } from './create-flightlog.dto';

export class UpdateFlightLogDto extends PartialType(CreateFlightLogDto) {}