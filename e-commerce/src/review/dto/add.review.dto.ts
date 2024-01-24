import { IsNumber, IsString } from "class-validator";

export class AddReviewDTO {
    @IsString()
    comment: string;
  
    @IsNumber()
    rating: number;
  
    @IsString()
    username: string;
  
    @IsString()
    productId: string;
  
    @IsString()
    createdAt: string;
}