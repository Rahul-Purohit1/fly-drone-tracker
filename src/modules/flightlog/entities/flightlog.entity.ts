import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FlightLogDocument = FlightLog & Document;

@Schema()
export class FlightLogWaypoint {
  @Prop({ required: true })
  time: number; // Time in seconds from mission start

  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lng: number;

  @Prop({ required: true })
  alt: number;
}

export const FlightLogWaypointSchema = SchemaFactory.createForClass(FlightLogWaypoint);

@Schema()
export class FlightLog {
  @Prop({ required: true, unique: true })
  flight_id: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Drone' })
  drone_id: Types.ObjectId;

  @Prop({ required: true })
  mission_name: string;

  @Prop({ type: [FlightLogWaypointSchema], required: true })
  waypoints: FlightLogWaypoint[];

  @Prop({ required: true })
  speed: number;

  @Prop({ required: true })
  distance: number;

  @Prop({ required: true })
  execution_start: Date;

  @Prop({ required: true })
  execution_end: Date;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const FlightLogSchema = SchemaFactory.createForClass(FlightLog);