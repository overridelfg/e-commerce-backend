import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = ProductClass & Document;

@Schema({ collection: 'Product' })
export class ProductClass {
  @Prop()
  id: string;

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

export const ProductSchema = SchemaFactory.createForClass(ProductClass);
