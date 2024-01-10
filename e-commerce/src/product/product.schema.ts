import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ collection: 'Product' })
export class Product extends Document {
  @Prop()
  img: string;

  @Prop()
  imges: Array<string>;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  rating: number;

  @Prop()
  brand: string;

  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
