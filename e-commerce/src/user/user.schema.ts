import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from 'src/mongo/category.schema';
@Schema({ collection: 'User' })
export class User extends Document {
    @Prop()
    email: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
