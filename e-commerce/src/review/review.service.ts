import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './review.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private reviewModel: Model<Review>,
  ) {}

  async getAllReviews(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async getAllReviewsById(productId: string): Promise<Review[]> {
    return this.reviewModel
      .find({
        productId: productId,
      })
      .exec();
  }

  async addReview(review: Review): Promise<Review> {
    return this.reviewModel.create({
      comment: review.comment,
      rating: review.rating,
      username: review.username,
      productId: review.productId,
    });
  }
}
