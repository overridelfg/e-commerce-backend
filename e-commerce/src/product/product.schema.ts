import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from 'src/mongo/category.schema';
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

  @Prop({ type: Date })
  createdAt: Date;

  @Prop()
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
