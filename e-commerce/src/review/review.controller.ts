import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './review.schema';
import { AddReviewDTO } from './dto/add.review.dto';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('reviews')
  async getAllReviews(): Promise<Review[]> {
    return this.reviewService.getAllReviews();
  }

  @Get('reviews/:productId')
  async getProductReviewsById(
    @Param('productId') productId: string,
  ): Promise<Review[]> {
    return this.reviewService.getAllReviewsById(productId);
  }

  @Post('reviews/add')
  async addReview(@Body() dto: AddReviewDTO): Promise<Review> {
    return this.reviewService.addReview(dto);
  }

  @Get('reviews/rating/:productId')
  async getProductReviewsRating(
    @Param('productId') productId: string,
  ): Promise<number> {
    return this.reviewService.getProductTotalRating(productId);
  }
}
