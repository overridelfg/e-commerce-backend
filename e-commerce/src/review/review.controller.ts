import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './review.schema';

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
  async addReview(@Body() review: Review): Promise<Review> {
    console.log(review);
    return this.reviewService.addReview(review);
  }
}
