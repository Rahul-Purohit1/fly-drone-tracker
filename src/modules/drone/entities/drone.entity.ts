import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DroneDocument = Drone & Document;

@Schema()
export class Drone {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  created_by: Types.ObjectId;

  @Prop({ type: String, required: true })
  drone_type: string;

  @Prop({ type: String, required: true })
  make_name: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Date, default: null })
  deleted_on: Date;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const DroneSchema = SchemaFactory.createForClass(Drone);