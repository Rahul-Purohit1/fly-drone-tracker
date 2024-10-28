import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MissionDocument = Mission & Document;

@Schema()
export class Waypoint {
  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lng: number;

  @Prop({ required: true })
  alt: number;
}

export const WaypointSchema = SchemaFactory.createForClass(Waypoint);

@Schema()
export class Mission {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [WaypointSchema], required: true })
  waypoints: Waypoint[];

  @Prop({ required: true })
  altitude: number;

  @Prop({ required: true })
  speed: number;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const MissionSchema = SchemaFactory.createForClass(Mission);