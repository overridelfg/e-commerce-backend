import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './review.schema';
import { AddReviewDTO } from './dto/add.review.dto';

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

  async getProductTotalRating(productId: string): Promise<number> {
    return await this.reviewModel
      .find({
        productId,
      })
      .then((reviews: Review[]) => {
        const totalRating = reviews.reduce(
          (rating: number, currentReview: Review) => {
            return rating + currentReview.rating;
          },
          0,
        );
        return totalRating / reviews.length;
      });
  }

  async addReview(review: AddReviewDTO): Promise<Review> {
    return this.reviewModel.create({
      comment: review.comment,
      rating: review.rating,
      username: review.username,
      productId: review.productId,
      createdAt: review.createdAt,
    });
  }
}
